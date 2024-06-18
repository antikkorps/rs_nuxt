<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/auth/login" } })
</script>
<template>
  <div class="w-full">
    <UiProfileCard />
    <UiProfileTabsNavigation />
  </div>
</template>
