import app from "./app";
import mongoose from "mongoose";
import env from "./util/validateEnv";

const port = env.PORT; // the port number the server will listen for incoming requests

// database and server start
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose Connected!");
    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch(console.error);
