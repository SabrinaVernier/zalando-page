<script setup>
// Import des composants
import Header from './components/HeaderHeader.vue'
import Footer from './components/FooterFooter.vue'
import Details from './components/DetailsDetails.vue'

// Import du fichier JSON avec infos produits
import data from './assets/data.json'

import { reactive, ref } from 'vue'

// Création des objets réactifs
const productInfo = reactive(data)
const selectedVariant = ref(data.variants[0])
const cart = reactive([])

const changeVariant = (variant) => {
  selectedVariant.value = variant
}

const addToCart = (product) => {
  cart.push(product)
}
</script>

<template>
  <div>
    <!-- Appel du composant Header -->
    <Header :cart="cart" />
    <main>
      <!-- Wrapper -->
      <div class="container">
        <!-- Première colonne -->
        <div>
          <img
            :src="selectedVariant.image.url"
            :alt="selectedVariant.image.alt"
            class="big-picture"
          />
        </div>

        <!-- Deuxième colonne -->
        <Details
          :productInfo="productInfo"
          :selectedVariant="selectedVariant"
          :cart="cart"
          v-on:changeSelectedVariant="changeVariant"
          @addProductToCart="addToCart"
        />
      </div>
    </main>
    <!-- Appel du composant Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: calc(
    100vh - var(--header-top-height) - var(--header-bottom-height) - var(--footer-height)
  );
}

.container > div {
  width: 50%;
  /* Bordure temporaire pour visualiser le bloc */
  border: 1px solid green;
}

.container > div:last-child {
  padding: 25px 0 25px 100px;
  box-sizing: border-box;
}

/* ---img dynamique */
.container > div:first-child {
  padding: 25px;
}
.big-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
