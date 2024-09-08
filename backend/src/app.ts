import "dotenv/config";
import express from "express";

const app = express(); // an instance of an express application

// when a GETrequest is sent to the root url, the call back function is executed with req being the data in the request and res being what is sent back
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
