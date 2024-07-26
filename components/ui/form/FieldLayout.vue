<template>
  <div>
    <label
      class="capitalize block text-sm font-medium leading-6"
      >{{ label }}</label>
    <div class="mt-2 space-y-2">
      <slot name="input" />

      <small :v-if="error" class="text-red-700">{{ error }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  inputName: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true
  },
  error: {
    type: String,
    required: false,
    default: undefined,
  },
});
</script>
