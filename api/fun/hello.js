module.exports = {
  meta: {
    name: "hello",
    description: "Returns a friendly greeting message.",
    author: "Nikox",
    version: "1.0",
    category: "fun",
    method: "get",
    params: [
      { name: "name", type: "string", required: false, description: "Your name" }
    ]
  },

  onStart: async ({ req, res }) => {
    const name = req.query.name || "Kaibigan 😄";
    res.json({
      status: true,
      message: `Hello, ${name}! Welcome to Nikox API Server 🚀`
    });
  }
};
