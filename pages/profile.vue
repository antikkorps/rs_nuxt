<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/auth/login" } })
</script>
<template>
  <div class="w-4/5">
    <UiProfileCard />
    <UiGlobalUserGallery />
  </div>
</template>
