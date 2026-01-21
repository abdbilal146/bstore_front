import { IconHeart, IconShoppingCart, IconUser } from '@tabler/icons-react'
import './Header.scss'
import { Divider, Image, Indicator, HoverCard, Container, Grid, Stack, Text } from '@mantine/core'
import logo from "../assets/logo.png"
import { useDisclosure } from '@mantine/hooks'
import Drawer from './Drawer'
import { useLogto } from '@logto/react'
import { useNavigate } from '@tanstack/react-router'
import { useState, type ReactNode } from 'react'
import Wishlist from './Wishlist'
import { Cart } from './Cart'
import { useQuery } from '@tanstack/react-query'
import { useCartApi } from '../api/cart'


const VITE_FRONT_DOMAIN_CALLBACK = import.meta.env.VITE_FRONT_DOMAIN_CALLBACK



const categoryList: any[] = [
    "Femme",
    "Homme",
    "Enfant"
]

const icons: { name: string, type: string, icon: any }[] = [
    {
        name: "user",
        type: "auth",
        icon: IconUser
    },
    {
        name: "favourite",
        type: "wishlist",
        icon: IconHeart
    },
    {
        name: "cart",
        type: "cart",
        icon: IconShoppingCart
    }
]

const navigations: { name: string, items?: string[] }[] = [
    {
        name: "Vetements",
        items: ["Robes", "Hauts", "Pantalons", "Jeans", "Manteaux & Vestes", "Jupes"]
    },
    {
        name: "Chaussures",
        items: ["Baskets", "Bottes", "Sandales", "Talons", "Mocassins"]
    },
    {
        name: "Accessoires",
        items: ["Sacs", "Bijoux", "Lunettes", "Ceintures", "Chapeaux"]
    },
    {
        name: "Luxe & Créateurs",
        items: ["Sacs de luxe", "Chaussures de luxe", "Prêt-à-porter"]
    },
    {
        name: "Sport",
        items: ["Vêtements de sport", "Chaussures de sport", "Accessoires"]
    },
    {
        name: "Beauté",
        items: ["Maquillage", "Soins", "Parfums", "Capillaire"]
    }
]

export default function Header() {

    const [opened, { open, close }] = useDisclosure()
    const { signIn, isAuthenticated, isLoading, getIdToken } = useLogto()
    const navigate = useNavigate()
    const [drawerContent, setDrawerContent] = useState<ReactNode>()
    const {getCart} = useCartApi()


    const { data: cartModel } = useQuery({
        queryKey: ['cart'],
        enabled: isAuthenticated,
        queryFn: async () => {
            return getCart();
        }
    });


    const triggerClick = async (iconType: string) => {
        if (iconType === "auth") {
            if (isLoading) return
            // console.log(isAuthenticated) // Cleanup console log

            if (isAuthenticated) {
                navigate({ to: '/user' })
            }
            else {
                await signIn(VITE_FRONT_DOMAIN_CALLBACK)

            }
        } else {
            if (iconType === 'wishlist') {
                setDrawerContent(
                    () => <Wishlist></Wishlist>
                )

            }

            if (iconType === 'cart') {
                setDrawerContent(
                    <Cart></Cart>
                )
            }

            open()
        }
    }

    const categoryItems = categoryList.map(item => {
        return <li key={item}>{item}</li>
    })

    const iconItems = icons.map(item => {
        const Icon = item.icon
        if (item.type === 'cart' && cartModel?.items?.length > 0) {
            return (
                <Indicator key={item.name} label={cartModel.items.length} size={16} offset={4} color="red" withBorder>
                    <Icon onClick={() => triggerClick(item.type)} className='icon' />
                </Indicator>
            )
        }
        if (item.type === 'auth' && isAuthenticated) {
            return (
                <Indicator key={item.name} size={10} offset={4} color="green" withBorder processing>
                    <Icon onClick={() => triggerClick(item.type)} className='icon' />
                </Indicator>
            )
        }
        return <Icon onClick={() => triggerClick(item.type)} className='icon' key={item.name} />
    })

    const navigationItems = navigations.map(item => {
        if (item.items) {
            return (
                <li key={item.name}>
                    <HoverCard width="100%" shadow="md" withinPortal position="bottom" openDelay={50} closeDelay={200}>
                        <HoverCard.Target>
                            <span style={{ cursor: 'pointer', display: 'block', height: '100%', padding: '0.5rem 0' }}>{item.name}</span>
                        </HoverCard.Target>
                        <HoverCard.Dropdown style={{ border: 0, marginTop: -10, borderRadius: 0 }}>
                            <Container size="xl" className="mega-menu-dropdown">
                                <Grid>
                                    <Grid.Col span={3}>
                                        <Text fw={700} mb="md" size="lg">Catégories</Text>
                                        <Stack gap="xs">
                                            {item.items.map(subItem => (
                                                <Text key={subItem} className="mega-menu-item">{subItem}</Text>
                                            ))}
                                        </Stack>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Text fw={700} mb="md" size="lg">Tendances</Text>
                                        <Text className="mega-menu-item">Nouveautés</Text>
                                        <Text className="mega-menu-item">Meilleures ventes</Text>
                                        <Text className="mega-menu-item">Promotions</Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <div style={{ background: '#f8f9fa', height: '100%', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text c="dimmed">Image Collection {item.name}</Text>
                                        </div>
                                    </Grid.Col>
                                </Grid>
                            </Container>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </li>
            )
        }
        return <li key={item.name}>{item.name}</li>
    })

    const goToHomePage = () => {
        navigate({ to: '/' })
    }




    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                title="Menu"
            >
                {/* Dynamic content can go here */}
                {drawerContent}

            </Drawer>
            <header>
                <div className='header-first-section'>
                    <div className='categories-container item'>
                        <ul>
                            {categoryItems}
                        </ul>
                    </div>
                    <div className='logo-container item'>
                        <Image onClick={goToHomePage} className='logo' alt='logo' src={logo}></Image>
                    </div>
                    <div className='options-section item'>
                        <div>
                            {iconItems}
                        </div>
                    </div>
                </div>
                <Divider my={'xs'} color='black' className='divider'></Divider>
                <nav className='navigation-container'>
                    <div>
                        <ul>
                            {navigationItems}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}