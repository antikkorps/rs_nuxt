<script setup lang="ts">
const router = useRouter()

const handleClick = () => {
  router.push("/auth/login")
}
</script>
<template>
  <div class="my-2">
    <UButton @click="handleClick">Se connecter</UButton>
  </div>
</template>
