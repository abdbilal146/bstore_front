import { useQuery } from '@tanstack/react-query';
import { useLogto } from '@logto/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { IconCircleCheckFilled, IconShoppingBag, IconReceipt } from '@tabler/icons-react';
import { getLastOrder } from '../../api/order';
import './OrderConfirmationPage.scss';
import {
    Container,
    Card,
    Title,
    Text,
    Button,
    Group,
    Stack,
    ThemeIcon,
    Loader,
    Center,
    Image,
    Badge
} from '@mantine/core';

export default function OrderConfirmationPage() {
    const { isAuthenticated, getIdToken } = useLogto();
    const { session_id } = useSearch({ from: '/checkout/success' });
    const navigate = useNavigate();

    const { data: order, isLoading } = useQuery({
        queryKey: ['latestOrder'],
        enabled: isAuthenticated && !!session_id,
        queryFn: async () => {
            const token = await getIdToken();
            return getLastOrder(token ?? undefined);
        }
    });

    if (isLoading) {
        return (
            <Center h="100vh">
                <Loader color="blue" />
            </Center>
        );
    }

    return (
        <div className="confirmation-page">
            <Container size="sm">
                <Card className="confirmation-card" padding="xl" radius="md">
                    <div className="success-header">
                        <ThemeIcon className="icon-wrapper" variant="light" color="green" size={80} radius={100}>
                            <IconCircleCheckFilled size={50} />
                        </ThemeIcon>

                        <Title className="title" order={1} size="h2">
                            Merci pour votre commande !
                        </Title>

                        <Text className="subtitle" size="lg">
                            Votre commande a été confirmée avec succès. Vous recevrez un email de confirmation sous peu.
                        </Text>
                    </div>

                    {order && (
                        <Card className="order-summary-box" padding="md">
                            <Group justify="space-between" className="header-row">
                                <Group gap="xs">
                                    <IconReceipt size={20} color="gray" />
                                    <Text fw={600}>Commande #{order.id}</Text>
                                </Group>
                                <Badge color="green" variant="light" size="lg">Payée</Badge>
                            </Group>

                            <Stack className="items-list">
                                {order.items.map((item) => (
                                    <Group key={item.id} justify="space-between" wrap="nowrap" className="product-row">
                                        <Group gap="md" wrap="nowrap">
                                            {item.image && (
                                                <Image
                                                    className="product-image"
                                                    src={import.meta.env.VITE_ERP_NEXT_BASE_URL + item.image}
                                                    w={50}
                                                    h={50}
                                                    radius="sm"
                                                    fit="cover"
                                                    fallbackSrc="https://placehold.co/50"
                                                />
                                            )}
                                            <Stack gap={0}>
                                                <Text fw={500} lineClamp={1}>Produit {item.productId}</Text>
                                                <Text size="sm" c="dimmed">Quantité: {item.quantity}</Text>
                                            </Stack>
                                        </Group>
                                        <Text fw={600}>${item.productPrice?.toFixed(2)}</Text>
                                    </Group>
                                ))}
                            </Stack>

                            <Group justify="space-between" className="total-row">
                                <Text fw={700} size="lg">Total</Text>
                                <Text fw={700} size="lg">
                                    ${order.items.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0).toFixed(2)}
                                </Text>
                            </Group>
                        </Card>
                    )}

                    <Group grow className="action-buttons">
                        <Button
                            variant="default"
                            size="md"
                            onClick={() => navigate({ to: '/user' })}
                        >
                            Voir mes commandes
                        </Button>
                        <Button
                            color="dark"
                            size="md"
                            leftSection={<IconShoppingBag size={18} />}
                            onClick={() => navigate({ to: '/' })}
                        >
                            Continuer vos achats
                        </Button>
                    </Group>
                </Card>
            </Container>
        </div>
    );
}