<script setup lang="ts">
definePageMeta({
  layout: false,
});

import { z } from "zod";

const schema = z.object({
  username: z.string(),
});

const { $client } = useNuxtApp();
const route = useRoute();

const { username } = schema.parse(route.params);

const profile = ref({});
const events = ref([]);

const data = await $client.profiles.get.query({
  username,
});

profile.value = data?.profile;
events.value = data?.events;

if (!profile.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Profile not found",
  });
}
</script>

<template>
  <NuxtLayout name="profile" :profile="profile">
    <TProfileDetails :profile="profile" />
  </NuxtLayout>
</template>
