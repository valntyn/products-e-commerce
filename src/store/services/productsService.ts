import axios from 'axios';

const BASE_URL = 'https://6458f21f4eb3f674df820529.mockapi.io';

const getProducts = async () => {
  const products = await axios.get(`${BASE_URL}/api/products`);

  return products.data;
};

const productsService = {
  getProducts,
};

export default productsService;
