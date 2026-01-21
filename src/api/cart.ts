import { useLogto } from "@logto/react";
import { useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export function useCartApi() {

  const { getIdToken, signOut, isAuthenticated } = useLogto();


  const fetchWithAuth = useCallback(async (url: string, options: RequestInit = {}) => {


    if (!isAuthenticated) {
      throw new Error("Utilisateur non connecté ou initialisation en cours");
    }

    try {

      const token = await getIdToken();

      const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "X-Client-Id": CLIENT_ID,
          "X-Client-Secret": CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      });


      if (res.status === 401) {

        await signOut();
        throw new Error("Session expirée, veuillez vous reconnecter.");
      }

      if (!res.ok) {
        throw new Error(`Erreur API: ${res.status}`);
      }

      return res;
    } catch (err) {

      // On laisse l'erreur remonter pour que l'UI puisse afficher un message d'erreur
      console.error("Erreur lors de l'appel API:", err);
      throw err;
    }
  }, [isAuthenticated, getIdToken, signOut]);

  const addProductToCart = async (productId: string, productPrice: string, image: string) => {
    const res = await fetchWithAuth("api/private/cart/add-product", {
      method: "POST",
      body: JSON.stringify({ productId, productPrice, image }),
    });
    return res.json();
  };

  const getCart = async () => {
    const res = await fetchWithAuth("api/private/cart", { method: "GET" });
    return res.json();
  };

  return { addProductToCart, getCart };
}