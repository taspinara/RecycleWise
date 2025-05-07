import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// TEXT-ONLY AI RESPONSE
export const askQuestion = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const answer = completion.choices[0].message.content;

    res.status(200).json({ answer });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Something went wrong with the AI service" });
  }
};

// IMAGE + TEXT AI RESPONSE
export const askWithImage = async (req, res) => {
  const prompt = req.body.prompt || "Is this item recyclable?";
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).json({ error: "Image is required" });
  }

  try {
    const base64Image = fs.readFileSync(imageFile.path, { encoding: "base64" });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageFile.mimetype};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const answer = completion.choices[0].message.content;

    res.status(200).json({ answer });
  } catch (error) {
    console.error("OpenAI error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong with the AI image service" });
  } finally {
    fs.unlink(imageFile.path, () => {}); // cleanup temp file
  }
};
