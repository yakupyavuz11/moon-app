require("dotenv").config();

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  try {


    // Fetch user details
    const userResult = await sql`
      SELECT * FROM users;
    `;

    const user = userResult;

    // Fetch messages for the user
    const messageResult = await sql`
      SELECT * FROM messages;
    `;

    const messages = messageResult;

    // Combine user and messages into a single response object
    const response = {
      user: user,
      messages: messages
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});