import { Metadata } from "next";
import BasketPage from "@/components/BasketPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Cart | Écurie Richartistique",
    description: "Review your selected items and proceed to checkout.",
  };
};

export default function CartPage() {
  return <BasketPage />;
}