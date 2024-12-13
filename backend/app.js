require("dotenv").config();

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/auth/register") {
      const { username, password, name, email, image } = await parseRequestBody(
        req
      );
      const result = await sql`
        INSERT INTO users ( name, email,username,password,image)
        VALUES (${name}, ${email},${username},${password},${image})
        RETURNING id, username;
      `;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result[0]));
    } else if (req.method === "POST" && req.url === "/api/auth/login") {
      const { username, password } = await parseRequestBody(req);
      const result = await sql`
        SELECT id, username FROM users
        WHERE username = ${username} AND password = ${password};
      `;
      if (result.length) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result[0]));
      } else {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Invalid credentials");
      }
    } else if (req.method === "GET" && req.url === "/api/chats/list") {
      const chats = await sql`SELECT * FROM messages;`;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(chats));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const parseRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(JSON.parse(body)));
    req.on("error", reject);
  });

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
