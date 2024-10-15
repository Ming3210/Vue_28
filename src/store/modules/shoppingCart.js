import getAllCart, {
  addToCart,
  delItem,
  updateCart,
} from "@/components/api/cartAPI";
const cart = {
  state: {
    cart: [],
  },
  mutations: {
    getAllCart: async (state) => {
      state.cart = await getAllCart();
    },
    add: async (state, payload) => {
      console.log(payload, 444);
      const res = await addToCart(payload);

      state.cart.push(res);
    },
    delItem: (state, payload) => {
      console.log(payload);
      state.cart = state.cart.filter((item) => item.id !== payload);
    },
    updateCart: (state, payload) => {
      console.log(payload);
      // state.cart = await payload;
    },
  },
  actions: {
    getAllCart: ({ commit }) => {
      commit("getAllCart");
    },
    addToCart: async ({ commit }, payload) => {
      await commit("add", payload);
    },
    delItem: async ({ commit }, payload) => {
      commit("delItem", payload);
    },
    updateCart: async ({ commit }, payload) => {
      const cart = await updateCart(payload);
      await commit("updateCart", cart);
    },
  },
  getters: {},
};

export default cart;
