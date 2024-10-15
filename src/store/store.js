import { createStore } from "vuex";

import product from "./modules/product";
import shoppingCart from "./modules/shoppingCart";

const store = createStore({
  modules: {
    product,
    shoppingCart: shoppingCart,
  },
});

export default store;
