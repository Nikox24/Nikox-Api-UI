// api/music/spotify.js
const axios = require("axios");

const meta = {
  name: "spotify",
  desc: "Fetch Spotify track details and download link",
  method: "get",
  category: "music",
  params: [{ name: "title", type: "string", required: true, desc: "Song title" }],
};

async function onStart({ req, res }) {
  const title = req.query.title;
  if (!title)
    return res.status(400).json({
      status: false,
      message: "Missing query parameter: title",
      example: "/music/spotify?title=Tensionado",
    });

  try {
    const apiUrl = `https://betadash-api-swordslush-production.up.railway.app/spt?title=${encodeURIComponent(title)}`;
    const { data } = await axios.get(apiUrl);

    // Return the exact structure with extra meta
    res.json({
      status: true,
      title: data.title,
      duration: data.duration,
      artists: data.artists,
      thumbnail: data.thumbnail,
      download_url: data.download_url,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch Spotify data",
      error: error.message,
    });
  }
}

module.exports = { meta, onStart };
