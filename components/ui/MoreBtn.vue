<script setup lang="ts">
const isOpen = ref(false)
</script>
<template>
  <div class="flex items-center space-x-2">
    <button
      class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-600"
      @click="isOpen = true"
    >
      <Icon name="ic:baseline-more-vert" class="w-6 h-6 dark:text-white text-gray-800" />
    </button>

    <USlideover v-model="isOpen" side="bottom">
      <UCard
        class="flex flex-col flex-1 border-gray-100 dark:border-gray-800"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          background: 'bg-white dark:bg-neutral-950',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between px-3">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white my-4"
            >
              Actions rapides
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="flex flex-col justify-center p-2 mx-auto">
          <button
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 rounded-lg"
          >
            <Icon name="ic:outline-share" class="w-6 h-6 dark:text-white text-gray-800" />
            <span>Partager</span>
          </button>
          <button
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 rounded-lg"
          >
            <Icon
              name="ic:outline-bookmark"
              class="w-6 h-6 dark:text-white text-gray-800"
            />
            <span>Sauvegarder</span>
          </button>
          <button
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-neutral-600 rounded-lg"
          >
            <Icon
              name="ic:outline-report"
              class="w-6 h-6 dark:text-white text-gray-800"
            />
            <span>Signaler</span>
          </button>
        </div>
      </UCard>
    </USlideover>
  </div>
</template>
<style></style>
