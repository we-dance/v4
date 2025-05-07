import { PrismaClient } from '@prisma/client'
import { getDateOrNow } from '../utils/date'
import { getNormalizedString, getSlug } from '../utils/slug'
import { load } from 'cheerio'
import axios from 'axios'
const prisma = new PrismaClient()

async function getPreview(link: string) {
  const { data } = await axios.get(link)
  const $ = load(data)

  const getMetaTag = (name: string) => {
    return (
      $(`meta[name=${name}]`).attr('content') ||
      $(`meta[propety="twitter${name}"]`).attr('content') ||
      $(`meta[property="og:${name}"]`).attr('content')
    )
  }

  const preview = {
    url: link,
    title: $('title').first().text(),
    favicon:
      $('link[rel="shortcut icon"]').attr('href') ||
      $('link[rel="alternate icon"]').attr('href'),
    description: getMetaTag('description'),
    image: getMetaTag('image'),
  }

  return preview
}

function getUrlsFromText(text: string): string[] {
  if (!text) {
    return []
  }

  const result = text.match(/(https?:\/\/[^\s"'<]+)/g)

  if (result) {
    return result
  }

  return []
}

export async function addPost(post: any) {
  let creatorId = ''
  if (post.createdBy) {
    const creator = await prisma.profile.findFirst({
      where: { id: post.createdBy },
    })
    if (!creator) {
      return {
        state: 'failed',
        error: 'creator_not_found',
        id: post.id,
        ref: post.createdBy,
      }
    }

    creatorId = creator.id
  }

  let slug = post.title || post.description
  if (slug) {
    slug = getSlug(slug)
  }

  const styleHashtag = post.styles ? Object.keys(post.styles)[0] : null
  const style = styleHashtag
    ? await prisma.danceStyle.findUnique({
        where: { hashtag: styleHashtag },
      })
    : null
  const styleId = style?.id || undefined

  let type = 'post'
  let content = {}
  let summary = ''
  let title = ''
  let links: string[] = []

  if (
    post.description?.includes('<w-youtube') ||
    post.description?.length > 350
  ) {
    type = 'article'
    content = {
      format: 'markdown',
      text: post.description,
    }
    title = getNormalizedString(post.title)
  } else {
    summary = post.description
  }

  if (post.url) {
    links.push(post.url)
  }

  if (summary) {
    links = links.concat(getUrlsFromText(summary))

    for (const link of links) {
      summary = summary.replace(link, '')
    }

    summary = summary.trim()
  }

  const data = {
    id: post.id,
    slug,
    styleId: styleId,
    title,
    summary,
    content,
    attachments: [] as any,
    image: post.cover,
    createdAt: getDateOrNow(post.createdAt),
    updatedAt: getDateOrNow(post.updatedAt),
    authorId: creatorId,
    published: true,
    type,
    firebaseId: post.id,
  }

  for (const rawLink of links) {
    let link = rawLink.replace('http://', 'https://')

    if (!link.includes('https://')) {
      link = `https://${link}`
    }

    try {
      const preview = await getPreview(link)

      data.attachments.push({
        ...preview,
        type: 'link',
      })
    } catch (error) {
      data.attachments.push({
        url: link,
        type: 'link',
      })
    }
  }

  try {
    const result = await prisma.post.upsert({
      where: { id: post.id },
      update: data,
      create: data,
    })

    return {
      state: 'created',
      id: result.id,
    }
  } catch (exception) {
    return {
      state: 'failed',
      error: 'invalid_prisma_post_create',
      id: post.id,
      exception,
    }
  }
}
