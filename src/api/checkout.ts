

const BASE_URL = import.meta.env.VITE_API_BASE_URL
export interface ShippingAddrss {
    fullName: string,
    street: string,
    city: string,
    postalCode: string,
    country: string
}

export interface CheckoutRequest {
    cartId: string,
    paymentMethodId: string,
    shippingMethod: string,
    shippingAddress: ShippingAddrss
}


export const startPayment = async (request: CheckoutRequest, token: any) => {

    const response = await fetch(
        `${BASE_URL}api/private/checkout`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
                'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                request
            )
        }
    )

    return response.json()
}