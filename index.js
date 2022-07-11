import "dotenv/config";
import express, { urlencoded } from "express";
import router from "./app/router.js";
import cors from "cors";
import multer from "multer";
const bodyParser = multer();
const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.none());
app.use("static", express.static("public"));
app.use(urlencoded({ extended: true }));

app.use(router);

app.listen(port, (_) => {
  console.log(`http://localhost:${port}`);
});

export default app;
