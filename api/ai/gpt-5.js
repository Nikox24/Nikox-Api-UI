const axios = require("axios");

module.exports = {
  meta: {
    name: "gpt-5",
    description: "Ask GPT-5 anything using the BetaDash API.",
    author: "Nikox",
    version: "1.1",
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
      // Call external GPT-5 API
      const apiUrl = `https://betadash-api-swordslush-production.up.railway.app/gpt-5?ask=${encodeURIComponent(question)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Handle response from API
      const output =
        data.response || // If API returns { response: "..." }
        data.answer ||   // If API returns { answer: "..." }
        data.output ||   // If API returns { output: "..." }
        "No response from GPT-5.";

      res.json({
        status: true,
        question,
        answer: output
      });
    } catch (error) {
      res.json({
        status: false,
        message: "Error fetching GPT-5 response",
        error: error.message
      });
    }
  }
};
