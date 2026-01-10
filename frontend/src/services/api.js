export async function sendTransaction(payload) {
  const res = await fetch("http://localhost:3000/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Request failed")
  }

  return data
}
