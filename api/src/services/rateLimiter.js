const redis = require("../redis")

module.exports = async function rateLimit(userId) {
  const key = `rate:${userId}`

  const count = await redis.incr(key)
  if (count === 1) await redis.expire(key, 60)

  if (count > 10) throw new Error("Rate limit exceeded")
}
