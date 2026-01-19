

type ProductQuery = Record<string, Array<string> | string | number | boolean | undefined>;

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET



export const fetchAllTemplates = async (query: ProductQuery) => {
    const url = new URL(`${BASE_URL}api/products/templates`);

    Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
        } else {
            url.searchParams.append(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
            'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
        },
    });

    if (!response.ok) {
        throw new Error('Erreur API');
    }

    return response.json();
}; 



export const fetchProducts = async (query: ProductQuery) => {
    const url = new URL(`${BASE_URL}api/products`);

    Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
        } else {
            url.searchParams.append(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
            'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
        },
    });

    if (!response.ok) {
        throw new Error('Erreur API');
    }

    return response.json();
};


export const fetchProductById = async (query: ProductQuery, id: string) => {
    const url = new URL(`${BASE_URL}api/products/${id}`);

    Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
        } else {
            url.searchParams.append(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'X-Client-Id': '1f9b7c3a-4bcd-4f3a-bd4a-8d2e6b5c1234',
            'X-Client-Secret': 'X4aH8vK9LqP1Zb9jF3rU2s9xYk1m2n3pQv4tR5u6V7w=',
        },
    });

    if (!response.ok) {
        throw new Error('Erreur API');
    }

    return response.json();


}


export const fetchVariantsBytemplateId = async (query: ProductQuery, templateName: string) => {


    const url = new URL(`${BASE_URL}api/products/variants`);
    url.searchParams.append("templateName", templateName);

    Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
        } else {
            url.searchParams.append(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'X-Client-Id': CLIENT_ID,
            'X-Client-Secret': CLIENT_SECRET,
        },
    });

    if (!response.ok) {
        throw new Error('Erreur API');
    }

    return response.json();
}