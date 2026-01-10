const express = require("express")
const router = express.Router()
const pool = require("../db")

// GET /users/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      "SELECT id, balance FROM users WHERE id = $1",
      [id]
    )

    if (!result.rows.length) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
