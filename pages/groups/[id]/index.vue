<template>
  <GroupLayout v-if="group" :group="group">
    <div class="max-w-xl mx-auto">
      <PostList :type="'all'" :limit="3" :author-id="groupId" />
    </div>
  </GroupLayout>

  <EmptyState v-else variant="group-not-found" />
</template>

<script setup lang="ts">
import EmptyState from '~/components/common/EmptyState.vue'

const { group, groupId } = useGroup()
</script>
