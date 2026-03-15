import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";




export async function getEncodeToken() {
    const cookie = await cookies()
    const token = cookie.get('next-auth.session-token')?.value
    // console.log("addToCart", token);
    const encodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
    // console.log("addToCart encodedToken", encodedToken?.accessToken);


    return encodedToken

}
export async function getUserToken() {
    return (await getEncodeToken())?.accessToken

}
export async function getUserId() {
    return (await getEncodeToken())?.user.id

}