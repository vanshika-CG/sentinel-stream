const { createClient } = require("redis")

const redis = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
})

redis.on("error", (err) => {
  console.error("❌ API Redis Error:", err)
})

;(async () => {
  await redis.connect()
  console.log("✅ API connected to Redis")
})()

module.exports = redis
