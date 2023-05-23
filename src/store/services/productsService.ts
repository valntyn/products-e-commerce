import axios from 'axios';

const BASE_URL = 'https://6458f21f4eb3f674df820529.mockapi.io';

const getProducts = async () => {
  const products = await axios.get(`${BASE_URL}/api/products`);

  return products.data;
};

const getSingleProduct = async (productId: string) => {
  const product = await axios.get(`${BASE_URL}/api/products/${productId}`);

  return product.data;
};

const productsService = {
  getSingleProduct,
  getProducts,
};

export default productsService;
