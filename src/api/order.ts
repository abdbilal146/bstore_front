

const BASE_URL = import.meta.env.VITE_API_BASE_URL
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
            'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
            'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
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
            'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
            'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    return response.json();
};
