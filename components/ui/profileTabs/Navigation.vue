<script setup lang="ts">
import GlobalUserGallery from "./GlobalUserGallery.vue"
import GlobalUserBookmarked from "./GlobalUserBookmarked.vue"
import GlobalUserLikes from "./GlobalUserLikes.vue"

const selectedTab = ref<number>(0)

const items = [
  {
    label: "Galerie",
    icon: "solar:gallery-wide-outline",
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

function updateSelectedTab(tabLabel: number) {
  selectedTab.value = tabLabel
}
</script>

<template>
  <UTabs :items="items" class="w-full" @change="updateSelectedTab">
    <template #default="{ item, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UiIcon :name="item.icon" class="w-8 h-8 flex-shrink-0" />

        <!-- <span class="truncate">{{ item.content }}</span> -->
      </div>
    </template>
  </UTabs>
  <GlobalUserGallery v-if="selectedTab === 0" />
  <GlobalUserBookmarked v-else-if="selectedTab === 1" />
  <GlobalUserLikes v-else-if="selectedTab === 2" />
</template>
