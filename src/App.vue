<template>
  <div class="container">
    <ListProduct />
    <ShoppingCart />
  </div>
</template>

<script setup>
import ListProduct from "./components/ListProduct.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
</style>
