const BASE_URL = import.meta.env.VITE_API_BASE_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

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
                'X-Client-Id': CLIENT_ID,
                'X-Client-Secret': CLIENT_SECRET,
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
                'X-Client-Id': CLIENT_ID,
                'X-Client-Secret': CLIENT_SECRET,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.json()
}
