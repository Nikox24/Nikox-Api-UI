const axios = require("axios");

module.exports = {
  meta: {
    name: "deepseek",
    description: "Ask DeepSeek AI anything using the AryChauhann API.",
    author: "Nikox",
    version: "3.0",
    category: "ai",
    method: "get",
    params: [
      { name: "ask", type: "string", required: true, description: "Your question or message" }
    ]
  },

  onStart: async ({ req, res }) => {
    const question = req.query.ask;
    if (!question) {
      return res.json({
        status: false,
        message: "Missing parameter: ask"
      });
    }

    try {
      // External API request to DeepSeek
      const apiUrl = `https://arychauhann.onrender.com/api/deepseek3?prompt=${encodeURIComponent(question)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Extract AI answer safely
      const output =
        data.response ||
        data.answer ||
        data.result ||
        data.output ||
        JSON.stringify(data) ||
        "No response from DeepSeek.";

      res.json({
        status: true,
        question,
        answer: output
      });
    } catch (error) {
      res.json({
        status: false,
        message: "Error fetching DeepSeek response",
        error: error.message
      });
    }
  }
};
