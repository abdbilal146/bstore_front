import { Container, Title, Text, Card, Group, Stack, Badge, Loader, Button, Center, Grid, Image, Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useLogto } from '@logto/react';
import { getMyOrders } from '../../api/order';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const erpBaseUrl = import.meta.env.VITE_ERP_NEXT_BASE_URL;

export default function MyOrderPage() {
    const { isAuthenticated, getIdToken, signIn } = useLogto();

    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['my-orders'],
        enabled: isAuthenticated,
        queryFn: async () => {
            const token = await getIdToken();
            return getMyOrders(token || undefined);
        }
    });

    if (!isAuthenticated) {
        return (
            <>
                <Header />
                <Container size="sm" py="xl" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Title order={2} mb="md">Veuillez vous connecter</Title>
                    <Text mb="xl">Vous devez être connecté pour voir vos commandes.</Text>
                    <Button onClick={() => signIn("http://localhost:5173/callback")}>Se connecter</Button>
                </Container>
                <Footer />
            </>
        );
    }

    if (isLoading) {
        return (
            <>
                <Header />
                <Center style={{ minHeight: '60vh' }}>
                    <Loader size="xl" />
                </Center>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <Container size="xl" py="xl">
                    <Text c="red" size="lg" ta="center">Une erreur est survenue lors du chargement de vos commandes.</Text>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <Container size="xl" py="xl" style={{ minHeight: '80vh' }}>
                <Title order={1} mb="xl">Mes Commandes</Title>

                {orders && orders.length > 0 ? (
                    <Stack gap="lg">
                        {orders.map((order) => (
                            <Card key={order.id} shadow="sm" padding="lg" radius="md" withBorder>
                                <Group justify="space-between" mb="md">
                                    <Box>
                                        <Text fw={700} size="lg">Commande #{order.id}</Text>
                                        <Text c="dimmed" size="sm">
                                            Passée le {new Date(order.createdAt).toLocaleDateString()}
                                        </Text>
                                    </Box>
                                    <Badge size="lg" color="green">Confirmée</Badge>
                                </Group>

                                <Stack gap="md">
                                    {order.items.map((item) => (
                                        <Grid key={item.id} align="center">
                                            <Grid.Col span={2}>
                                                <Image
                                                    src={erpBaseUrl + item.image}
                                                    alt={item.productId}
                                                    radius="md"
                                                    h={80}
                                                    w="auto"
                                                    fit="cover"
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <Text fw={500}>{item.productId}</Text>
                                                <Text size="sm" c="dimmed">Quantité: {item.quantity}</Text>
                                            </Grid.Col>
                                            <Grid.Col span={4} style={{ textAlign: 'right' }}>
                                                <Text fw={600}>${item.productPrice.toFixed(2)}</Text>
                                            </Grid.Col>
                                        </Grid>
                                    ))}
                                </Stack>

                                <Grid mt="md" pt="md" style={{ borderTop: '1px solid #eee' }}>
                                    <Grid.Col span={12} style={{ textAlign: 'right' }}>
                                        <Text size="xl" fw={700}>
                                            Total: ${order.items.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0).toFixed(2)}
                                        </Text>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        ))}
                    </Stack>
                ) : (
                    <Center py="xl">
                        <Stack align="center">
                            <Text size="lg">Vous n'avez passé aucune commande pour le moment.</Text>
                            <Button component="a" href="/">Commencer vos achats</Button>
                        </Stack>
                    </Center>
                )}
            </Container>
            <Footer />
        </>
    );
}


