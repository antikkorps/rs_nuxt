<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <!-- <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12"></div> -->
    <UCard>
      <slot name="header" />

      <slot name="content" />

      <slot name="footer" />
    </UCard>
  </div>
</template>
