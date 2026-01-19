

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const CLIENT_ID = import.meta.env.CLIENT_ID
const CLIENT_SECRET = import.meta.env.CLIENT_SECRET

export interface OrderItem {
    id: number;
    productId: string;
    productPrice: number;
    image: string;
    quantity: number;
}

export interface Order {
    id: number;
    cartId: string;
    userId: string;
    createdAt: string;
    items: OrderItem[];
}

export const getLastOrder = async (token: string | undefined): Promise<Order> => {

    if (!token) {
        throw new Error("No auth token available");
    }

    const response = await fetch(`${BASE_URL}api/private/orders/latest`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': CLIENT_ID,
            'X-Client-Secret': CLIENT_SECRET,
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }

    return response.json();
};

export const getMyOrders = async (token: string | undefined): Promise<Order[]> => {

    if (!token) {
        throw new Error("No auth token available");
    }

    const response = await fetch(`${BASE_URL}api/private/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': CLIENT_ID,
            'X-Client-Secret': CLIENT_SECRET,
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    return response.json();
};
