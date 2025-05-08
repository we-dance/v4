<script setup lang="ts">
const { session } = useAppAuth()
const { $client } = useNuxtApp()
import { createPostSchema, type Post } from '~/schemas/postSchema'
const emit = defineEmits(['load', 'cancel'])
import { toast } from 'vue-sonner'

const { post } = defineProps({
  post: {
    type: Object,
    default: () => ({
      type: 'post',
    }),
  },
})

const postTypes = ref([
  {
    label: 'Post',
    value: 'post',
    description: 'Share your thoughts, ideas, or experiences.',
  },
  {
    label: 'Article',
    value: 'article',
    description: 'Share your knowledge and insights.',
  },
  {
    label: 'Ask Locals',
    value: 'ask_locals',
    description: 'Ask locals for advice on a specific topic.',
  },
  {
    label: 'Meet',
    value: 'meet',
    description: 'Organize a meetup for people to get together.',
  },
  { label: 'Job', value: 'job', description: 'Share a job opportunity.' },
  { label: 'Ad', value: 'ad', description: 'Share an advertisement.' },
])

const communities = ref([
  { name: 'Salsa', id: 'salsa' },
  { name: 'Bachata', id: 'bachata' },
  { name: 'Kizomba', id: 'kizomba' },
  { name: 'Zouk', id: 'zouk' },
])

const cities = ref([
  { name: 'New York', id: 'new-york' },
  { name: 'Los Angeles', id: 'los-angeles' },
  { name: 'Chicago', id: 'chicago' },
])

const savePost = async (values: any) => {
  const promise = $client.posts.create.mutate({
    ...values,
  })

  toast.promise(promise, {
    loading: 'Publishing post...',
    success: 'Post published successfully',
    error: 'Error publishing post',
  })

  promise.then(() => {
    emit('load')
  })
}
</script>

<template>
  <Form
    class="flex flex-col gap-4 border shadow-sm border-border p-4 rounded-lg"
    :initial-values="post"
    :validation-schema="createPostSchema"
    @submit="savePost"
  >
    <div class="flex items-start gap-3">
      <Avatar
        :profile="session?.profile"
        class="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all"
      />
      <div class="flex-1">
        <div
          class="font-medium text-foreground hover:text-primary transition-colors"
        >
          {{ session?.profile?.name }}
        </div>
        <div class="flex items-center gap-2 text-sm">
          <FormField name="community" v-slot="{ componentField }">
            <Combobox v-bind="componentField" by="name">
              <ComboboxAnchor as-child>
                <ComboboxTrigger as-child>
                  <Button
                    variant="outline"
                    size="skinny"
                    class="w-auto text-xs"
                  >
                    {{ post.community?.name ?? 'Community' }}

                    <Icon name="ph:caret-down" class="w-4 h-4" />
                  </Button>
                </ComboboxTrigger>
              </ComboboxAnchor>

              <ComboboxList>
                <div class="relative w-full max-w-sm items-center">
                  <ComboboxInput
                    class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
                    placeholder="Search community..."
                  />
                  <span
                    class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
                  >
                    <Icon
                      name="ph:magnifying-glass"
                      class="size-4 text-muted-foreground"
                    />
                  </span>
                </div>

                <ComboboxEmpty> No community found. </ComboboxEmpty>

                <ComboboxGroup>
                  <ComboboxItem
                    v-for="community in communities"
                    :key="community.id"
                    :value="community"
                  >
                    {{ community.name }}
                  </ComboboxItem>
                </ComboboxGroup>
              </ComboboxList>
            </Combobox>
          </FormField>

          <FormField name="city" v-slot="{ componentField }">
            <Combobox v-bind="componentField" by="name">
              <ComboboxAnchor as-child>
                <ComboboxTrigger as-child>
                  <Button
                    variant="outline"
                    size="skinny"
                    class="w-auto text-xs"
                  >
                    {{ post.city?.name ?? 'City' }}

                    <Icon name="ph:caret-down" class="w-4 h-4" />
                  </Button>
                </ComboboxTrigger>
              </ComboboxAnchor>

              <ComboboxList>
                <div class="relative w-full max-w-sm items-center">
                  <ComboboxInput
                    class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
                    placeholder="Search city..."
                  />
                  <span
                    class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
                  >
                    <Icon
                      name="ph:magnifying-glass"
                      class="size-4 text-muted-foreground"
                    />
                  </span>
                </div>

                <ComboboxEmpty> No community found. </ComboboxEmpty>

                <ComboboxGroup>
                  <ComboboxItem
                    v-for="city in cities"
                    :key="city.id"
                    :value="city"
                  >
                    {{ city.name }}

                    <ComboboxItemIndicator>
                      <Icon
                        name="ph:check"
                        class="ml-auto h-4 w-4"
                        :class="
                          post.city?.id === city.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        "
                      />
                    </ComboboxItemIndicator>
                  </ComboboxItem>
                </ComboboxGroup>
              </ComboboxList>
            </Combobox>
          </FormField>
        </div>
      </div>
      <Combobox v-model="post.type">
        <ComboboxAnchor as-child>
          <ComboboxTrigger as-child>
            <Button variant="secondary" class="w-auto text-sm">
              {{ postTypes.find((t) => t.value === post.type)?.label }}
              <Icon name="ph:caret-down" class="w-4 h-4" />
            </Button>
          </ComboboxTrigger>
        </ComboboxAnchor>

        <ComboboxList>
          <ComboboxGroup>
            <ComboboxItem
              v-for="postType in postTypes"
              :key="postType.value"
              :value="postType.value"
              class="flex flex-col items-start px-4 py-2 gap-0 group"
            >
              <p>{{ postType.label }}</p>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
    </div>
    <FormField v-slot="{ componentField }" name="summary">
      <FormItem>
        <Textarea
          v-bind="componentField"
          placeholder="Say something. You can also @mention people."
          class="resize-none text-base"
        />
      </FormItem>
    </FormField>
    <div class="flex justify-start">
      <Button size="icon" variant="ghost">
        <Icon name="ph:image-square-bold" class="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Icon name="ph:link-simple-bold" class="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Icon name="ph:chart-bar-horizontal" class="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Icon name="ph:at" class="w-4 h-4" />
      </Button>
      <div class="flex-1"></div>
      <div class="flex items-center gap-2">
        <Button v-if="post.id" variant="secondary" @click="emit('cancel')"
          >Cancel</Button
        >
        <Button v-if="post.id" variant="primary" type="submit">Save</Button>
        <Button v-else variant="primary" type="submit">Publish</Button>
      </div>
    </div>
  </Form>
</template>
