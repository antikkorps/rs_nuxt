<script setup lang="ts">
const { session } = useAuth()
const links = [
  {
    name: "Accueil",
    href: "/",
    icon: "material-symbols:home-and-garden-outline-rounded",
  },
  { name: "profile", href: "/profile", icon: "material-symbols:account-circle-full" },
  {
    name: "Ajouter un post",
    href: "/posts/new",
    icon: "material-symbols:add-box-outline",
  },
  { name: "Posts", href: "/posts", icon: "ic:outline-post-add" },
  {
    name: "Messages",
    href: "/Messages",
    icon: "material-symbols:android-messages-outline",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "material-symbols:dashboard-customize-outline",
  },
]
</script>
<template>
  <aside
    class="hidden sm:flex flex-col w-1/6 dark:bg-neutral-800 bg-neutral-100 h-screen justify-between px-4 sticky top-0 left-0 z-50"
  >
    <div class="flex flex-col pt-4 justify-center gap-y-3">
      <div class="text-center text-2xl font-extrabold">Ink4U</div>
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
        <div v-if="session">
          <UiAvatar
            class="flex justify-center mx-auto"
            :size="`xl`"
            :src="session.user?.avatar"
          />
          <UiLogoutBtn />
        </div>
        <div v-else class="flex flex-row justify-center items-center gap-x-3">
          <UiSignupBtn />
          <UiLoginBtn />
        </div>
      </div>
    </div>
  </aside>
</template>
<style scoped></style>
