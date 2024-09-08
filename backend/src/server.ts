import express from "express";

const app = express(); // an instance of an express application
const port = 3000; // the port number the server will listen for incoming requests

// when a GETrequest is sent to the root url, the call back function is executed with req being the data in the request and res being what is sent back
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server runnong on port: " + port);
});
