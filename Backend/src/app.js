const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

// Trust proxy for Render (REQUIRED for production)
app.set("trust proxy", 1)

// CORS middleware MUST be before routes and json parser
app.use(cors({
    origin: ["http://localhost:5173", "https://resume-to-interview.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// JSON parser and cookie parser after CORS
app.use(express.json())
app.use(cookieParser())

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app