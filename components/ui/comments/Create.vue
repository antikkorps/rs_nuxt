<template>
  <div class="relative">
    <input
      class="pt-2 pb-2 pl-3 w-full h-11 bg-neutral-100 dark:bg-neutral-600 rounded-lg placeholder:text-neutral-600 dark:placeholder:text-neutral-300 font-medium pr-20"
      type="text"
      v-model="state.description"
      placeholder="Write a comment"
    />
    <span class="flex absolute right-3 top-2/4 -mt-3 items-center">
      <svg
        @click="onSubmit"
        class="fill-blue-500 dark:fill-neutral-50"
        style="width: 24px; height: 24px"
        viewBox="0 0 24 24"
      >
        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
      </svg>
    </span>
    {{ errors.description }}
  </div>
</template>

<script setup lang="ts">
import { createCommentSchema } from "~/schemas/comment-schema";
import { commentServices } from "~/services";
import type { ErrorMap } from "~/types/errors";

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  parentId: {
    type: Number,
    required: false,
  },
});

interface State {
  description: string;
}
const state: State = reactive({
  description: "",
  postId: props.postId,
  parentId: props.parentId ?? null,
});
const errors: ErrorMap<State> = reactive({});
const toast = useToast();

const onSubmit = async () => {
  if (!props.userId) {
    toast.add({
      title: "Vous devez être connecté !",
      icon: "i-heroicons-information-circle",
      color: "red",
    });
    return;
  }
  errors.description = "";

  const validateData = createCommentSchema.safeParse(state);
  if (!validateData.success) {
    handleZodErrors({
      errorResponse: validateData.error.errors,
      errorObject: errors,
    });
    return;
  }

  try {
    errors.description = "";
    await commentServices.createComment<State>(validateData.data);
  } catch (error) {
    // console.log("error", error);
  }
};
</script>
