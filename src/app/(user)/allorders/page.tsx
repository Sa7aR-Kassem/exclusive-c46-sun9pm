import { getUserOrders } from '@/actions/orders.actions'
import { getUserId } from '@/lib/server-utils'
import React from 'react'

export default async function MyOrdersPage() {
    const orders = await getUserOrders()
    console.log("MyOrdersPage", orders);


    return (
        <div>MyOrdersPage</div>
    )
}
