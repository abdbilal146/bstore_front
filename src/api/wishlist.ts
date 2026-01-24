

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

export const addToWishlist = async (productId: string, image: string, productName:string,productPrice:string, token: any) => {

    const response = await fetch(
        `${BASE_URL}api/private/wishlist/add`,
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
                productName,
                productPrice,
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
            'X-Client-Id': CLIENT_ID,
            'X-Client-Secret': CLIENT_SECRET,
        }
    })

    return response.json()
}


export const deleteProductFromWishlist = async (productId: string, token: any) => {
    const response = await fetch(`${BASE_URL}api/private/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Client-Id': CLIENT_ID,
            'X-Client-Secret': CLIENT_SECRET,
        }
    })

    return response.json()
}