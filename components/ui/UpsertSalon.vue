<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <UButton @click="navigateTo('/salon/new')">Ajouter un salon</UButton>
</template>
