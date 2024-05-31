<script setup lang="ts">

const props = defineProps({
    likedItemId: {
        type: Number
    },
    likeType: {
        type: String,
        default: 'POST'
    }
})


const liked = ref(false)

const toggleLike = async () => {
  liked.value = !liked.value

  const response = await fetch('/api/v1/like', {
    method: 'POST',
    body: JSON.stringify({
      likedItemId: props.likedItemId,
      likeType: props.likeType,
    }),
  })
  const data = await response.json()
}

const checkIfILiked = async () => {
  const response = await fetch(`/api/v1/like?likedItemId=${props.likedItemId}`, {
    method: 'GET'
  })
  const data = await response.json()
  if(data === true) {
    liked.value = true
  }

}

onMounted(() => {
  checkIfILiked()
})

</script>
<template>
  <div>
    <p @click="checkIfILiked">TEST</p>
    <div class="my-2 mr-2">
      <Transition name="fade" mode="out-in">
        <Icon
          v-if="liked"
          name="material-symbols:favorite-rounded"
          class="w-6 h-6 text-red-500"
          @click="toggleLike"
        />
        <Icon
          v-else
          name="material-symbols:favorite-outline-rounded"
          class="w-6 h-6 dark:text-white text-gray-800"
          @click="toggleLike"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
