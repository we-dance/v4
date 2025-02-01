import {
  NoteContentSchema,
  ArticleContentSchema,
  EventContentSchema,
  MeetContentSchema,
  ReviewContentSchema,
  GigContentSchema,
  AskLocalsContentSchema,
  AdContentSchema,
} from '~/schemas/post'
import type { PostType } from '~/schemas/post'

export function validateContent(type: PostType, content: unknown) {
  const schemas = {
    note: NoteContentSchema,
    article: ArticleContentSchema,
    event: EventContentSchema,
    meet: MeetContentSchema,
    review: ReviewContentSchema,
    gig: GigContentSchema,
    ask_locals: AskLocalsContentSchema,
    ad: AdContentSchema,
  } as const

  const schema = schemas[type as keyof typeof schemas]

  if (!schema) {
    return {
      success: false,
      error: {
        issues: [
          {
            path: [],
            message: `Unknown post type: ${type}`,
          },
        ],
      },
    }
  }

  return schema.safeParse(content)
}
