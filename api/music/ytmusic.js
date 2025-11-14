const axios = require("axios");

module.exports = {
  meta: {
    name: "youtubemusic",
    category: "music",
    desc: "Get YouTube music info and direct MP3 audio",
    author: "Nikox",
    method: "GET",
    params: [{ name: "query", required: true }]
  },

  async onStart({ req, res }) {
    try {
      const query = req.query.query;
      if (!query) {
        return res.json({ status: false, message: "Missing 'query' parameter" });
      }

      const apiUrl = `https://arychauhann.onrender.com/api/youtubeplay?query=${encodeURIComponent(query)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.data) {
        return res.json({
          status: false,
          message: "No music data found for your query."
        });
      }

      const song = data.data;

      return res.json({
        status: true,
        source: "YouTube Music",
        title: song.title,
        thumbnail: song.thumbnail,
        duration: song.duration,
        audio: song.audio,
        video: song.video,
        operator: data.operator || "Nikox",
      });
    } catch (error) {
      console.error("YouTube Music API error:", error.message);
      return res.status(500).json({
        status: false,
        message: "Failed to fetch YouTube music data",
        error: error.message
      });
    }
  }
};
