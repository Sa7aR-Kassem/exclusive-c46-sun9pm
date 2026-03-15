"use client"
import { clearUserCart } from '@/actions/cart.actions'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import React from 'react'
import { toast } from 'sonner'

export default function RemoveFromCartButton() {
    const { updateNumOfCartItems } = useCart()
    async function removeAllProductFromCart() {
        const res = await clearUserCart()
        if (res.status) {
            toast.success(res.message);
            updateNumOfCartItems(0)
        } else {
            toast.error(res.error.message)
        }
    }


    return (
        <Button onClick={removeAllProductFromCart} className='capitalize' variant={"destructive"} >
            Remove all products
        </Button>
    )
}
