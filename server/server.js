import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/prequal", async (req, res) => {
  try {
    const response = await axios.post(
      "https://app.isoftpull.com/api/v2/reports",
      req.body,
      {
        headers: {
          "api-key": process.env.ISOFTPULL_KEY_ID,
          "api-secret": process.env.ISOFTPULL_SECRET,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    res.status(500).json({
      error: true,
      message: error.response?.data || error.message,
      details: error.response?.data,
    });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
