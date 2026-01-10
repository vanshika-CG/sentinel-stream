const express = require("express")
const cors = require("cors")

const transactionRoute = require("./routes/transaction")
const userRoute = require("./routes/user")
const transactionHistoryRoute = require("./routes/transactionHistory")

const app = express()

app.use(cors({ origin: "http://localhost:3001" }))
app.use(express.json())

app.use("/transaction", transactionRoute)
app.use("/users", userRoute)
app.use("/transactions", transactionHistoryRoute)

app.listen(3000, () => {
  console.log("API running on port 3000")
})
