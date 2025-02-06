import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = "express";

app.use(
    cors({
        oringin: process.env.CORS_ORIGN,
        credentials: true,

    })
)

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieparser());


import userRouter from "./routes/user.router.js";

app.use("/api/v1/user", userRouter);


export default app; 