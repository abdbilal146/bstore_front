const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface CartItem {
    id: string;
    productId: string;
    image: string;
    productPrice: string;
    // Add other properties if known, e.g., quantity
}


export interface Cart {
    id: string;
    items: CartItem[];
    total: number;
}

export const addProductToCart = async (productId: string, productPrice: string, image: string, token: any) => {

    const response = await fetch(
        `${BASE_URL}api/private/cart/add-product`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
                'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId,
                image,
                productPrice
            })
        }
    )

    return response.json()
}

export const getCart = async (token: any) => {
    const response = await fetch(
        `${BASE_URL}api/private/cart`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
                'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
                'Content-Type': 'application/json'
            }
        }
    )
    return response.json()
}
