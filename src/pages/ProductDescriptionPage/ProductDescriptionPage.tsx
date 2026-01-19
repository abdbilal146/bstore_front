import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { pdpRoute } from "../../router/routes";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  Image,
  Loader,
  Select,
  Text,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchVariantsBytemplateId } from "../../api/product";
import "./ProductDescriptionPage.scss";
import { IconHeart } from "@tabler/icons-react";
import { useLogto } from "@logto/react";
import { addProductToCart } from "../../api/cart";

const query = {
  fields: ["image", "name", "item_name", "description", "custom_price"],
  page: 1,
  size: 20,
};

const erpBaseUrl: string = import.meta.env.VITE_ERP_NEXT_BASE_URL;
const PLACEHOLDER_IMAGE = "/placeholder.png";

type Variant = {
  name: string;
  item_name: string;
  custom_price: string;
  image?: string | null;
  description?: string | null;
};

export default function ProductDescriptionPage() {
  const queryClient = useQueryClient();
  const { getIdToken, isAuthenticated, signIn } = useLogto();
  const { templateId } = pdpRoute.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", templateId],
    queryFn: () => fetchVariantsBytemplateId(query, templateId),
    enabled: !!templateId,
  });

  const variants: Variant[] = Array.isArray((data as any)?.data)
    ? (data as any).data
    : [];

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  // Initialize selected variant when data loads
  useEffect(() => {
    if (variants.length > 0 && !selectedVariant) {
      setSelectedVariant(variants[0]);
    }
  }, [variants]);

  const addMutation = useMutation({
    mutationFn: async ({
      id,
      price,
      image,
    }: {
      id: string;
      price: string;
      image: string;
    }) => {
      const token = await getIdToken();
      return addProductToCart(id, price, image || "", token);
    },
    onMutate: async ({
      id,
      price,
      image,
    }: {
      id: string;
      price: string;
      image: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previous = queryClient.getQueryData<any[]>(["cart"]);

      queryClient.setQueryData<any[]>(["cart"], (old) => [
        ...(Array.isArray(old) ? old : []),
        { productId: id, price, image },
      ]);

      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["cart"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedVariant) return;

    if (!isAuthenticated) {
      signIn("http://localhost:5173/callback");
      return;
    }

    addMutation.mutate({
      id: selectedVariant.name,
      price: selectedVariant.custom_price,
      image: selectedVariant.image || "",
    });
  };

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="blue" />
      </Center>
    );
  }

  if (error || variants.length === 0) {
    return (
      <Center style={{ height: "100vh" }}>
        <Text color="red">Erreur : Impossible de charger le produit.</Text>
      </Center>
    );
  }

  const variantOptions = variants.map((v) => ({
    value: v.name,
    label: v.name.split("-").at(-1)?.toString() || v.item_name,
  }));

  return (
    <>
      <Header />
      <Box className="product-info-container">
        <Box className="product-image-section">
          <AspectRatio ratio={3 / 4}>
            <Image
              src={
                selectedVariant?.image
                  ? erpBaseUrl + selectedVariant.image
                  : PLACEHOLDER_IMAGE
              }
              alt={selectedVariant?.item_name}
              fit="cover"
              radius="md"
            />
          </AspectRatio>
        </Box>

        <Box className="product-details-container">
          <Text className="product-name">{selectedVariant?.item_name}</Text>
          <Text className="product-price">{selectedVariant?.custom_price} Euro</Text>

          {variants.length > 1 && (
            <Box className="product-options">
              <Select
                label="Votre taille"
                placeholder="Sélectionner une variante"
                data={variantOptions}
                value={selectedVariant?.name}
                onChange={(value) =>
                  setSelectedVariant(variants.find((v) => v.name === value) || variants[0])
                }
              />
            </Box>
          )}

          <div className="purchase-btn-container">
            <Button
              fullWidth
              color="dark"
              size="md"
              radius="md"
              onClick={handleAddToCart}
              loading={addMutation.isPending}
            >
              Ajouter le produit au panier
            </Button>

            <ActionIcon variant="default" size="input-md" radius="md">
              <IconHeart size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </div>

          {selectedVariant?.description && (
            <Text
              size="sm"
              color="dimmed"
              mt="xl"
              dangerouslySetInnerHTML={{ __html: selectedVariant.description }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
