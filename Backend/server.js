require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

// Set NODE_ENV for production if not already set
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "production"
}

app.listen(3000, () => {
    console.log(`Server is running on port 3000 in ${process.env.NODE_ENV} mode`)
})