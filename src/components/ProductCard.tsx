import { AspectRatio, Box, Card, Image, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import './ProductCard.scss'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, getAllProductWishlist, deleteProductFromWishlist } from "../api/wishlist";
import { useLogto } from "@logto/react";

const erpNextBasUrl: string = import.meta.env.VITE_ERP_NEXT_BASE_URL;

export default function ProductCard({ imageSource, productId, onClick, productName, price }: { imageSource: string, productId: string, onClick: () => void, productName: string, price: string }) {

    const { getIdToken, isAuthenticated, signIn } = useLogto()
    const queryClient = useQueryClient()
    const { data, error, isLoading } = useQuery<any[]>({
        queryKey: ['wishlist', isAuthenticated],
        enabled: isAuthenticated,
        queryFn: async () => {
            console.log("🔄 L'API WISHLIST EST APPELÉE !");
            const token = await getIdToken();
            return getAllProductWishlist(token);
        }

    })

    const isInWishlist = data?.some(item => item.productId === productId) ?? false;

    const addMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = await getIdToken();
            return addToWishlist(id, imageSource, token);
        },
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: ['wishlist'] });

            const previous = queryClient.getQueryData<any[]>(['wishlist']);

            queryClient.setQueryData<any[]>(['wishlist'], (old = []) => [
                ...old,
                { productId }
            ]);

            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['wishlist'], context?.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = await getIdToken();
            return deleteProductFromWishlist(id, token);
        },
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: ['wishlist'] });

            const previous = queryClient.getQueryData<any[]>(['wishlist']);

            queryClient.setQueryData<any[]>(['wishlist'], (old = []) =>
                old.filter(item => item.productId !== productId)
            );

            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['wishlist'], context?.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        }
    });

    if (isLoading) return null


    const handleAddWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            signIn("http://localhost:5173/callback")
            return null
        }

        if (isInWishlist) {
            deleteMutation.mutate(productId)
        } else {
            addMutation.mutate(productId)
        }
    }

    return (
        <Card className="card-container" padding="0" onClick={onClick}>
            <Box pos="relative">
                <AspectRatio ratio={3 / 4}>
                    <Image src={erpNextBasUrl + imageSource} fit="cover" alt="product" />
                </AspectRatio>

                <Box pos="absolute" className="heart-container">
                    {/* handleAddWishlist*/}

                    {isInWishlist ? (
                        <IconHeartFilled onClick={handleAddWishlist} color="#fa5252" />
                    ) : (
                        <IconHeart onClick={handleAddWishlist} color="#222" />
                    )}
                </Box>
            </Box>
            <div className="product-info">
                <Text size="sm" fw={500} mt="sm" lineClamp={2}>{productName}</Text>
                <Text size="sm" fw={700} c="dimmed">{price} €</Text>
            </div>
        </Card>
    )
}