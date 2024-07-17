<script setup lang="ts">
import { createPost } from "~/services/postServices"
const title = ref("")
const content = ref("")

const { session, cookies } = useAuth()
const router = useRouter()

const userId = session.value?.user?.id

const submitForm = () => {
  if (!session) {
    console.log("Vous devez être connecté pour créer un post")
    router.push("/auth/login")
  }
  if (!title.value || !content.value) {
    alert("Vous devez remplir tous les champs")
    return
  }
  if (typeof userId === "undefined") {
    console.log("L'ID de l'utilisateur est indéfini")
    return
  }
  try {
    console.log("the user id ", userId)
    const response = createPost({
      title: title.value,
      description: content.value,
      userId: userId,
    })
    title.value = ""
    content.value = ""
    console.log("Post créé avec succès")
  } catch (error) {
    console.log("Une erreur est survenue lors de la création du post")
  }
}
</script>
<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font bold text-center">Ajouter un nouveau post</h1>
    <form @submit.prevent="submitForm" class="flex flex-col my-4">
      <UFormGroup
        class="my-3"
        size="xl"
        label="Titre"
        description="Entrez un titre à votre post"
        required
        :error="!title && 'Vous devez entrer un titre'"
      >
        <UInput type="text" v-model="title" placeholder="Titre" />
      </UFormGroup>
      <UFormGroup
        class="my-3"
        size="xl"
        label="Contenu"
        description="Entrez la description de votre post"
        required
        :error="!content && 'Vous devez entrer une description'"
      >
        <UInput type="text" v-model="content" placeholder="Content" />
      </UFormGroup>
      <UButton
        type="submit"
        color="primary"
        variant="solid"
        class="my-3 w-1/2 justify-center mx-auto py-3"
        >Submit</UButton
      >
    </form>
  </div>
</template>
