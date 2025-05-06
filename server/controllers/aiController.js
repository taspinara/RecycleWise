import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    "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",
});

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
