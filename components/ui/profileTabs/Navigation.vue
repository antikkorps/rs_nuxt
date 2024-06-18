<script setup lang="ts">
import GlobalUserGallery from "./GlobalUserGallery.vue"

const selectedTab = ref<string>("Galerie")

const items = [
  {
    label: "Galerie",
    icon: "ri:gallery-view-2",
    content: "Galerie de l'utilisateur",
  },
  {
    label: "Bookmarks",
    icon: "solar:bookmark-outline",
    content: "This is the user's bookmarks view",
  },
  {
    label: "Favorites",
    icon: "solar:gallery-favourite-outline",
    content: "This is the favorite view",
  },
]

function updateSelectedTab(tabLabel: string) {
  console.log(tabLabel)
  selectedTab.value = items.label
}
</script>

<template>
  <UTabs :items="items" class="w-full" @update:selectedTab="updateSelectedTab">
    <template #default="{ item }">
      <div class="flex items-center gap-2 relative truncate">
        <UiIcon :name="item.icon" class="w-8 h-8 flex-shrink-0" />

        <!-- <span class="truncate">{{ item.content }}</span> -->
      </div>
    </template>
  </UTabs>
  <GlobalUserGallery v-if="selectedTab === 'Galerie'" />
</template>
