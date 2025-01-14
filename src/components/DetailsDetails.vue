<script setup>
const props = defineProps({
  productInfo: {
    type: Object,
    required: true,
  },
  selectedVariant: {
    type: Object,
    required: true,
  },
})

const isVariantSoldOut = (sizes) => {
  for (const key in sizes) {
    if (sizes[key] > 0) {
      return false
    }
  }
  return true
}

// déclarer événement -------
const emit = defineEmits({
  changeSelectedVariant: null,
  addProductToCart: (product) => {
    if (product && typeof product === 'object') {
      return true
    } else {
      console.warn('Payload is required and must be an object')
      return false
    }
  },
})
// fonction ajouter au panier
const handleAddToCart = () => {
  if (!props.selectedVariant.selectedSize) {
    alert('Veuillez sélectionner une taille !')
  } else {
    emit('addProductToCart', props.selectedVariant)
  }
}
// fonction envoi event si stock > 0
const handleEmitNewVariant = (variant) => {
  const isSoldOut = isVariantSoldOut(variant.sizes)
  if (!isSoldOut) {
    emit('changeSelectedVariant', variant)
  } else {
    alert("L'article est épuisé !")
  }
}
// fonction ajout clé selectSize avec valeur = size
const handleSelectSize = (size, quantity) => {
  const newObj = { ...props.selectedVariant }
  if (quantity !== 0) {
    newObj.selectedSize = size
    emit('changeSelectedVariant', newObj)
  }
}
</script>

<template>
  <div>
    <h2>{{ productInfo.brand }}</h2>

    <h1>{{ productInfo.name }}</h1>

    <p>{{ productInfo.price }} € <span>TVA incluse</span></p>

    <div class="rate">
      <font-awesome-icon :icon="['fas', 'star']" size="lg" />
      <font-awesome-icon :icon="['fas', 'star']" size="lg" />
      <font-awesome-icon :icon="['fas', 'star']" size="lg" />
      <font-awesome-icon :icon="['fas', 'star']" size="lg" />
      <font-awesome-icon :icon="['fas', 'star-half-alt']" size="lg" />

      <span>{{ productInfo.rate }}</span>
    </div>
    <!--  -->
    <p>
      Couleur : <span class="selectedColor">{{ selectedVariant.color }}</span>
    </p>
    <div class="img-bloc">
      <img
        v-for="variant in productInfo.variants"
        :key="variant.id"
        :src="variant.image.url"
        :alt="variant.image.alt"
        :class="{
          selectedImg: selectedVariant.id === variant.id,
          outOfStock: isVariantSoldOut(variant.sizes),
        }"
        @click="handleEmitNewVariant(variant)"
      />
    </div>

    <p class="advise">
      Nous vous recommandons de choisir une taille au-dessus de celle habituelle.
    </p>

    <div class="sizes-bloc">
      <div
        v-for="(quantity, size) in selectedVariant.sizes"
        :key="size"
        :class="{ outOfStock: quantity === 0, selectedSize: size === selectedVariant.selectedSize }"
        @click="handleSelectSize(size, quantity)"
      >
        {{ size }}
      </div>
    </div>

    <div class="cart-bloc">
      <button @click="handleAddToCart">Ajouter au panier</button>
      <div>
        <font-awesome-icon :icon="['far', 'heart']" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* La balise 'p' se trouvant immediatement après la balise 'h1' */
h1 + p {
  font-size: 22px;
  margin-bottom: 25px;
}

h1 + p span {
  color: #66676e;
  font-size: 14px;
  font-weight: lighter;
}

/* -----rate Bloc -------- */
.rate {
  margin-bottom: 40px;
}
.rate svg {
  margin-right: 3px;
}

/* ------Advise bloc------ */
.advise {
  background-color: var(--light-grey);
  padding: 20px;
  font-size: 14px;
  line-height: 20px;
  font-weight: lighter;
  margin-bottom: 10px;
}

/* -------Cart bloc-------- */
.cart-bloc {
  display: flex;
  gap: 10px;
}
.cart-bloc button {
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  background-color: var(--main-black);
  color: white;
  flex: 1;
  border: none;
  cursor: pointer;
}
.cart-bloc button:hover {
  opacity: 0.7;
}
.cart-bloc div {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--main-black);
  color: var(--main-black);
}
.cart-bloc div:hover {
  border-width: 3px;
}
.cart-bloc svg {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
/* ----couleur reactive---- */
.selectedColor {
  font-weight: bold;
}
.sizes-bloc {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.sizes-bloc > div {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 40px;
  height: 40px;
  padding-top: 2px;
  cursor: pointer;
}
:is(.sizes-bloc, .img-bloc) .outOfStock {
  /* 👈 Classe définie ici */
  opacity: 0.3;
  cursor: auto;
}
.img-bloc {
  padding: 10px 0px;
  display: flex;
  gap: 10px;
}
img {
  height: 70px;
  width: 60px;
  object-fit: cover;
}
.selectedImg {
  border: 2px solid black;
}
.sizes-bloc .selectedSize {
  border-width: 2px;
}
</style>
