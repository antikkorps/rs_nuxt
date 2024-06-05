<script setup lang="ts">
const { session } = useAuth()
</script>
<template>
  <div>
    <div
      class="bg-white dark:bg-neutral-900 w-full sm:w-4/5 flex flex-col justify-center"
    >
      <img
        :src="session?.user?.avatar"
        class="rounded-full max-w-none w-14 h-14 sm:w-24 sm:h-24 mt-10"
      />
    </div>
  </div>
</template>
