import { task, logger } from '@trigger.dev/sdk/v3'
import { prisma } from '~/server/prisma'
import { getInstagramProfile } from '~/cli/import-organizer/instagram'
import { getUploadedImage } from '~/cli/utils/cloudinary'

export const importInstagramProfile = task({
  id: 'import-instagram-profile',

  run: async (payload: { profileId: string }) => {
    logger.log('Starting instagram import')

    //1 Upddate status to importing
    await prisma.profile.update({
      where: { id: payload.profileId },
      data: { importStatus: 'importing' },
    })

    try {
      const profile = await prisma.profile.findFirstOrThrow({
        where: { id: payload.profileId },
      })
      //whill check this conditio later
      if (!profile.instagram) {
        throw new Error('Profile has no Instagram URL')
      }
      logger.log(`Fetching Instagram Data for ${profile.username}`)

      //Scrape here
      const instagramData = await getInstagramProfile(profile.instagram)

      logger.log('Succesfull scrpaed insta data')

      let photoUrl: string | undefined
      if (instagramData.photoUrl) {
        photoUrl = await getUploadedImage(instagramData.photoUrl)
      }

      const updateProfile = await prisma.profile.update({
        where: { id: payload.profileId },
        data: {
          name: instagramData.fullName,
          bio: instagramData.biogrpahy,
          website: instagramData.externalUrl,
          photo: photoUrl,
          followersCount: instagramData.followerCount,
          importStatus: 'success',
          source: 'instagram',
        },
      })
      logger.log('Successfully imported profile')
      // Returning this just for monitring  on trigger.dev
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
