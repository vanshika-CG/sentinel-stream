"use client"

import { useState } from "react"

const API = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const [userId, setUserId] = useState("")
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [amount, setAmount] = useState("")
  const [txId, setTxId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function loadUser() {
    setError("")
    try {
      const user = await fetch(`${API}/users/${userId}`).then(r => r.json())
      const txs = await fetch(`${API}/transactions/${userId}`).then(r => r.json())

      setBalance(user.balance)
      setTransactions(txs)
    } catch {
      setError("Failed to load user")
    }
  }

  async function sendTransaction() {
    setLoading(true)
    setError("")

    try {
      await fetch(`${API}/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: Number(amount),
          transactionId: txId,
        }),
      })

      setAmount("")
      setTxId("")

      setTimeout(loadUser, 800)
    } catch {
      setError("Transaction failed")
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>SentinelStream Dashboard</h1>

      <input
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        style={{ width: 420, padding: 8 }}
      />
      <button onClick={loadUser} style={{ marginLeft: 10 }}>
        Load User
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {balance !== null && (
        <>
          <h2>Balance: ₹{balance}</h2>

          <h3>Send Transaction</h3>
          <input
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <input
            placeholder="Transaction ID"
            value={txId}
            onChange={e => setTxId(e.target.value)}
            style={{ marginLeft: 10 }}
          />
          <button
            disabled={loading}
            onClick={sendTransaction}
            style={{ marginLeft: 10 }}
          >
            Send
          </button>

          <h3>Transactions</h3>
          <ul>
            {transactions.map(t => (
              <li key={t.transaction_id}>
                {t.transaction_id} — ₹{t.amount} — {t.status}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
