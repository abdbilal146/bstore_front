import { useNavigate } from '@tanstack/react-router';
import { IconX, IconShoppingBag } from '@tabler/icons-react';
import './cancelPage.scss';
import {
    Container,
    Card,
    Title,
    Text,
    Button,
    Group,
    ThemeIcon,
} from '@mantine/core';

export default function CancelPage() {
    const navigate = useNavigate();

    return (
        <div className="cancel-page">
            <Container size="sm">
                <Card className="cancel-card" padding="xl" radius="md">
                    <div className="cancel-header">
                        <ThemeIcon className="icon-wrapper" variant="light" color="red" size={80} radius={100}>
                            <IconX size={50} />
                        </ThemeIcon>

                        <Title className="title" order={1} size="h2">
                            Paiement Annulé
                        </Title>

                        <Text className="subtitle" size="lg">
                            Votre paiement a été annulé. Aucune somme n'a été débitée de votre compte.
                        </Text>
                    </div>

                    <Group grow className="action-buttons">

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