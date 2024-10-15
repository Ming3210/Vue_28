import getProduct, { updateProduct } from "@/components/api/productAPI";

const product = {
  state: {
    products: [],
  },
  mutations: {
    getProduct: async (state) => {
      state.products = await getProduct();
    },
    updateProduct: (state, payload) => {
      const index = state.products.findIndex((prd) => prd.id === payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...payload };
      }
    },
  },
  actions: {
    getProduct: ({ commit }) => {
      commit("getProduct");
    },
    updateProduct: async ({ commit }, payload) => {
      const updatedProduct = await updateProduct(payload);
      commit("updateProduct", updatedProduct);
    },
  },
  getters: {},
};

export default product;
