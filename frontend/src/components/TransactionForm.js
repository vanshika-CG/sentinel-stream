"use client"

import { useState } from "react"
import { sendTransaction } from "@/services/api"

export default function TransactionForm() {
  const [userId, setUserId] = useState("")
  const [amount, setAmount] = useState("")
  const [txId, setTxId] = useState("")
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("")
    setError("")

    try {
      const res = await sendTransaction({
        userId,
        amount: Number(amount),
        transactionId: txId,
      })

      setStatus(res.status)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        className="border p-2 w-full"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Transaction ID"
        value={txId}
        onChange={(e) => setTxId(e.target.value)}
        required
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Send Transaction
      </button>

      {status && <p className="text-green-600">✅ {status}</p>}
      {error && <p className="text-red-600">❌ {error}</p>}
    </form>
  )
}
