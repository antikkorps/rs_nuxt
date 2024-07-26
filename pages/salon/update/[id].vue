<template>
  id {{ salonId }}

  <FormsUpsertSalon v-if="!loading" :salon="salon" />
</template>

<script setup lang="ts">
import type { SalonSchema } from "~/schemas/salon-schema";
import { salonServices } from "@/services";
const route = useRoute();
const salonId = parseInt(route.params.id);

const salon = ref() as unknown as Ref<SalonSchema | null>;
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const response = await salonServices.getSalonById(salonId);
  salon.value = response;
  loading.value = false;
});
</script>
