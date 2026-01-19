import { useLogto } from "@logto/react";
import { SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getAllProductWishlist } from "../api/wishlist";
import ProductCard from "./ProductCard";
import { useNavigate } from "@tanstack/react-router";

export default function Wishlist() {
    const { getIdToken } = useLogto()
    const navigate = useNavigate()

    const { data, isLoading } = useQuery<any[]>({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const token = await getIdToken()
            return getAllProductWishlist(token)
        }
    })

    if (isLoading) return <></>

    const goToPdp = (id: string) => {
        navigate({ to: "/product_page/$productId", params: { productId: id } })
    }

    const wishlistItem = data?.map(item => {
        return (
            <ProductCard
                key={item.productId || item.id}
                imageSource={item.image}
                productId={item.productId}
                onClick={() => goToPdp(item.productId)}
            />
        )
    })

    return (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5, lg: 6 }} spacing="lg" verticalSpacing="lg">
            {wishlistItem}
        </SimpleGrid>
    )
}