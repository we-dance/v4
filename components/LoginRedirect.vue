<script setup lang="ts">
const props = defineProps<{
  to: string
}>()

const router = useRouter()

onMounted(() => {
  router.push(`/login?redirect=${props.to}`)
})
</script>

<template>
  <div>
    <p>Please login to continue</p>
  </div>
</template>
