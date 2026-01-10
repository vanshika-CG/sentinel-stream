const redis = require("../redis")

module.exports = async function ensureIdempotency(txId) {
  const key = `idem:${txId}`

  const exists = await redis.get(key)
  if (exists) throw new Error("Duplicate transaction")

  await redis.set(key, "1", { EX: 86400 })
}
