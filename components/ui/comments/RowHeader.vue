<script setup lang="ts">
const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-start gap-2">
    <a class="inline-block text-base font-bold mr-2" href="#">
      <div class="flex items-center">
        <span v-if="comment.user.firstname">{{ comment.user.firstname }} </span>
        &nbsp;
        <span v-if="comment.user.lastname">{{ comment.user.lastname }} </span>
        <span v-if="!comment.user.firstname && !comment.user.lastname"
          >{{ comment.user.pseudo }}
        </span>
      </div>
      <span
        class="text-neutral-500 dark:text-neutral-300 font-normal text-sm"
        v-if="comment.user.firstname || comment.user.lastname"
        >{{ comment.user.pseudo }}
      </span>
    </a>
    <span class="text-neutral-500 dark:text-neutral-300">25 minutes ago</span>
  </div>
</template>
