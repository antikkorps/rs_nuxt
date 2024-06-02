<script setup lang="ts">
import { bookmarkServices } from '@/services';

const props = defineProps({
  userId: {
    type: String as PropType<String | null>,
    default: null,
    required: false,
  },

  postId: {
    type: Number,
    required: true,
  },

  isBookmarked: {
    type: Boolean,
    default: false,
  },
});
const toast = useToast();

const liked = ref(props.isBookmarked)

const toggleBookmark = async () => {
  if (props.userId && props.userId !== undefined) {
    liked.value = !liked.value;
    await bookmarkServices.attachDetachBookmark(props.postId)
  } else {
    toast.add({ title: "Vous devez être connecté !", icon: "i-heroicons-information-circle", color: "red"});
    return;
  }
}

</script>

<template>
  <div class="my-2">
    <Transition name="fade" mode="out-in">
      <Icon
        v-if="liked"
        name="ic:baseline-bookmark"
        class="w-6 h-6 dark:text-white text-gray-800"
        @click="toggleBookmark"
      />
      <Icon
        v-else
        name="ic:baseline-bookmark-border"
        class="w-6 h-6 dark:text-white text-gray-800"
        @click="toggleBookmark"
      />
    </Transition>
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
