import { task, logger } from '@trigger.dev/sdk/v3'
import { prisma } from '~/server/prisma'
import { getUploadedImage } from '~/cli/utils/cloudinary'
import { getInstagramProfile } from '~/cli/import-organizer/instagram'

export const importInstagramProfile = task({
  id: 'import-instagram-profile',

  run: async (payload: { profileId: string }) => {
    logger.log('Starting instagram import')

    // 1 Upddate status to importing
    await prisma.profile.update({
      where: { id: payload.profileId },
      data: { importStatus: 'importing' },
    })

    try {
      const profile = await prisma.profile.findFirstOrThrow({
        where: { id: payload.profileId },
      })

      if (!profile.instagram) {
        throw new Error('Profile has no Instagram URL')
      }
      logger.log(`Fetching Instagram Data for ${profile.username}`)

      // Scrape happens here
      const instagramData = await getInstagramProfile(profile.instagram)

      if (!instagramData) {
        throw new Error(
          `fetchOrganizer returned null for Instagram URL: ${profile.instagram}`
        )
      }

      logger.log('Succesfull scrpaed insta data')

      let photoUrl: string | undefined
      if (instagramData.photoUrl) {
        const uploaded = await getUploadedImage(instagramData.photoUrl)
        if (uploaded) photoUrl = uploaded
      }

      const updateProfile = await prisma.profile.update({
        where: { id: payload.profileId },
        data: {
          name: instagramData.fullName,
          bio: instagramData.biography,
          website: instagramData.externalUrl,
          photo: photoUrl,
          followersCount: instagramData.followerCount,
          importStatus: 'success',
          source: 'instagram',
          importError: null,
        },
      })
      logger.log('Successfully imported profile')
      // Returning for monitring on trigger.dev
      return {
        success: true,
        profileId: payload.profileId,
        username: updateProfile.username,
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      logger.error(`Instagram import failed for profile ${payload.profileId}:`)

      await prisma.profile.update({
        where: { id: payload.profileId },
        data: {
          importStatus: 'failed',
          importError: errorMessage,
        },
      })
      throw error
    }
  },
})
