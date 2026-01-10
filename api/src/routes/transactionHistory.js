const express = require("express")
const router = express.Router()
const pool = require("../db")

// GET /transactions/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params

  try {
    const result = await pool.query(
      `SELECT transaction_id, amount, status, created_at
       FROM transactions
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 20`,
      [userId]
    )

    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
