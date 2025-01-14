<script setup></script>

<!-- Aucun JavaScript n'est nécessaire donc la balise '<script>' peut être retirée -->

<template>
  <footer>
    <h1>Made by <a href="https://www.lereacteur.io/" target="_blank">Le Reacteur</a></h1>
  </footer>
</template>

<style scoped>
/* Cette partie sera complétée dans le chapitre suivant */
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--footer-height);
  /* Bordure temporaire pour visualiser le footer */
  /* border: 1px solid purple; */
}

a {
  color: var(--main-orange);
  font-weight: bold;
}
</style>
