const pool = require("../db")

module.exports = async function processTransaction(userId, amount, txId) {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    const res = await client.query(
      "SELECT balance FROM users WHERE id=$1 FOR UPDATE",
      [userId]
    )

    if (!res.rows.length) throw new Error("User not found")
    if (res.rows[0].balance < amount) throw new Error("Insufficient funds")

    await client.query(
      "UPDATE users SET balance = balance - $1 WHERE id=$2",
      [amount, userId]
    )

    await client.query(
      `INSERT INTO transactions (transaction_id, user_id, amount, status)
       VALUES ($1, $2, $3, 'SUCCESS')
       ON CONFLICT (transaction_id) DO NOTHING`,
      [txId, userId, amount]
    )

    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    throw err
  } finally {
    client.release()
  }
}
