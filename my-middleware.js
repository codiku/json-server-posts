const fs = require("fs");
const INITIAL_ELEMENT = {
  id: 1,
  title: "This database is reset after 10 records",
  body: "Better be safe than sorry",
};

const limitWriteMiddleware = async (req, res, next) => {
  if (req.method === "POST" && req.path === "/posts") {
    const serverUrl = process.env.VERCEL_URL || "http://localhost:3000";
    const response = await fetch(`${serverUrl}/posts`);
    const posts = await response.json();
    if (posts.length >= 10) {
      console.log(" les posts ", posts);
      await fetch(`${serverUrl}/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          posts: [INITIAL_ELEMENT],
        }),
      });
      return res.status(201).json(INITIAL_ELEMENT);
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = { limitWriteMiddleware };
