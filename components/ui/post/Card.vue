<template>
  <article
  :class="cn(classes, 'bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6')"
  >
    <slot name="content"/>
    <slot name="comment" />
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  classes: {
    type: String,
    default: "",
    required: false,
  },
});
</script>
