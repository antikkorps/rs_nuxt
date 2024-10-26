<template>
  id {{ salonId }}

  <FormsUpsertSalon v-if="!loading" :salon="salon ?? undefined" />
</template>

<script setup lang="ts">
import type { SalonType } from "~/schemas/salon-schema";
import { salonServices } from "@/services";
const route = useRoute();
const salonId = Array.isArray(route.params.id) 
  ? parseInt(route.params.id[0], 10) 
  : parseInt(route.params.id, 10);

const salon = ref() as unknown as Ref<SalonType | null>;
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const response = await salonServices.getSalonById(salonId);
  salon.value = response;
  loading.value = false;
});
</script>
