const axios = require("axios");

module.exports = {
  meta: {
    name: "grok",
    description: "Ask Grok AI anything using the NekoLabs API.",
    author: "Nikox",
    version: "1.0",
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
      // API request to Grok (NekoLabs)
      const apiUrl = `https://api.nekolabs.web.id/ai/grok/4?prompt=${encodeURIComponent(question)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Extract AI response safely
      const output =
        data.result ||
        data.response ||
        data.answer ||
        JSON.stringify(data) ||
        "No response from Grok.";

      res.json({
        status: true,
        question,
        answer: output,
        responseTime: data.responseTime || null,
        timestamp: data.timestamp || null
      });
    } catch (error) {
      res.json({
        status: false,
        message: "Error fetching Grok response",
        error: error.message
      });
    }
  }
};
