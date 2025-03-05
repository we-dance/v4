import { defineEventHandler, getQuery, sendRedirect, createError } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL parameter is required'
    })
  }

  // Проверяем, что URL безопасен и относится к доверенным источникам
  if (
    url.startsWith('https://firebasestorage.googleapis.com/') ||
    url.startsWith('https://storage.googleapis.com/') ||
    url.startsWith('https://res.cloudinary.com/')
  ) {
    try {
      // Загружаем изображение на сервере
      const response = await $fetch(url, { responseType: 'arrayBuffer' })
      
      // Определяем тип содержимого (Content-Type)
      let contentType = 'image/jpeg' // По умолчанию
      if (url.includes('.png') || url.endsWith('png')) {
        contentType = 'image/png'
      } else if (url.includes('.webp') || url.endsWith('webp')) {
        contentType = 'image/webp'
      } else if (url.includes('.gif') || url.endsWith('gif')) {
        contentType = 'image/gif'
      } else if (url.includes('.svg') || url.endsWith('svg')) {
        contentType = 'image/svg+xml'
      }
      
      // Устанавливаем заголовки
      event.node.res.setHeader('Content-Type', contentType)
      event.node.res.setHeader('Cache-Control', 'public, max-age=86400') // Кэширование на 24 часа
      
      // Возвращаем содержимое изображения
      return response
    } catch (error) {
      console.error('Failed to proxy image:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch image'
      })
    }
  }

  throw createError({
    statusCode: 403,
    statusMessage: 'URL not allowed'
  })
}) 