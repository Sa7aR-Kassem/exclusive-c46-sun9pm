import CheckoutForm from "@/components/checkout/CheckoutForm/CheckoutForm";


interface CheckoutPageProps {
    searchParams: {
        id: string
    }
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
    console.log(searchParams);
    const { id } = await searchParams
    console.log("CheckoutPage", id);


    return <section className="py-12">
        <div className="max-w-2xl mx-auto px-10">

            <CheckoutForm cartId={id} />


        </div>




    </section>;
}
