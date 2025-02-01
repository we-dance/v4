import type { ComponentOptions, PropType, Component } from 'vue'

interface DocgenInfo {
  description?: string
  props?: Record<string, { description: string }>
  tags?: Record<string, string[]>
}

type ComponentWithDocs =
  | Component
  | (ComponentOptions & {
      __docgenInfo?: DocgenInfo
      __file?: string
      props?: Record<
        string,
        {
          type?: PropType<any>
          required?: boolean
          default?: any
          __docgenInfo?: { description: string }
        }
      >
    })

interface Example {
  name: string
  code: string
  data?: Record<string, any>
}

export function useComponentDocs(component: ComponentWithDocs) {
  const props = (component as ComponentOptions).props || {}
  const emits = (component as ComponentOptions).emits || []
  const name =
    (component as ComponentOptions).name ||
    (component as ComponentOptions).__file
      ?.split('/')
      .pop()
      ?.replace(/\.[^/.]+$/, '') ||
    'Unnamed'

  // Extract JSDoc tags
  const tags = (component as ComponentOptions).__docgenInfo?.tags || {}

  // Get description and introduction
  const description =
    (component as ComponentOptions).__docgenInfo?.description || ''
  const introduction = tags.introduction?.[0] || description

  // Get usage examples
  const examples: Example[] = (tags.example || []).map((example: string) => {
    try {
      const [name, code, dataStr] = example
        .split('---')
        .map((s: string) => s.trim())
      return {
        name,
        code,
        data: dataStr ? JSON.parse(dataStr) : undefined,
      }
    } catch {
      return { name: 'Example', code: example }
    }
  })

  // Get features list
  const features = tags.feature || []

  // Extract prop metadata
  const propsMetadata = Object.entries(props).map(([name, prop]) => {
    const propDef = prop as {
      type?: PropType<any>
      required?: boolean
      default?: any
      __docgenInfo?: { description: string }
    }

    let type = 'any'
    if (propDef.type) {
      if (typeof propDef.type === 'function') {
        type = propDef.type.name
      } else if (typeof propDef.type === 'object' && 'value' in propDef.type) {
        type = 'Ref'
      } else if (Array.isArray(propDef.type)) {
        type = propDef.type
          .map((t) => (typeof t === 'function' ? t.name : 'unknown'))
          .join(' | ')
      }
    }

    return {
      name,
      type,
      required: propDef.required || false,
      default: propDef.default,
      description:
        propDef.__docgenInfo?.description ||
        (component as ComponentOptions).__docgenInfo?.props?.[name]
          ?.description ||
        '',
    }
  })

  // Extract events metadata
  const eventsMetadata = Array.isArray(emits)
    ? emits.map((event) => ({
        name: event,
        description: tags[`event:${event}`]?.[0] || '',
      }))
    : Object.entries(emits).map(([name]) => ({
        name,
        description: tags[`event:${name}`]?.[0] || '',
      }))

  return {
    name,
    description,
    introduction,
    examples,
    features,
    props: propsMetadata,
    events: eventsMetadata,
  }
}
