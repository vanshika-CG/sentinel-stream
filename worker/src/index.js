const redis = require("./redis")
const processTransaction = require("./services/processor")

async function start() {
  try {
    await redis.xGroupCreate(
      "transactions_stream",
      "workers",
      "$",
      { MKSTREAM: true }
    )
  } catch (err) {
    // group already exists
  }

  while (true) {
    const data = await redis.xReadGroup(
      "workers",
      "worker-1",
      [{ key: "transactions_stream", id: ">" }],
      { COUNT: 1, BLOCK: 5000 }
    )

    if (!data) continue

    const msg = data[0].messages[0]
    const { userId, amount, transactionId } = msg.message

    try {
      await processTransaction(userId, Number(amount), transactionId)
      await redis.xAck("transactions_stream", "workers", msg.id)
    } catch (err) {
      console.error("❌ Processing failed:", err.message)
    }
  }
}

start()
