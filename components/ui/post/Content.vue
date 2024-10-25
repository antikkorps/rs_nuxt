<script setup lang="ts">
import type { ExtendedPost } from "~/types/posts"
import { likeServices } from "@/services"

const props = defineProps({
  post: {
    type: Object as PropType<ExtendedPost>,
    required: true,
  },
})

const { session } = useAuth()

const user = session.value?.user

const updateLikes = async () => {
  fetchPostLikes()
}

const likeCount = ref(0)
const loadingCount = ref(false)
const fetchPostLikes = async () => {
  loadingCount.value = true
  likeCount.value = await likeServices.getItemCountLikes(props.post.id, "POST")
  loadingCount.value = false
}
onMounted(() => {
  likeCount.value = props.post._count.postLikes || 0
})
</script>
<template>
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
    <div class="pt-2 flex flex-row items-center">
      <div class="inline-flex items-center" href="#">
        <UiLikeBtn
          :likedItemId="post.id"
          @updateLikes="updateLikes"
          likeType="POST"
          :userId="user?.id"
          :isLiked="post.postLikes && post.postLikes.length > 0"
        />
      </div>
      <UiEmojiPicker />

      <nuxt-link :to="`/posts/${post.id}`">
        <UiCommentBtn :count="post._count.comments" />
      </nuxt-link>
    </div>
    <div class="flex items-center">
      <UiShareBtn />
      <UiBookmarkBtn
        :userId="user?.id"
        :postId="post.id"
        :isBookmarked="post.bookmarkedPosts && post.bookmarkedPosts.length > 0"
      />
    </div>
  </div>
  <div class="mb-4">
    <div
      v-if="loadingCount"
      class="dark:bg-neutral-600 bg-gray-200 animate-pulse animate w-28 rounded h-5"
    />
    <div v-else>
      <span v-if="likeCount === 0" class="text-lg font-bold">
        Ce post n'a pas encore été liké
      </span>
      <span v-else-if="likeCount === 1" class="text-lg font-bold">
        1 personne aime ce post
      </span>
      <span v-else class="text-lg font-bold">
        {{ likeCount }} personnes aiment ce post
      </span>
    </div>
  </div>
</template>
