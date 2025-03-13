<template>
  <div class="p-4 border rounded-sm gap-2 flex flex-col">Logging out...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '#imports'

const { signOut } = useAuth()
onMounted(() => {
  signOut({ callbackUrl: '/' })
})
</script>
