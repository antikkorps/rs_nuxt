<template>
  <div class="py-6 max-w-4xl mx-auto w-full">
    <!-- WIP Loading -->
    <div v-if="loading" class="w-full h-48 flex items-center justify-center">
        Loading...
    </div>
    <UiPostCard v-else>
      <template #content>
        <div>
          <h2>{{ salon ? "Mettre à jour votre salon" : "Ajouter un nouveau salon" }}</h2>
          <form class="space-y-6" method="POST">
            <UiFormFieldLayout
              inputName="name"
              label="Nom du salon"
              :error="errors.name ?? null"
            >
              <template #input>
                <input
                  :disabled="loading"
                  v-model="state.name"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nom du salon"
                  autocomplete="salon-name"
                />
              </template>
            </UiFormFieldLayout>

            <!-- DESCRIPTION -->
            <UiFormFieldLayout
              inputName="description"
              label="Description"
              :error="errors.description ?? null"
            >
              <template #input>
                <textarea
                  :disabled="loading"
                  id="description"
                  name="description"
                  placeholder="Description du salon"
                  v-model="state.description"
                  >{{ state.description }}</textarea
                >
              </template>
            </UiFormFieldLayout>

            <div class="md:grid md:grid-cols-2 md:gap-2">
              <!-- RUE -->
              <UiFormFieldLayout
                inputName="street"
                label="Adresse"
                :error="errors.street ?? null"
              >
                <template #input>
                  <input
                    :disabled="loading"
                    type="text"
                    id="street"
                    name="street"
                    placeholder="Adresse de votre salon"
                    v-model="state.street"
                  />
                </template>
              </UiFormFieldLayout>

              <!-- ZIPCODE -->
              <UiFormFieldLayout
                inputName="zipcode"
                label="Code postal"
                :error="errors.zipcode ?? null"
              >
                <template #input>
                  <input
                    :disabled="loading"
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    placeholder="Code postal"
                    v-model="state.zipcode"
                  />
                </template>
              </UiFormFieldLayout>
            </div>

            <div class="md:grid md:grid-cols-2 md:gap-2">
              <!-- CITY -->
              <UiFormFieldLayout
                inputName="city"
                label="Ville"
                :error="errors.city ?? null"
              >
                <template #input>
                  <input
                    :disabled="loading"
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ville"
                    v-model="state.city"
                  />
                </template>
              </UiFormFieldLayout>

              <!-- COUNTRY -->
              <UiFormFieldLayout
                inputName="country"
                label="Pays"
                :error="errors.country ?? null"
              >
                <template #input>
                  <input
                    :disabled="loading"
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Pays"
                    v-model="state.country"
                  />
                </template>
              </UiFormFieldLayout>
            </div>

            <p class="text-xl">IL MANQUE LE LOGO /avatar</p>
            <div>
              <button
                :disabled="loading"
                @click="onSubmit"
                type="button"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {{ loading ? "Chargement..." : "Ajouter le salon" }}
              </button>
            </div>
          </form>
        </div>
      </template>
    </UiPostCard>
  </div>
</template>

<script setup lang="ts">
import { SalonSchema } from "~/schemas/salon-schema";
import { salonServices } from "@/services";

const props = defineProps({
  salon: {
    type: Object as PropType<SalonSchema>,
    required: false,
  },
});

const toast = useToast();

const state = reactive({
  id: "",
  name: "",
  description: "",
  street: "",
  zipcode: "",
  city: "",
  country: "",
});

onMounted(() => {

  if (props.salon) {
    state.id = props.salon.id ?? null;
    state.name = props.salon.name ?? '';
    state.description = props.salon.description ?? '';
    state.street = props.salon.street ?? '';
    state.zipcode = props.salon.zipcode ?? '';
    state.city = props.salon.city ?? '';
    state.country = props.salon.country ?? '';

  }
  loading.value = false;
});

const errors = reactive({
  name: "",
  description: "",
  street: "",
  zipcode: "",
  city: "",
  country: "",
});
const loading = ref(true);
const resetErrors = () => {
  errors.name = "";
  errors.description = "";
  errors.street = "";
  errors.zipcode = "";
  errors.city = "";
  errors.country = "";
};
const onSubmit = async () => {
  resetErrors();
  loading.value = true;
  const validateData = SalonSchema.safeParse(state);
  if (!validateData.success) {
    validateData.error.errors.forEach((error: z.ZodIssue) => {
      if (typeof error.path[0] === "string") {
        errors[
          error.path[0] as
            | "name"
            | "description"
            | "street"
            | "zipcode"
            | "city"
            | "country"
        ] = error.message as string;
      }
    });
    return;
  }
  try {
    const salon = await salonServices.upsertSalon(state);

    toast.add({
      title: "Salon ajouté avec succès",
      icon: "i-heroicons-information-circle",
      color: "green",
    });

    await navigateTo(`/salon/${salon.id}`);
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};
</script>

