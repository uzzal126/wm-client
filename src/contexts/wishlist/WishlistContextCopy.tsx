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
  isLoading: Boolean;
};

export const Context = createContext<WishlistType | undefined>(undefined);

const getLocalWishlistItems = () => {
  try {
    const list = localStorage.getItem("wishlist");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
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

export const Provider = (props: any) => {
  const router = useRouter();
  let user = getAuth();

  const [wishlistItems, setWishlistItems] = useState(getLocalWishlistItems());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    getWishList();
  }, []);
  const getWishList = async () => {
    setLoading(true);
    const res = await queryRequest(WISH_LIST, {
      customer_id: user && user?.id,
    });
    setLoading(false);
    if (res?.success) {
      setWishlistItems(res?.wishlist_details);
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
      const newWishlist = wishlistItems?.filter((e: any) => e?.id !== item?.id);
      setWishlistItems(newWishlist);
      toast.error("Product Removed From Wishlist !");
    }
  };

  // Remove Product From Wishlist
  const removeFromWish = async (item: any) => {
    await handleAddToWishlist(item);
    setWishlistItems(wishlistItems.filter((e: any) => e.id !== item.id));
    toast.error("Product Removed From Wishlist !");
  };

  // const {value} = props

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
