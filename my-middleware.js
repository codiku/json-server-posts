const fs = require("fs");
const INITIAL_ELEMENT = {
  id: 1,
  title: "This database is reset after 10 records",
  body: "Better be safe than sorry",
};

const limitWriteMiddleware = async (req, res, next) => {
  if (req.method === "POST" && req.path === "/posts") {
    const response = await fetch(
      `https://json-server-posts-mgwaf1ecu-codiku.vercel.app/posts`
    );
    const posts = await response.json();
    if (posts.length >= 10) {
      console.log(" les posts ", posts);
      await fetch(
        `https://json-server-posts-mgwaf1ecu-codiku.vercel.app/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            posts: [INITIAL_ELEMENT],
          }),
        }
      );
      return res.status(201).json(INITIAL_ELEMENT);
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = { limitWriteMiddleware };
