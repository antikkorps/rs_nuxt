<script setup lang="ts">
const { session } = useAuth()
</script>
<template>
  <div>
    <div class="bg-white dark:bg-neutral-900 w-full flex flex-col justify-center">
      <div class="bg-slate-300 sm:w-3/4"></div>
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold text-center mt-10">Profile</h1>
        <h2 class="text-xl text-center mt-2">Welcome back, {{ session?.user?.name }}</h2>
        <p class="text-center mt-2">Here is your profile</p>
      </div>
      <div class="flex justify-center mx-auto">
        <NuxtImg
          :src="session?.user?.avatar"
          class="rounded-full max-w-none w-14 h-14 sm:w-24 sm:h-24 mt-10"
        />
      </div>
    </div>
  </div>
</template>
