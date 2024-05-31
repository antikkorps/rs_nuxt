<script setup lang="ts">

const props = defineProps({
  likedItemId: {
    type: Number,
  },
  likeType: {
    type: String,
    default: "POST",
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String as PropType<String | null>,
    default: null,
    required: false,
  }
});

const toast = useToast();

const liked = ref(props.isLiked);
const toggleLike = async () => {
  if (props.userId) {
  liked.value = !liked.value;
    const response = await fetch("/api/v1/like", {
      method: "POST",
      body: JSON.stringify({
        likedItemId: props.likedItemId,
        likeType: props.likeType,
      }),
    });
    const data = await response.json();
  } else {
    toast.add({ title: "Vous devez être connecté !", icon: "i-heroicons-information-circle", color: "red"});
    return;
  }
};
</script>
<template>
  <div>
    <div class="my-2 mr-2 cursor-pointer">
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
