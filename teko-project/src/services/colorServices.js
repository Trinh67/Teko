import axios from "axios";
import { apiUrl } from "../../config.json";

const ApiUrl = apiUrl + "colors";

/**
 * Lấy danh sách hàng hóa
 * @returns Danh sách hàng hóa
 */
const getColors = async () => {
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
    getColors,
};
