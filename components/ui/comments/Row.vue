<template>
  <div class="media flex pb-4">

    <a class="mr-4" href="#">
      <img
        class="rounded-full max-w-none w-12 h-12"
        :src="comment.user.avatar || 'https://randomuser.me/api/port'"
      />
    </a>
    <div class="media-body">
      <UiCommentsRowHeader :comment="comment" />
      <p class="mt-3">
        {{ comment.description }}
      </p>
      <UiCommentsRowFooter :comment="comment" :userId="userId" :post="post" :type="type" />
    </div>
  </div>

  <!-- <div class="media flex pb-4">
    <a class="mr-4" href="#">
      <img
        class="rounded-full max-w-none w-12 h-12"
        src="https://randomuser.me/api/portraits/men/83.jpg"
      />
    </a>
    <div class="media-body">
      <div>
        <a class="inline-block text-base font-bold mr-2" href="#"
          >Ronald Richards</a
        >
        <span class="text-neutral-500 dark:text-neutral-300"
          >25 minutes ago</span
        >
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
        😀😀😀
      </p>
      <div class="flex items-center">
        <div class="inline-flex items-center py-2 mr-3">
          <UiLikeBtn />

          <span class="text-base font-bold">2</span>
        </div>
        <UiEmojiPicker />
        <button
          class="py-2 px-4 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg"
        >
          Répondre
        </button>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import type { ExtendedPost } from '~/types/posts';
import type { CommentFormatedWithCommentLikes } from '~/types/types';


const props = defineProps({
  comment: {
    type: Object as PropType<CommentFormatedWithCommentLikes>,
    required: true,
  },
  userId: {
    type: String as PropType<String | null>,
    default: null,
    required: false,
  },
  post: {
    type: Object as PropType<ExtendedPost>,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "index",
  },
});
</script>
