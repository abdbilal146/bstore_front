import { useState } from 'react';
import './CheckoutPage.scss';
import {
    IconBrandPaypal,
    IconCreditCard,
    IconTruckDelivery,
    IconShieldCheck,
    IconRefresh,
    IconLock
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCart } from '../../api/cart';
import { useLogto } from '@logto/react';
import { startPayment, type CheckoutRequest, type ShippingAddrss } from '../../api/checkout';
import {
    Container,
    Grid,
    Card,
    Stack,
    TextInput,
    Button,
    Title,
    Text,
    Group,
    Divider,
    ThemeIcon,
    Box
} from '@mantine/core';
import Footer from '../../components/Footer';

const erpBaseUrl = import.meta.env.VITE_ERP_NEXT_BASE_URL;

export default function CheckoutPage() {
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [shippingMethod, setShippingMethod] = useState('STANDARD');
    const { isAuthenticated, getIdToken, signIn } = useLogto();
    const queryClient = useQueryClient();

    const { data: cartData } = useQuery({
        enabled: isAuthenticated,
        queryKey: ["cart"],
        queryFn: async () => {
            const token = await getIdToken();
            return getCart(token);
        }
    });

    const mutation = useMutation({
        mutationFn: async (request: CheckoutRequest) => {
            const token = await getIdToken();
            return startPayment(request, token);
        },
        onMutate: async (request) => {
            await queryClient.cancelQueries({ queryKey: ['cart'] });

            const previous = queryClient.getQueryData(['cart']);
            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['cart'], context?.previous);
            alert("Payment failed. Please try again.");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onSuccess: (data) => {
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                console.log('No url present , payment failed')
            }
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isAuthenticated) {
            signIn("http://localhost:5173/callback");
            return;
        }

        const formData = new FormData(e.currentTarget);

        const shippingAddress: ShippingAddrss = {
            fullName: formData.get('shippingAddress.fullName') as string,
            street: formData.get('shippingAddress.street') as string,
            city: formData.get('shippingAddress.city') as string,
            postalCode: formData.get('shippingAddress.postalCode') as string,
            country: formData.get('shippingAddress.country') as string
        };

        const request: CheckoutRequest = {
            cartId: cartData.id as string,
            paymentMethodId: formData.get('paymentMethodId') as string,
            shippingMethod: formData.get('shippingMethod') as string,
            shippingAddress: shippingAddress
        };

        mutation.mutate(request);
    };

    const shippingCost = shippingMethod === 'EXPRESS' ? 15 : 0;
    const subTotal = cartData?.total || 0;
    const total = subTotal + shippingCost;

    return (
        <>
            <div className="checkout-container">
                <Container fluid className="checkout-content">
                    <Box className="checkout-header mobile-only" mb="xl" ta="center" hiddenFrom="sm">
                        <Title className="checkout-title">Paiement</Title>
                    </Box>

                    <Grid gutter={40} className="checkout-layout">
                        {/* Left Column: Form */}
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Box className="checkout-main">
                                <Box className="checkout-header desktop-only" mb="xl" visibleFrom="sm">
                                    <Title className="checkout-title" order={1}>Paiement</Title>
                                    <Text className="checkout-subtitle">Finalisez votre commande en toute sécurité.</Text>
                                </Box>

                                <form className="checkout-form" onSubmit={handleSubmit}>
                                    {/* Hidden Cart ID */}
                                    <input
                                        type="hidden"
                                        name="cartId"
                                        value={cartData?.id || ''}
                                    />

                                    <Stack gap="xl">
                                        <Box className="form-section">
                                            <Title order={2} className="section-title">Informations de Livraison</Title>

                                            <Stack gap="md">
                                                <TextInput
                                                    label="Nom Complet"
                                                    name="shippingAddress.fullName"
                                                    placeholder="ex: Bilal Mancer"
                                                    defaultValue="Bilal Mancer"
                                                    required
                                                    classNames={{ root: 'input-group full-width' }}
                                                />

                                                <TextInput
                                                    label="Adresse"
                                                    name="shippingAddress.street"
                                                    placeholder="ex: 10 rue de Paris"
                                                    defaultValue="10 rue de Paris"
                                                    required
                                                    classNames={{ root: 'input-group full-width' }}
                                                />

                                                <Group grow>
                                                    <TextInput
                                                        label="Ville"
                                                        name="shippingAddress.city"
                                                        placeholder="Paris"
                                                        defaultValue="Paris"
                                                        required
                                                        classNames={{ root: 'input-group' }}
                                                    />
                                                    <TextInput
                                                        label="Code Postal"
                                                        name="shippingAddress.postalCode"
                                                        placeholder="75001"
                                                        defaultValue="75001"
                                                        required
                                                        classNames={{ root: 'input-group' }}
                                                    />
                                                </Group>

                                                <TextInput
                                                    label="Pays"
                                                    name="shippingAddress.country"
                                                    placeholder="FR"
                                                    defaultValue="FR"
                                                    required
                                                    classNames={{ root: 'input-group full-width' }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Box className="form-section">
                                            <Title order={2} className="section-title">Mode de Livraison</Title>
                                            <Stack className="shipping-options" gap="sm">
                                                <label className="radio-card">
                                                    <input
                                                        type="radio"
                                                        name="shippingMethod"
                                                        value="STANDARD"
                                                        checked={shippingMethod === 'STANDARD'}
                                                        onChange={() => setShippingMethod('STANDARD')}
                                                    />
                                                    <div className="card-content">
                                                        <div className="icon-box">
                                                            <IconTruckDelivery size={24} />
                                                        </div>
                                                        <div className="text-content">
                                                            <span className="title">Livraison Standard</span>
                                                            <span className="description">3-5 Jours Ouvrés</span>
                                                        </div>
                                                        <span className="price">Gratuit</span>
                                                    </div>
                                                </label>
                                                <label className="radio-card">
                                                    <input
                                                        type="radio"
                                                        name="shippingMethod"
                                                        value="EXPRESS"
                                                        checked={shippingMethod === 'EXPRESS'}
                                                        onChange={() => setShippingMethod('EXPRESS')}
                                                    />
                                                    <div className="card-content">
                                                        <div className="icon-box">
                                                            <IconTruckDelivery size={24} />
                                                        </div>
                                                        <div className="text-content">
                                                            <span className="title">Livraison Express</span>
                                                            <span className="description">1-2 Jours Ouvrés</span>
                                                        </div>
                                                        <span className="price">$15.00</span>
                                                    </div>
                                                </label>
                                            </Stack>
                                        </Box>

                                        <Box className="form-section">
                                            <Title order={2} className="section-title">Moyen de Paiement</Title>
                                            <input type="hidden" name="paymentMethodId" value={selectedPayment === 'card' ? 'pm_card_visa' : 'pm_paypal'} />

                                            <Group grow className="payment-options">
                                                <div
                                                    className={`payment-card ${selectedPayment === 'card' ? 'selected' : ''}`}
                                                    onClick={() => setSelectedPayment('card')}
                                                >
                                                    <IconCreditCard size={32} stroke={1.5} />
                                                    <span>Carte Bancaire</span>
                                                </div>
                                                <div
                                                    className={`payment-card ${selectedPayment === 'paypal' ? 'selected' : ''}`}
                                                    onClick={() => setSelectedPayment('paypal')}
                                                >
                                                    <IconBrandPaypal size={32} stroke={1.5} />
                                                    <span>PayPal</span>
                                                </div>
                                            </Group>
                                        </Box>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            size="xl"
                                            className="checkout-btn black-btn"
                                            loading={mutation.isPending}
                                        >
                                            {mutation.isPending ? 'Traitement...' : `Payer $${total.toFixed(2)}`}
                                        </Button>
                                    </Stack>
                                </form>
                            </Box>
                        </Grid.Col>

                        {/* Right Column: Order Summary */}
                        <Grid.Col span={{ base: 12, md: 5 }} className="checkout-sidebar">
                            <Card className="order-summary-card" radius="lg">
                                <Title order={2} className="summary-title">Résumé de la Commande</Title>

                                <Stack className="product-list" gap="md">
                                    {cartData?.items?.map((item: any) => (
                                        <Group key={item.id} className="summary-item" align="center" wrap="nowrap">
                                            <Box className="item-image" w={60} h={60}>
                                                <img src={erpBaseUrl + item.image} alt={item.productId} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Box>
                                            <Stack gap={2} style={{ flex: 1 }} className="item-details">
                                                <Text className="item-name" fw={500}>{item.productId}</Text>
                                            </Stack>
                                            <Text className="item-price" fw={600}>${item.productPrice}</Text>
                                        </Group>
                                    ))}
                                </Stack>

                                <Stack className="price-breakdown" gap="sm">
                                    <Group justify="space-between" className="price-row">
                                        <Text c="dimmed">Sous-total</Text>
                                        <Text fw={500}>${subTotal.toFixed(2)}</Text>
                                    </Group>
                                    <Group justify="space-between" className="price-row">
                                        <Text c="dimmed">Livraison</Text>
                                        <Text fw={500}>{shippingCost === 0 ? 'Gratuit' : `$${shippingCost.toFixed(2)}`}</Text>
                                    </Group>
                                    <Divider my="sm" variant="dashed" />
                                    <Group justify="space-between" className="price-row total">
                                        <Text size="lg" fw={700}>Total</Text>
                                        <Text size="lg" fw={700}>${total.toFixed(2)}</Text>
                                    </Group>
                                </Stack>
                            </Card>

                            {/* Trust & Info Badge */}
                            <Stack className="trust-badges" gap="md">
                                <Group className="trust-item" gap="md" wrap="nowrap" align="flex-start">
                                    <ThemeIcon variant="transparent" c="black">
                                        <IconShieldCheck size={24} />
                                    </ThemeIcon>
                                    <Box>
                                        <Text fw={600} size="sm">Paiement Sécurisé</Text>
                                        <Text size="xs" c="dimmed">Vos informations de paiement sont cryptées et sécurisées.</Text>
                                    </Box>
                                </Group>
                                <Group className="trust-item" gap="md" wrap="nowrap" align="flex-start">
                                    <ThemeIcon variant="transparent" c="black">
                                        <IconRefresh size={24} />
                                    </ThemeIcon>
                                    <Box>
                                        <Text fw={600} size="sm">Retours sous 30 Jours</Text>
                                        <Text size="xs" c="dimmed">Satisfait ou remboursé sous 30 jours.</Text>
                                    </Box>
                                </Group>
                                <Group className="trust-item" gap="md" wrap="nowrap" align="flex-start">
                                    <ThemeIcon variant="transparent" c="black">
                                        <IconLock size={24} />
                                    </ThemeIcon>
                                    <Box>
                                        <Text fw={600} size="sm">Confidentialité</Text>
                                        <Text size="xs" c="dimmed">Nous respectons votre vie privée et vos données.</Text>
                                    </Box>
                                </Group>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Container>
            </div>
            <Footer></Footer>
        </>
    );
}
