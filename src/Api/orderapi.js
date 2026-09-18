import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/orders/`;

export async function createOrder(orderData) {
  const response = await axios.post(API_URL, orderData);
  return response.data;
}