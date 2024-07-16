import { useSelector } from "react-redux";
import { GET_PRODUCT_DETAILS } from "../../helpers/services/api";
import { selectStoreData } from "../reducers/storeDataReducer";

export async function getServerSideProps(context) {
  const state = useSelector(selectStoreData);
  //console.log(state);
  const token = "";

  try {
    const response = await fetch(
      `${GET_PRODUCT_DETAILS}/15704bbe-2776-4f9b-b0e1-40fee8086c3b`,
      {
        headers: { Authorization: `${token}` },
      }
    );
    const data = await response.json();
    return { props: { productDetails: data } };
  } catch (error) {
    console.error("Error fetching product details", error);
    return { props: { productDetails: {} } };
  }
}
