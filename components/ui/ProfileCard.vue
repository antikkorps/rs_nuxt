<script setup lang="ts">
const { session, user } = useAuth()

onMounted(() => {
  console.log("user", user)
})
</script>
<template>
  <div class="h-screen relative top-10 sm:top-20 items-center w-full">
    <UCard class="dark:bg-neutral-900 bg-neutral-100">
      <template #header>
        <div
          class="flex flex-grow justify-center w-full h-56 sm:h-44 bg-center rounded-t-lg overflow-hidden"
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
          class="rounded-full w-14 h-14 sm:w-20 sm:h-20 -mt-12 sm:-mt-16 outline outline-4 outline-offset-4 outline-neutral-300 mx-auto"
        />
        <h2 class="text-2xl font-bold text-gray-950 dark:text-white mt-6">
          {{ session?.user?.firstname }} {{ session?.user?.lastname }}
        </h2>
        <p class="text-base font-medium text-gray-500 mt-1">{{ user?.email }}</p>
      </div>

      <template #footer>
        <ul class="flex justify-center my-5 space-x-5">
          <li>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
            >
              <UiIcon
                name="material-symbols:home-and-garden-outline-rounded"
                class="h-16 w-16 text-neutral-500 hover:text-neutral-700 dark:hover:text-white dark:text-neutral-400"
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
            >
              <UiIcon
                name="system-uicons:write"
                class="h-12 w-12 text-neutral-500 hover:text-neutral-700 dark:hover:text-white dark:text-neutral-400"
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
            >
              <UiIcon
                name="material-symbols:android-messages-outline"
                class="h-12 w-12 text-neutral-500 hover:text-neutral-700 dark:hover:text-white dark:text-neutral-400"
              />
            </a>
          </li>
          <li>
            <a href="#" class="">
              <UiIcon
                name="material-symbols:release-alert-outline-rounded"
                class="h-12 w-12 text-neutral-500 hover:text-neutral-700 dark:hover:text-white dark:text-neutral-400"
              />
            </a>
          </li>
        </ul>
      </template>
    </UCard>
  </div>
</template>
