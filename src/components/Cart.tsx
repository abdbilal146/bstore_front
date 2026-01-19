import { useLogto } from "@logto/react";
import { useQuery } from "@tanstack/react-query";

import { Box, Button, Center, Grid, Image, Loader, Stack, Text, Title } from "@mantine/core";
import './Cart.scss';
import { IconShoppingCartX } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { getCart } from "../api/cart";

const erpBaseUrl: string = import.meta.env.VITE_ERP_NEXT_BASE_URL

export function Cart() {

    const navigate = useNavigate()

    const { getIdToken, isAuthenticated } = useLogto();

    const { data: cartModel, isLoading, error } = useQuery({
        queryKey: ['cart'],
        enabled: isAuthenticated,
        queryFn: async () => {
            const token = await getIdToken();
            return getCart(token);
        }
    });

    const navigateToCheckout = () => {
        navigate({ to: "/checkout " })
    }

    if (!isAuthenticated) return <Center p="xl"><Text>Please login to view cart</Text></Center>;
    if (isLoading) return <Center p="xl"><Loader /></Center>;
    if (error) return <Center p="xl"><Text color="red">Failed to load cart</Text></Center>;

    const items = cartModel?.items || [];

    if (items.length === 0) {
        return (
            <div className="cart-empty-state">
                <IconShoppingCartX size={48} stroke={1.5} color="#dee2e6" />
                <Text mt="md">Your cart is empty</Text>
            </div>
        );
    }

    return (
        <Box p="md">
            <Title order={3} mb="lg">Your Cart</Title>
            <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack>
                        {items.map((item: any) => (
                            <div key={item.id} className="cart-item">
                                <Image
                                    src={erpBaseUrl + item.image}
                                    alt={item.productId}
                                    className="cart-image"
                                    radius="sm"
                                />
                                <div className="cart-details">
                                    <Text className="cart-product-name">{item.productId}</Text>
                                    <Text className="cart-product-id">ID: {item.productId}</Text>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <div className="cart-summary">
                        <Title order={4} mb="md">Order Summary</Title>

                        <Text fw={600} mb="xs">Delivery</Text>
                        <Text size="sm" c="dimmed" mb="md">Livraison Standard (3-5 days)</Text>

                        <Text fw={600} mb="xs">Payment Method</Text>
                        <Text size="sm" c="dimmed" mb="md">Select in next step</Text>

                        <div className="summary-divider"></div>

                        <div className="summary-row">
                            <Text>Subtotal</Text>
                            <Text>Calculated at checkout</Text>
                        </div>
                        <div className="summary-row">
                            <Text>Livraison</Text>
                            <Text>Free</Text>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <Text>Total</Text>
                            <Text>{cartModel.total} €</Text>
                        </div>

                        <Button onClick={navigateToCheckout} fullWidth mt="xl" size="lg" radius="md" color="dark">
                            Checkout
                        </Button>
                    </div>
                </Grid.Col>
            </Grid>
        </Box>
    );
}