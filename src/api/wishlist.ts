

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const addToWishlist = async (productId: string, image: string, token: any) => {

    const response = await fetch(
        `${BASE_URL}api/private/wishlist/add`,
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
            })
        }
    )

    return response.json()
}


export const getAllProductWishlist = async (token: any) => {
    const response = await fetch(`${BASE_URL}api/private/wishlist`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
            'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
        }
    })

    return response.json()
}


export const deleteProductFromWishlist = async (productId: string, token: any) => {
    const response = await fetch(`${BASE_URL}/api/private/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
            'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
        }
    })

    return response.json()
}