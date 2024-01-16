const fs = require("fs");
const { readFile } = require("fs/promises");

// hello.js
module.exports = async (req, res, next) => {
  let dbJSON = JSON.parse(await readFile("db.json", "utf8"));

  if (dbJSON.posts.length > 10) {
    dbJSON.posts = [
      {
        id: 1,
        title: "This database is cleared after 10 records",
        body: "Better be safe than sorry",
      },
    ];
    fs.writeFileSync("./db.json", JSON.stringify(dbJSON));
  }
  next();
};
