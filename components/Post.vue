<script setup lang="ts">
import type { PostWithBoolean } from '~/server/api/v1/posts';
import type { CommentFormatedWithCommentLikes } from '~/types/types';

const props = defineProps({
  post: {
    type: Object as PropType<PostWithBoolean>,
    required: true,
  },
})

const { session } = useAuth()
const user = session.value?.user
const comments = ref(props.post.comments) as unknown as Ref<CommentFormatedWithCommentLikes[]>
</script>

<template>
  <!-- Card-->

  <article
    class="my-4 break-inside p-6 rounded-xl bg-white dark:bg-neutral-800 flex flex-col bg-clip-border"
  >
    <div class="flex pb-6 items-center justify-between">
      <div class="flex">
        <a class="inline-block mr-4" href="#">
          <img
            class="rounded-full max-w-none w-14 h-14"
            src="https://randomuser.me/api/portraits/women/9.jpg"
          />
        </a>
        <div class="flex flex-col">
          <div class="flex items-center">
            <a class="inline-block text-lg font-bold mr-2" href="#">Esther Howard</a>
            <span>
              <svg class="fill-blue-500 dark:fill-neutral-50 w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                ></path>
              </svg>
            </span>
          </div>
          <div class="text-neutral-500 dark:text-neutral-300">January 22, 2021</div>
        </div>
      </div>
      <UiMoreBtn />
    </div>
    <div class="py-4">
      <a class="flex" href="#">
        <img
          class="max-w-full rounded-lg"
          src="https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
    </div>
    <h2 class="text-3xl font-extrabold mb-2">{{ post.title }}</h2>

    <p>
      {{ post.description }}
    </p>
    <div class="flex justify-between">
      <div class="py-2 flex flex-row items-center">
        <div class="inline-flex items-center" href="#">
          <UiLikeBtn :likedItemId="post.id" likeType='POST' :userId="user?.id" :isLiked="post.isLiked" />

          <span class="text-lg font-bold">68</span>
        </div>
        <UiEmojiPicker />
      </div>
      <div class="flex items-center">
        <UiShareBtn />
        <UiBookmarkBtn :userId="user?.id" :postId="post.id" :isBookmarked="post.isBookmarked" />
      </div>
    </div>

    <div class="relative">
      <input
        class="pt-2 pb-2 pl-3 w-full h-11 bg-neutral-100 dark:bg-neutral-600 rounded-lg placeholder:text-neutral-600 dark:placeholder:text-neutral-300 font-medium pr-20"
        type="text"
        placeholder="Write a comment"
      />
      <span class="flex absolute right-3 top-2/4 -mt-3 items-center">
        <svg
          class="fill-blue-500 dark:fill-neutral-50"
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
        </svg>
      </span>
    </div>
    <!-- Comments content -->
    <div class="pt-6">
      <UiCommentsRow v-for="(comment, index) in comments" :key="index" :comment="comment" :userId="user?.id" />
      <!-- More comments -->
      <div class="w-full">
        <a
          href="#"
          class="py-3 px-4 w-full block bg-neutral-100 dark:bg-neutral-700 text-center rounded-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition ease-in-out delay-75"
          >Plus de commentaires</a
        >
      </div>
      <!-- End More comments -->
    </div>
    <!-- End Comments content -->
  </article>
</template>
