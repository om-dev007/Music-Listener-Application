import e from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.routes.js";
import musicRouter from "./routes/music.routes.js";

const app = e();

app.use(e.json());
app.use(cookieParser());
app.use("/api/auth", userRouter)
app.use("/api/music", musicRouter)

export default app;