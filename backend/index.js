import express from "express";
import postRouter from "./routes/homepageRoute.js";
import cors from "cors"

const app = express();
const PORT = 3300;


app.use(cors())

app.use(express.json());

app.use("/api",postRouter)

app.listen(PORT,() => {
    console.log(`SERVER IS LISTENING ON http://localhost:${PORT}`);
})