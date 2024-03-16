import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";

const app = express();

dotenv.config()

const PORT = process.env.PORT || 5000

app.get ("/",( req, res)=>{
    res.send('Hello')
})

// app.get("/api/auth/signup", (res,req)=>{
//     console.log("signup route")
// })

// app.get("/api/auth/login", (res, req)=>{
//     console.log("Login Route")
// })

// app.get("/api/auth/logout", (res, req)=>{
//     console.log("Logout Route")
// })

app.use(express.json()) // to parse the incoming requests from the  JSON payloads
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
})