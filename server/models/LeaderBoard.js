import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;