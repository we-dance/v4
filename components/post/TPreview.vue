<script setup>
import { defineComponent, computed, h } from 'vue'
import MarkdownIt from 'markdown-it'
import MarkdownContainer from 'markdown-it-container'
import MarkdownAttrs from 'markdown-it-attrs'
import excerptHtml from 'excerpt-html'
import mila from 'markdown-it-link-attributes'

import { parseDocument } from 'htmlparser2'
import WYoutube from '~/components/widgets/WYoutube.vue'

const props = defineProps({
  content: String,
  excerpt: Boolean,
})

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
})

md.use(MarkdownAttrs)
md.use(mila, {
  pattern: /^https:/,
  attrs: {
    target: '_blank',
    rel: 'noopener',
  },
})

const html = computed(() => md.render(props.content))

const customComponents = {
  'w-youtube': WYoutube,
}

function renderNode(node) {
  if (node.type === 'text') {
    return node.data
  }

  if (node.type === 'tag') {
    const tagName = node.name.toLowerCase()
    const component = customComponents[tagName] || tagName
    const props = Object.fromEntries(
      Object.entries(node.attribs || {}).map(([key, value]) => [key, value])
    )

    return h(component, props, node.children?.map(renderNode) || [])
  }

  return null
}

const contentTree = computed(() =>
  props.excerpt
    ? defineComponent({
        name: 'DynamicMarkdownTree',
        setup() {
          return () => h('div', {}, excerptHtml(props.content))
        },
      })
    : defineComponent({
        name: 'DynamicMarkdownTree',
        setup() {
          const dom = parseDocument(html.value).children
          const children = dom.map(renderNode)
          return () => h('div', {}, children)
        },
      })
)
</script>

<template>
  <component :is="contentTree" class="prose" />
</template>
