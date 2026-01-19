import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid, Text, Button, Box, Paper, Avatar, Title } from "@mantine/core";
import { useLogto } from "@logto/react";
import { IconPackage, IconHeart, IconSettings, IconMapPin, IconLogout, IconUser } from "@tabler/icons-react";
import './UserPage.scss';
import { useNavigate } from "@tanstack/react-router";

export default function UserPage() {
    const { isAuthenticated, signOut, fetchUserInfo } = useLogto();
    const naviagte = useNavigate()

    const { data: user } = useQuery({
        queryKey: ['user-info'],
        enabled: isAuthenticated,
        queryFn: async () => {
            return fetchUserInfo();
        }
    });

    const handleLogout = () => {
        signOut('http://localhost:5173');
    };

    const dashboardItems = [
        { title: 'My Orders', icon: IconPackage, desc: 'Track and manage your orders' },
        { title: 'Wishlist', icon: IconHeart, desc: 'Your favorite items' },
        { title: 'Addresses', icon: IconMapPin, desc: 'Manage your shipping addresses' },
        { title: 'Settings', icon: IconSettings, desc: 'Account preferences' },
    ];

    return (
        <div className="user-page-container">
            <Header />

            <Container size="lg" py="xl">
                {isAuthenticated && user && (
                    <Box className="profile-header-card">
                        {user.picture ? (
                            <Avatar src={user.picture} size={100} radius={100} />
                        ) : (
                            <div className="user-avatar-large">
                                <IconUser size={48} />
                            </div>
                        )}

                        <div style={{ flex: 1 }}>
                            <Title order={2}>{user.name || user.username || "User"}</Title>
                            <Text c="dimmed">{user.email}</Text>
                        </div>

                        <Button
                            className="logout-btn"
                            variant="light"
                            color="red"
                            leftSection={<IconLogout size={20} />}
                            onClick={handleLogout}
                            size="md"
                            radius="md"
                        >
                            Log Out
                        </Button>
                    </Box>
                )}

                <Grid gutter="lg">
                    {dashboardItems.map((item, index) => (
                        <Grid.Col onClick={() => { naviagte({ to: '/my-orders' }) }} key={index} span={{ base: 12, sm: 6, md: 3 }}>
                            <Paper className="dashboard-card">
                                <item.icon className="card-icon" size={32} stroke={1.5} />
                                <Text className="card-title">{item.title}</Text>
                                <Text className="card-description">{item.desc}</Text>
                            </Paper>
                        </Grid.Col>
                    ))}
                </Grid>

            </Container>
        </div>
    )
}