<script setup lang="ts">
const showEmojiPicker = ref(false)

function select(emoji: string) {
  // do something with your emoji
  console.log(emoji)
}
</script>
<template>
  <div class="ml-2">
    <NuxtEmoji @on-select="select" theme="dark">
      <template v-slot:button>
        <button class="cursor-pointer">
          <UiIcon name="ph:smiley" />
        </button>
      </template>
    </NuxtEmoji>
  </div>
</template>
