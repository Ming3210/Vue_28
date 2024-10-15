import axios from "axios";

const getProduct = async () => {
  const res = await axios.get("http://localhost:8080/products");
  return res.data;
};
export const updateProduct = async (prd) => {
  const res = await axios.put(`http://localhost:8080/products/${prd.id}`, prd);
  return res.data;
};

export default getProduct;
