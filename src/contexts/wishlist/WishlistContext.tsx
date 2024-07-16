import { getAuth } from "@/helpers/auth/AuthHelper";
import { WISHLIST_UPDATE, WISH_LIST } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type WishlistType = {
  wishlistItems: any;
  addToWish: (e: any) => void;
  removeFromWish: (e: any) => void;
  isLoading: boolean;
};

export const Context = createContext<WishlistType | undefined>(undefined);

export const Provider = (props: any) => {
  const router = useRouter();
  const user = getAuth();

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getWishList();
  }, [user?.id]);

  const getWishList = async () => {
    setLoading(true);
    const res = await queryRequest(WISH_LIST, {
      customer_id: user?.id,
    });
    setLoading(false);
    if (res?.success) {
      setWishlistItems(res?.wishlist_details);
    }
  };

  const handleAddToWishlist = async (item: any) => {
    let user = getAuth();
    const res = await queryRequest(WISHLIST_UPDATE, {
      customer_id: user && user?.id,
      product_id: item?.id,
    });
    if (res?.success) {
      return true;
    } else {
      toast.error("Could not add to wishlist!");
    }
  };

  // Add Product To Wishlist
  const addToWish = async (item: any) => {
    if (!user?.id) {
      router.push("/auth/login");
      return;
    }

    const goodToGo = await handleAddToWishlist(item);
    if (!goodToGo) {
      return;
    }

    const index = wishlistItems.findIndex((wish: any) => wish.id === item.id);
    if (index === -1) {
      toast.success("Product Added To Wishlist");
      setWishlistItems([...wishlistItems, item]);
    } else {
      const newWishlist = wishlistItems.filter((e: any) => e.id !== item.id);
      setWishlistItems(newWishlist);
      toast.error("Product Removed From Wishlist!");
    }
  };

  // Remove Product From Wishlist
  const removeFromWish = async (item: any) => {
    await handleAddToWishlist(item);
    setWishlistItems(wishlistItems.filter((e: any) => e.id !== item.id));
    toast.error("Product Removed From Wishlist!");
  };

  return (
    <Context.Provider
      value={{
        wishlistItems,
        addToWish,
        removeFromWish,
        isLoading: loading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export {
  Context as WishlistContext,
  Provider as WishlistContextProvider,
} from "./WishlistContext";

export const useWishlist = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useWishlist must be used within an WishlistContext");
  }
  return context;
};
