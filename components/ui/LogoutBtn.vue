<script setup lang="ts">
const { signOut } = useAuth()
</script>
<template>
  <div class="my-2">
    <UButton size="lg" color="red" variant="outline" @click="signOut()">
      <Icon name="material-symbols:logout-rounded" />Se déconnecter</UButton
    >
  </div>
</template>
