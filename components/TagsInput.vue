<script setup>
import { ref } from "vue"

const tags = ref([])
const inputValue = ref("")
const existingTags = ["Nuxt", "Vue", "JavaScript", "Tailwind", "Nuxt UI"]
const filteredSuggestions = ref([])

const addTag = () => {
  if (inputValue.value && !tags.value.includes(inputValue.value)) {
    tags.value.push(inputValue.value)
  }
  inputValue.value = ""
  filteredSuggestions.value = []
}

const addSuggestion = (suggestion) => {
  if (!tags.value.includes(suggestion)) {
    tags.value.push(suggestion)
  }
  inputValue.value = ""
  filteredSuggestions.value = []
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
}

const filterSuggestions = () => {
  filteredSuggestions.value = existingTags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.value.toLowerCase()) &&
      !tags.value.includes(tag)
  )
}
</script>

<template>
  <div class="w-full">
    <div class="flex flex-wrap gap-2">
      <UBadge v-for="(tag, index) in tags" :key="index">
        {{ tag }}
        <button @click="removeTag(index)" class="ml-2">×</button>
      </UBadge>
    </div>
    <input
      v-model="inputValue"
      @input="filterSuggestions"
      @keydown.enter.prevent="addTag"
      placeholder="Add a tag"
      class="w-full border border-gray-300 rounded-md p-2 mt-2"
    />
    <ul
      v-if="filteredSuggestions.length > 0"
      class="border border-gray-300 mt-1 rounded-md shadow-md"
    >
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @click="addSuggestion(suggestion)"
        class="p-2 hover:bg-blue-100 cursor-pointer"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>
