const express = require("express")
const router = express.Router()
const redis = require("../redis")
const rateLimit = require("../services/rateLimiter")
const ensureIdempotency = require("../services/idempotency")

router.post("/", async (req, res) => {
  const { userId, amount, transactionId } = req.body

  try {
    await rateLimit(userId)
    await ensureIdempotency(transactionId)

    await redis.xAdd(
      "transactions_stream",
      "*",
      {
        userId,
        amount: amount.toString(),
        transactionId,
      }
    )

    res.status(202).json({ status: "ACCEPTED" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
