"use server"

import { getUserId, getUserToken } from "@/lib/server-utils";
import { AddressPayloadType } from "@/schema/address.schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";




export async function getUserOrders() {
    try {

        const userId = await getUserId()

        const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await resp.json()


        if (!resp.ok) {
            throw new Error(data.message || "Failed to fetch user orders");
        }

        return {
            ...data,
            status: true
        }


    } catch (error) {
        return {
            error,
            status: false
        }
    }
}
export async function createOrder(cartId: string, formValues: AddressPayloadType) {
    try {

        const { paymentMethod, ...shippingAddress } = formValues;
        const endpoint = paymentMethod === "cash"
            ? `api/v2/orders/${cartId}`
            : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`

        const token = await getUserToken()

        const resp = await fetch(`https://ecommerce.routemisr.com/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            body: JSON.stringify({ shippingAddress })
        });

        const data = await resp.json()


        if (!resp.ok) {
            throw new Error(data.message || "Failed to create an order");
        }
        const successRes = {
            ...data,
            status: true
        }

        if (successRes.status) {
            revalidateTag("cartDetails", "max")
        }

        return successRes


    } catch (error) {
        return {
            error,
            status: false
        }
    }
}


