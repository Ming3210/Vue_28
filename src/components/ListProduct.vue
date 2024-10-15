<template>
  <div class="prd-container">
    <div>
      <h2>List Product</h2>
    </div>

    <div class="prd" v-for="prd in products" :key="prd.id">
      <img :src="prd.image" alt="" class="prd-image" />

      <div class="prd-details">
        <b class="prd-name">{{ prd.name }}</b>
        <p class="des">{{ prd.description }}</p>
        <b>Total: {{ prd.quantity }}</b>
      </div>

      <div class="prd-actions">
        <!-- Input field for selecting quantity -->
        <input
          v-if="prd.quantity > 0"
          type="number"
          min="1"
          :max="prd.quantity"
          @change="change"
          v-model.number="prd.selectedQuantity"
          @input="validateQuantity(prd)"
          placeholder="Qty"
        />

        <input v-else disabled type="number" placeholder="Out of Stock" />

        <p class="price">Price: {{ prd.price }} $</p>

        <!-- Add to cart button -->
        <button @click="addToCart(prd)" class="button" v-if="prd.quantity > 0">
          Add to cart
        </button>

        <!-- Disabled button for out-of-stock items -->
        <button disabled class="disable" v-else>Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("getProduct");
  store.dispatch("getAllCart");
});

const inputV = ref(0);

// const change = (event) => {
//   inputV.value = parseInt(event.target.value);
// };

const products = computed(() => store.state.product.products);
const cart = computed(() => store.state.shoppingCart.cart);

const addToCart = (prd) => {
  // Create a new product object for the cart
  const newPrd = {
    name: prd.name,
    totalPrice: prd.price * prd.selectedQuantity,
    quantity: prd.selectedQuantity,
    image: prd.image,
    description: prd.description,
  };

  // Update the quantity of the product in stock
  prd.quantity -= prd.selectedQuantity;

  const updatedPrd = {
    id: prd.id,
    name: prd.name,
    quantity: prd.quantity,
    image: prd.image,
    description: prd.description,
    price: prd.price,
  };

  const prdInCart = cart.value.find((cart) => cart.name == newPrd.name);
  if (prdInCart) {
    prdInCart.totalPrice += newPrd.totalPrice;
    prdInCart.quantity += newPrd.quantity;
    store.dispatch("updateCart", prdInCart);
  } else {
    store.dispatch("addToCart", newPrd);
  }

  store.dispatch("updateProduct", updatedPrd);

  prd.selectedQuantity = 0;
};

const validateQuantity = (prd) => {
  if (prd.selectedQuantity > prd.quantity) {
    prd.selectedQuantity = prd.quantity;
  } else if (prd.selectedQuantity < 1) {
    prd.selectedQuantity = 1;
  }
};
</script>

<style scoped>
.prd-container {
  width: 40%;
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.prd {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 1px solid #ececec;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #ffffff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.prd:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.disable {
  background-color: rgb(66, 240, 124);
  cursor: not-allowed;
}

.prd-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.prd-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.prd-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.des {
  width: 100%;
  font-size: 14px;
  color: #555;
}

.prd-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

input {
  width: 80px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.price {
  margin: 0;
  font-weight: bold;
  color: #333;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #0056b3;
  cursor: pointer;
}

@media (max-width: 768px) {
  .prd-container {
    width: 50%;
  }

  .prd {
    flex-direction: column;
    align-items: flex-start;
  }

  .prd-actions {
    align-items: stretch;
    width: 100%;
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }
}
</style>
