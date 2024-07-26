<template> show du salon pour l'id {{ salonId }}</template>

<script setup lang="ts">

const route = useRoute()
const salonId = parseInt(route.params.id)

</script>