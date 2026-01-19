import './Footer.scss'
import { Container, Grid, Text, TextInput, Button, Group, ActionIcon, Title } from '@mantine/core'
import { IconBrandInstagram, IconBrandFacebook, IconBrandTwitter, IconBrandPinterest } from '@tabler/icons-react'

export default function Footer() {
    return (
        <footer className="footer-container">
            <Container size="xl" className="footer-content">
                <Grid>
                    {/* Column 1: About */}
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <div className="footer-column">
                            <Title order={5} className="footer-title">À propos</Title>
                            <a href="#" className="footer-link">Qui sommes-nous ?</a>
                            <a href="#" className="footer-link">Carrières</a>
                            <a href="#" className="footer-link">Développement durable</a>
                            <a href="#" className="footer-link">Presse</a>
                        </div>
                    </Grid.Col>

                    {/* Column 2: Help */}
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <div className="footer-column">
                            <Title order={5} className="footer-title">Aide</Title>
                            <a href="#" className="footer-link">FAQ</a>
                            <a href="#" className="footer-link">Livraison & Retours</a>
                            <a href="#" className="footer-link">Guide des tailles</a>
                            <a href="#" className="footer-link">Contactez-nous</a>
                        </div>
                    </Grid.Col>

                    {/* Column 3: Legal */}
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <div className="footer-column">
                            <Title order={5} className="footer-title">Légal</Title>
                            <a href="#" className="footer-link">CGV</a>
                            <a href="#" className="footer-link">Politique de confidentialité</a>
                            <a href="#" className="footer-link">Mentions légales</a>
                            <a href="#" className="footer-link">Cookies</a>
                        </div>
                    </Grid.Col>

                    {/* Column 4: Newsletter */}
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <div className="footer-column">
                            <Title order={5} className="footer-title">Newsletter</Title>
                            <Text size="sm" c="dimmed" mb="xs">Inscrivez-vous pour recevoir nos dernières actualités et offres exclusives.</Text>
                            <div className="newsletter-input">
                                <Group gap="xs">
                                    <TextInput placeholder="Votre email" style={{ flex: 1 }} />
                                    <Button color="black" radius="sm">Ok</Button>
                                </Group>
                            </div>
                        </div>
                    </Grid.Col>
                </Grid>

                <div className="footer-social-section">
                    <Text className="copyright-text">© 2026 BStore. Tous droits réservés.</Text>
                    <div className="social-icons">
                        <ActionIcon variant="subtle" color="gray"><IconBrandInstagram /></ActionIcon>
                        <ActionIcon variant="subtle" color="gray"><IconBrandFacebook /></ActionIcon>
                        <ActionIcon variant="subtle" color="gray"><IconBrandTwitter /></ActionIcon>
                        <ActionIcon variant="subtle" color="gray"><IconBrandPinterest /></ActionIcon>
                    </div>
                </div>
            </Container>
        </footer>
    )
}