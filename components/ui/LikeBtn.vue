<script setup lang="ts">
import { likeUnlike } from '~/services/likeServices';


const props = defineProps({
  likedItemId: {
    type: Number,
    required: true,
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
  await likeUnlike({likedItemId: props.likedItemId, likeType: props.likeType})
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
