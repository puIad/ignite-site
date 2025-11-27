import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/transaction-success')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { tr: string } => ({ tr: String(search?.tr) ?? "" }),
})

function RouteComponent() {
  const { tr } = Route.useSearch()
  const handlePostPayment = async () => {
    await fetch(import.meta.env.VITE_API_URL + "/handle-transaction", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ transactionId: tr })
    })
  }
  // useEffect(() => {
  //   const handlePostPayment = async () => {
  //     await fetch(import.meta.env.VITE_API_URL + "/handle-transaction", {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': "application/json"
  //       },
  //       body: JSON.stringify({ transactionId: tr })
  //     })
  //   }
  //   handlePostPayment()
  // }, [])

  return <button onClick={handlePostPayment}>Hello "/success"!</button>
}
