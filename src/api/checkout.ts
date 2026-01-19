

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const CLIENT_ID = import.meta.env.CLIENT_ID
const CLIENT_SECRET = import.meta.env.CLIENT_SECRET

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
                'X-Client-Id': CLIENT_ID,
                'X-Client-Secret': CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                request
            )
        }
    )

    return response.json()
}