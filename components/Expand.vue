<script setup lang="ts">
interface Props {
  show?: string
  hide?: string
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: 'Show more',
  hide: 'Show less',
  expanded: false,
})

const expandedValue = ref(props.expanded)
</script>

<template>
  <div :class="expandedValue ? '' : 'h-20 overflow-y-hidden relative'">
    <slot />
    <Button
      v-if="!props.expanded"
      variant="ghost"
      class="mt-2 text-sm text-primary"
      :class="
        expandedValue
          ? ''
          : 'absolute inset-0 pt-16 text-center bg-gradient-to-b from-transparent to-white'
      "
      @click="expandedValue = !expandedValue"
    >
      {{ expandedValue ? props.hide : props.show }}
    </Button>
  </div>
</template>
