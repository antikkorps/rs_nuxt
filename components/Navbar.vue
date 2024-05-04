<script setup lang="ts">
const links = [
  { name: "Accueil", href: "/", icon: "material-symbols:other-houses" },
  { name: "A Propos", href: "/about", icon: "mdi:account-tie-voice-outline" },
  { name: "Messages", href: "/Messages", icon: "ic:baseline-message" },
  { name: "Dashboard", href: "/dashboard", icon: "ic:round-dashboard-customize" },
]
</script>
<template>
  <aside
    class="hidden sm:flex flex-col w-1/6 dark:bg-neutral-800 bg-neutral-100 h-screen justify-between px-4 fixed top-0 left-0 z-50"
  >
    <div class="flex flex-col pt-4 justify-center gap-y-6">
      <div class="text-center">Le logo</div>
      <div><UiColorMode /></div>

      <ul class="flex flex-col justify-around">
        <li v-for="link in links" :key="link.name" class="flex items-center text-lg my-4">
          <nuxt-link :to="link.href">
            <UiIcon :name="link.icon" />
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <div class="flex flex-col justify-center items-center my-10">
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-row justify-center items-center gap-x-3">
          <UiSignupBtn />
          <UiLoginBtn />
        </div>
        <UiLogoutBtn />
      </div>
      <UiAvatar :size="`xl`" />
    </div>
  </aside>
</template>
<style scoped></style>
