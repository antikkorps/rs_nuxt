<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font bold text-center">{{ post ? "Mettre à jour votre post" : "Ajouter un nouveau post" }}</h1>

    <div class="py-6 md:w-[450px] lg:w-[600px] max-w-4xl mx-auto w-full">
      <!-- WIP Loading -->
      <div v-if="loading" class="w-full h-48 flex items-center justify-center">
        Loading...
      </div>
      <UiPostCard v-else>
        <template #content>
          <div class=" flex justify-end">
             <select
             class="w-fit"
             v-model="state.user_status"
             >
              <option v-for="status in postStatus" :key="status" :value="status">{{ status === "DRAFT" ? "Brouillon" : "Publié" }}</option>
            </select>
          </div>
          <div>
            <form class="space-y-6" method="POST">
              <UiFormFieldLayout inputName="title" label="Titre de votre post" :error="errors.title ?? null">
                <template #input>
                  <input :disabled="loading" v-model="state.title" id="name" name="name" type="text"
                    placeholder="Nom du salon" autocomplete="salon-name" />
                </template>
              </UiFormFieldLayout>

              <UiFormFieldLayout 
                inputName="description" 
                label="Titre de votre post" 
                :error="errors.description ?? null"
                description="Décrivez votre post en quelques mots"
              >
                <template #input>
                   <textarea :disabled="loading" v-model="state.description" id="name" name="name" type="text"
                    placeholder="Nom du salon" autocomplete="salon-name"></textarea>
                </template>
              </UiFormFieldLayout>
              

              <div>
                <button :disabled="loading" @click="onSubmit" type="button"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {{ loading ? "Chargement..." : buttonLabel }}
                </button>
              </div>
            </form>
          </div>
        </template>
      </UiPostCard>
    </div>
  </div>
</template>



<script setup lang="ts">
import { UserChoiceStatus } from "@prisma/client";
import type { z } from "zod";

import { PostFormSchema, type PostTypeZod } from "~/schemas/post-schema";
import { createPost } from "~/services/postServices"
import { resetErrors } from "~/utils/form-helper";
const { session, cookies } = useAuth()
const userId = session.value?.user?.id

const router = useRouter()
const postStatus: Array<"DRAFT" | "PUBLISHED"> = [UserChoiceStatus.DRAFT, UserChoiceStatus.PUBLISHED];


const props = defineProps({
  post: {
    type: Object as PropType<PostTypeZod>,
    required: false,
  },
});

const toast = useToast();
const loading = ref(true);

// TODO: state of post
const state = reactive({
  id: undefined as unknown as number | null,
  title: "",
  description: "",
  user_status: postStatus[0],
});

// TODO
onMounted(() => {
  if (props.post) {
    state.id = props.post.id ?? null;
    state.title = props.post.title ?? "";
    state.description = props.post.description ?? "";
    state.user_status = (props.post.user_status as "DRAFT" | "PUBLISHED") ?? postStatus[0];
  }
  loading.value = false;
});

const errors = reactive(generateErrorFields(state, ["id"]));


const onSubmit = async () => {
  resetErrors(errors)

 
  if (!session) {
    console.log("Vous devez être connecté pour créer un post")
    router.push("/auth/login")
  }




  const validateData = PostFormSchema.safeParse(state);
  if (!validateData.success) {
    validateData.error.errors.forEach((error: z.ZodIssue) => {
      if (typeof error.path[0] === "string") {
        errors[
          error.path[0] as
            | "title"
            | "description"
            | "user_status"
        ] = error.message as string;
      }
    });
    return;
  }
  try {
    loading.value = true;

    const response = createPost({
      title: state.title,
      description: state.description,
      user_status: state.user_status
      // userId: userId,
    })
    toast.add({
      title: "Salon ajouté avec succès",
      icon: "i-heroicons-information-circle",
      color: "green",
    });

    // await navigateTo(`/salon/${salon.id}`);
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const buttonLabel = props.post?.id ? "Mettre à jour le post" : "Ajouter un post";
</script>