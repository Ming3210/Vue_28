import axios from "axios";

const getAllCart = async () => {
  const res = await axios.get("http://localhost:8080/cart");
  return res.data;
};

export const addToCart = async (product) => {
  const res = await axios.post("http://localhost:8080/cart", product);
  return res.data;
};

export const delItem = async (id) => {
  const res = await axios.delete(`http://localhost:8080/cart/${id}`);
  return res.data;
};

export const updateCart = async (cart) => {
  const res = await axios.put(`http://localhost:8080/cart/${cart.id}`, cart);
  return res.data;
};

export default getAllCart;
