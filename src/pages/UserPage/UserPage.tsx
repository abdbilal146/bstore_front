import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid, Text, Button, Box, Paper, Avatar, Title} from "@mantine/core";
import { useLogto } from "@logto/react";
import { IconPackage, IconHeart, IconSettings, IconMapPin, IconLogout, IconUser, type ReactNode } from "@tabler/icons-react";
import './UserPage.scss';
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Wishlist from "../../components/Wishlist";
import { useDisclosure } from "@mantine/hooks";
import Drawer from "../../components/Drawer";


const FRONT_DOMAIN = import.meta.env.VITE_FRONT_DOMAIN

export default function UserPage() {
    const { isAuthenticated, signOut, fetchUserInfo } = useLogto();
    const naviagte = useNavigate()
    const [opened, { open, close }] = useDisclosure()

    const [drawerContent, setDrawerContent] = useState<ReactNode>()

    const { data: user } = useQuery({
        queryKey: ['user-info'],
        enabled: isAuthenticated,
        queryFn: async () => {
            return fetchUserInfo();
        }
    });

    const handleLogout = () => {
        signOut(FRONT_DOMAIN);
    };

    const dashboardItems = [
        { type:'order' ,title: 'Mes Commandes', icon: IconPackage, desc: 'Suivez et gérez vos commandes' },
        { type:'wishlist' ,title: 'Wishlist', icon: IconHeart, desc: 'Vos articles préférés' },
        { type:'address' ,title: 'Addresses', icon: IconMapPin, desc: 'Gérez vos adresses de livraison' },
        { type:'setting' ,title: 'Paramètres', icon: IconSettings, desc: 'Préférences du compte' },
    ];

    const onClickCat = (type:string) =>{
        if(type==='order'){
            naviagte({ to: '/my-orders' }) 
        }

        if(type==='wishlist'){
            setDrawerContent(()=>{
                return <Wishlist></Wishlist>
            })

            open()
        }
    }

    return (
        <div className="user-page-container">
             <Drawer
                            opened={opened}
                            onClose={close}
                            title="Menu"
                        >
                            
                            {drawerContent}
            
                        </Drawer>
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
                        <Grid.Col onClick={() => {
                             onClickCat(
                                item.type
                             )

                            }
                             } key={index} span={{ base: 12, sm: 6, md: 3 }}>
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

