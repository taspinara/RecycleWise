import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/hand-drawn-world-environment-day-save-planet-illustration_52683-61570.jpg?t=st=1746723774~exp=1746727374~hmac=efe5380daf4d22d407a8fd886e104a1ec16d7ab08c7c187a3753227b1682ea22&w=740",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
