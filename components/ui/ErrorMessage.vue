<script setup lang="ts">
const props = defineProps({
    message: {
        type: String,
        default: "",
    },
})
</script>

<template>
    <div className="bg-red-50 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-700">
      <Icon
          name="tabler:alert-circle"
          class="w-6 h-6 text-red-500"
        />
      <p>{{ props.message }}</p>
    </div>
</template>