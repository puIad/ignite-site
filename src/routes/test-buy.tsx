import { formStore } from '@/components/form/schema';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-buy')({
  component: RouteComponent,
})

function RouteComponent() {
  const setStep = formStore((state) => state.setStep);
  const partOne = formStore((s) => s.partOne);
  const lang = formStore((state) => state.lang);
  const api_endpoint = import.meta.env.VITE_API_URL
  const transaction_uuid = crypto.randomUUID()
  const url2 = `https://dev.paypart.dz/app/guest?next=newTransaction
                &sellerDelivery=true
                &pickFromStore=true
                &InvitationUuid=RSj29ba3
                &deliveryWilaya=16
                &deliveryCommune=
                &deliveryPlace=
                &buyerRemark=
                &successUrl=http://localhost:3005/transaction-success?tr=${transaction_uuid}
                &failUrl=http://localhost:3005
                &redirectionTag=${transaction_uuid}
                &name=${partOne.first_name}
                &email=${partOne.email}
                &firstName=${partOne.first_name}
                &phoneNumber=${partOne.phone}`

  async function postPayment() {
    await fetch(`${api_endpoint}/post-payment`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ transactionId: transaction_uuid })
    }).then(async res => console.log(await res.json()))
  }
  return (
    <div className="h-dvh w-screen flex items-center justify-center">
      <button onClick={postPayment}
        className="px-6 py-2.5 text-[18px] font-bold border-primary border uppercase hover:scale-101 hover:bg-primary/3 transition-all duration-300 ease-in-out">
        Buy from one of our stands
      </button>
    </div>
  )

}
