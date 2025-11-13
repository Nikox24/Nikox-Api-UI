const axios = require("axios");

module.exports = {
  meta: {
    name: "soundcloud",
    category: "music",
    description: "Get direct MP3 from SoundCloud by search query",
    author: "Nikox",
    method: "GET",
    params: [{ name: "search", required: true }]
  },

  async onStart({ req, res }) {
    try {
      const query = req.query.search;
      if (!query) {
        return res.json({ status: false, message: "Missing 'search' parameter" });
      }

      const apiUrl = `https://betadash-api-swordslush-production.up.railway.app/sc?search=${encodeURIComponent(query)}`;
      const { data } = await axios.get(apiUrl, { responseType: "arraybuffer" });

      // Set correct headers for MP3 playback
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Disposition", `inline; filename="${query}.mp3"`);

      return res.end(data, "binary");
    } catch (error) {
      console.error("SoundCloud API error:", error.message);
      return res.status(500).json({
        status: false,
        message: "Failed to fetch SoundCloud audio",
        error: error.message
      });
    }
  }
};
