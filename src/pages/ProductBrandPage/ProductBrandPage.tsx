import { useQuery } from "@tanstack/react-query";
import { fetchAllTemplates, fetchProducts } from "../../api/product";
import { Center, Loader, Container, Title, SimpleGrid, Text, Box } from "@mantine/core";
import { productListPageRoute } from "../../router/routes";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "@tanstack/react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import './ProductBrandPage.scss';

const query = {
    fields: ['custom_tags', 'image', 'name', 'brand', 'item_name', 'custom_price'],
    page: 1,
    size: 20
}

export default function ProductBrandPage() {
    const { brand } = productListPageRoute.useParams()
    const navigate = useNavigate()

    const { data: products, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: () => {
            return fetchAllTemplates(query)
        }
    })

    if (isLoading) {
        return (
            <Center style={{ height: '100vh' }}>
                <Loader color="blue" />
            </Center>
        )
    }

    const filteredProducts: any[] = products?.data.filter((product: any) => {
        return product.brand.toLowerCase() === brand.toLowerCase()
    }) ?? [];

    const goToPdp = (id: string) => {
        navigate({ to: "/product_page/$productId", params: { productId: id } })
    }

    // Placeholder description - in a real app this would come from an API
    const brandDescription = `Découvrez la collection exclusive de ${brand}. Une sélection de produits raffinés alliant style et qualité pour sublimer votre quotidien.`

    return (
        <div className="brand-page-container">
            <Header />

            {/* Hero Section */}
            <Box className="brand-hero-section has-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')` }}>
                <Box className="brand-content">
                    <Title className="brand-title" tt="capitalize">{brand}</Title>
                    <Text className="brand-description">{brandDescription}</Text>
                </Box>
            </Box>

            <Container size="xl" py="xl">
                {filteredProducts.length > 0 ? (
                    <SimpleGrid cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5 }} spacing="lg" verticalSpacing="xl">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.name}
                                productId={product.name}
                                imageSource={product.image}
                                onClick={() => goToPdp(product.name)}
                                productName={product.item_name}
                                price={product.custom_price}
                            />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Center h={400}>
                        <Text size="lg" c="dimmed">Aucun produit trouvé pour {brand}</Text>
                    </Center>
                )}
            </Container>

            <Footer />
        </div>
    )
}