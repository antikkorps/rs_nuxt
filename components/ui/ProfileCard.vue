<script setup lang="ts">
const { session, user } = useAuth()
</script>
<template>
  <div class="h-screen relative top-20 items-center w-full">
    <UCard class="dark:bg-neutral-900 bg-neutral-100">
      <template #header>
        <div
          class="flex justify-center w-full h-40 sm:h-52 bg-cover bg-center relative rounded-t-lg overflow-hidden"
          style="
            background-image: url('https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80');
            background-size: cover;
            background-position: center;
          "
        ></div>
      </template>

      <div class="flex flex-col justify-center text-center mx-auto">
        <NuxtImg
          :src="session?.user?.avatar"
          class="rounded-full max-w-none w-14 h-14 sm:w-16 sm:h-16 mt-10 mx-auto"
        />
        <h2 class="text-2xl font-bold text-gray-950 dark:text-white mt-6">John Doe</h2>
        <p class="text-base font-medium text-gray-500 mt-1">HR Manager</p>
      </div>

      <template #footer>
        <div class="flex items-center justify-center gap-3 mt-6 mb-8">
          <a
            href="#"
            class="inline-flex items-center justify-center h-10 w-10 rounded-full text-gray-900 dark:bg-neutral-200 bg-gray-900/5 hover:text-white hover:bg-gray-900 hover:dark:bg-neutral-400 transition-all duration-500"
            ><UiIcon name="material-symbols:other-houses" class="mx-auto"
          /></a>
          <a
            href="#"
            class="inline-flex items-center justify-center h-10 w-10 rounded-full text-gray-900 dark:bg-neutral-200 bg-gray-900/5 hover:text-white hover:bg-gray-900 hover:dark:bg-neutral-400 transition-all duration-500"
            ><UiIcon name="material-symbols:other-houses" class="mx-auto"
          /></a>
          <a
            href="#"
            class="inline-flex items-center justify-center h-10 w-10 rounded-full text-gray-900 dark:bg-neutral-200 bg-gray-900/5 hover:text-white hover:bg-gray-900 hover:dark:bg-neutral-400 transition-all duration-500"
            ><UiIcon name="material-symbols:other-houses" class="mx-auto"
          /></a>
          <a
            href="#"
            class="inline-flex items-center justify-center h-10 w-10 rounded-full text-gray-900 dark:bg-neutral-200 bg-gray-900/5 hover:text-white hover:bg-gray-900 hover:dark:bg-neutral-400 transition-all duration-500"
            ><UiIcon name="material-symbols:other-houses" class="mx-auto"
          /></a>
        </div>
      </template>
    </UCard>
  </div>
</template>
