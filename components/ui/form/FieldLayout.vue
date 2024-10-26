<template>
  <div>
    <label
      class="capitalize block text-sm font-medium leading-6"
      >{{ label }} {{ required ? "*" : "" }}</label>
    <div class="mt-2 space-y-2">
      <div>
        <slot name="input" />
        <p class="text-sm text-gray-500">{{ description }}</p>
      </div>
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
  description: {
    type: String,
    required: false,
    default: undefined,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
