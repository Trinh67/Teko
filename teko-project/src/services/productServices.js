import axios from "axios";
import { apiUrl } from "../../config.json";

const ApiUrl = apiUrl + "products";

/**
 * Lấy danh sách hàng hóa
 * @returns Danh sách hàng hóa
 */
const getProducts = async () => {
  const Products = axios.get(ApiUrl).then((response) => {
    return response;
  })
  .catch((err) => {
    return err.response;
  });
  const res = await Products;
  return res.data;
};

export default {
  getProducts,
};
