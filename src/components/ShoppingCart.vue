<template>
  <div class="prd-container">
    <div>
      <h2>List Product</h2>
    </div>
    <div class="prd" v-for="item in cart" :key="item.id">
      <div class="prd-child">
        <img
          src="https://i5.walmartimages.com/asr/e61beef9-f050-4dac-87b7-76f2d6708423_1.3e2b998380c08dd5e707e3c5c253f29d.jpeg"
          alt=""
          width="80px"
          height="80px"
        />
        <div>
          <b>{{ item.name }}</b>
          <br /><br />
          <input
            v-model.number="item.quantity"
            @change="changeQuantity(item)"
            type="number"
            min="1"
            :max="item.maxQuantity"
          /><br /><br />
          <b>Quantity: {{ item.quantity }}</b>
        </div>
      </div>
      <div>
        <p>Price: ${{ item.totalPrice }}</p>
        <button @click="update(item)">Update</button>
        <br /><br />
        <b @click="del(item.id)" class="rmv">Remove</b>
      </div>
    </div>

    <hr />
    <div class="sub">
      <div style="display: flex; justify-content: space-between">
        <b>Subtotal</b>
        <b>${{ subTotal() }}</b>
      </div>
      <div class="success">
        <p>Update product successfully</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => store.state.product.products);
const cart = computed(() => store.state.shoppingCart.cart);

onMounted(() => {
  store.dispatch("getProduct");
  store.dispatch("getAllCart");
});

const changeQuantity = (item) => {
  // Find the corresponding product from the products list
  const product = products.value.find((p) => p.name === item.name);

  if (product) {
    if (item.quantity > product.quantity) {
      item.quantity = product.quantity;
      alert("Not enough product");
    } else if (item.quantity < 1) {
      item.quantity = 1;
    }
  }
};

const update = (item) => {
  const product = products.value.find((p) => p.name === item.name);
  const index = cart.value.findIndex((c) => c.name === item.name);
  console.log(cart.value[index].quantity);

  const newProduct = {
    ...product,
    quantity: product.quantity - item.quantity,
  };
  store.dispatch("updateProduct", newProduct);
  store.dispatch("updateCart", item);
};

const subTotal = () => {
  let total = 0;
  for (let i = 0; i < cart.value.length; i++) {
    total += cart.value[i].totalPrice;
  }
  return total;
};

const del = (id) => {
  const confirm = window.confirm("Are you sure you want to delete this item?");
  if (!confirm) {
    return;
  }
  store.dispatch("delItem", id);
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
.prd-child {
  display: flex;
  align-items: center;
  gap: 20px;
}
.success {
  margin-top: 10px;
  background-color: rgb(178, 224, 109);
  padding: 5px;
  border-radius: 4px;
}
.sub {
  padding: 20px;
}
.rmv {
  color: plum;
  cursor: pointer;
}
.rmv:hover {
  color: darkred;
}
.prd {
  padding: 7px;
  border: 1px solid rgb(206, 204, 204);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
}
input {
  height: 30px;
  width: 100px;
  border-radius: 4px;
}
button {
  background-color: rgb(255, 255, 255);
  border: 1px solid;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: rgb(147, 132, 220);
}
</style>
