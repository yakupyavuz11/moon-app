require("dotenv").config();
const http = require("http");
const { neon } = require("@neondatabase/serverless");
const url = require("url");

const sql = neon(process.env.DATABASE_URL);

// Route Handlers
const registerHandler = async (req, res) => {
  const { username, password, name, email, image } = await parseRequestBody(
    req
  );
  const result = await sql`
    INSERT INTO users (name, email, username, password, image)
    VALUES (${name}, ${email}, ${username}, ${password}, ${image})
    RETURNING id, username;
  `;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result[0]));
};

const loginHandler = async (req, res) => {
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
};

const listChatsHandler = async (req, res) => {
  const chats = await sql`SELECT * FROM messages;`;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(chats));
};

const logoutHandler = async (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Logout successful");
};

const messagesSendHandler = async (req, res) => {
  const { senderId, receiverId, message } = await parseRequestBody(req);
  const result = await sql`
    INSERT INTO messages (sender_id, receiver_id, message)
    VALUES (${senderId}, ${receiverId}, ${message})
    RETURNING id, message;
  `;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result[0]));
};

const chatsStartHandler = async (req, res) => {
  const { userId1, userId2 } = await parseRequestBody(req);
  const result = await sql`
    INSERT INTO chats (user1_id, user2_id)
    VALUES (${userId1}, ${userId2})
    RETURNING id;
  `;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result[0]));
};

const anonymousFindHandler = async (req, res) => {
  const randomUser = await sql`
    SELECT id, username FROM users ORDER BY RANDOM() LIMIT 1;
  `;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(randomUser[0]));
};

const anonymousMessageHandler = async (req, res) => {
  const { senderId, message } = await parseRequestBody(req);
  const result = await sql`
    INSERT INTO anonymous_messages (sender_id, message)
    VALUES (${senderId}, ${message})
    RETURNING id, message;
  `;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result[0]));
};

const apiNotificationsHandler = async (req, res) => {
  const notifications = await sql`SELECT * FROM notifications;`;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(notifications));
};

const apiNotificationsMarkAsReadHandler = async (req, res) => {
  const { notificationId } = await parseRequestBody(req);
  await sql`
    UPDATE notifications
    SET is_read = true
    WHERE id = ${notificationId};
  `;
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Notification marked as read");
};

// Router
const router = {
  POST: {
    "/api/auth/register": registerHandler,
    "/api/auth/login": loginHandler,
    "/api/auth/logout": logoutHandler,
    "/api/chats/start": chatsStartHandler,
    "/api/messages/send": messagesSendHandler,
    "/api/anonymous/message": anonymousMessageHandler,
    "/api/notifications/mark-as-read": apiNotificationsMarkAsReadHandler,
  },
  GET: {
    "/api/chats/list": listChatsHandler,
    "/api/anonymous/find": anonymousFindHandler,
    "/api/notifications": apiNotificationsHandler,
  },
};

// Request Handler
const requestHandler = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const routeHandler =
    router[req.method] && router[req.method][parsedUrl.pathname];

  if (routeHandler) {
    try {
      await routeHandler(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

// Utility Function
const parseRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(JSON.parse(body)));
    req.on("error", reject);
  });

// Server
http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
