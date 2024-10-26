<template> show du salon pour l'id {{ salonId }}</template>

<script setup lang="ts">

const route = useRoute()
const salonId = Array.isArray(route.params.id) 
  ? parseInt(route.params.id[0], 10) 
  : parseInt(route.params.id, 10);

</script>