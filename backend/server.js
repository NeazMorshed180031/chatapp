import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

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

app.use("/api/auth", authRoutes)

app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
})