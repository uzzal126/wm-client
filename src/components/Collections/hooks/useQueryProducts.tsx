
import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { getHasMore } from "@/helpers/misc";

export const useQueryProducts = (param: string) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasmore] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getProducts(param)
    }, [param]);

    const getProducts = async (param: string) => {
        setLoading(true);
        const res = await dispatch(
            productsApi.endpoints.getProductByCategory.initiate({params: param})
        );
        setTimeout(() => {
            setLoading(false);
        }, 5);

        if (res.isSuccess) {
            if (res.data.success && res.data.status_code === 200) {
                setProducts(res?.data?.data || []);
                setHasmore(getHasMore(res));
            } else {
                setProducts([]);
            }
        }
    };

    return { loading, products, hasMore };
}