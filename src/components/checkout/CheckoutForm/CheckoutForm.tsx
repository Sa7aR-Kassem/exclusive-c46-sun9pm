"use client";
import { AddressPayloadType, addressSchema, defaultValues } from "@/schema/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createOrder } from "@/actions/orders.actions";
import { useCart } from "@/context/CartContext";
import { Label } from "@/components/ui/label";



interface CheckoutFormProps {
    cartId: string
}

export default function CheckoutForm({ cartId }: CheckoutFormProps) {
    const { updateNumOfCartItems } = useCart()
    const router = useRouter()
    const { handleSubmit, control, watch, getValues } = useForm<AddressPayloadType>({
        defaultValues,
        resolver: zodResolver(addressSchema),
        mode: "onChange"
    })

    async function onSubmit(formValues: AddressPayloadType) {
        console.log(formValues);
        const res = await createOrder(cartId, formValues)
        console.log("CheckoutForm", res);

        if (res.status) {
           
            if (getValues('paymentMethod') === "cash") {
                toast.success(res.message, { duration: 3000 })
                router.push('/allorders')
                updateNumOfCartItems(0);
            } 
            else {
                // router.push(res.session.url)
                open(res.session.url, "_self")
            }

            
        }

        else {
            toast.error(res.error.message)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                {/******** Details  ********/}
                <Controller
                    name="details"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your details"
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                {/******** City  ********/}
                <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>City</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your city"
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                {/******** PostalCode  ********/}
                <Controller
                    name="postalCode"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your postalCode"
                                autoComplete="off"
                                type="postalCode"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/******** Phone  ********/}
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your egyptian phone"
                                autoComplete="off"
                                type="tel"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/******** Payment Method  ********/}
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >

                                <FieldLabel key={"cash"} htmlFor={`cash`}>
                                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>

                                        <RadioGroupItem
                                            value={"cash"}
                                            id={`cash`}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <Label htmlFor="cash">Cash</Label>
                                    </Field>
                                </FieldLabel>
                                <FieldLabel key={"card"} htmlFor={`card`}>
                                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>

                                        <RadioGroupItem
                                            value={"card"}
                                            id={`card`}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <Label htmlFor="card">Card</Label>
                                    </Field>
                                </FieldLabel>

                            </RadioGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </>
                    )}
                />


                <Button type="submit">  Place an order </Button>
            </FieldGroup>


        </form>
    )
}
