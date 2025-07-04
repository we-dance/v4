import PricingOptionsDialog from './PricingOptionsDialog.vue'
import UserTypeInfoDialog from './UserTypeInfoDialog.vue'
import ArtistBookingDialog from './ArtistBookingDialog.vue'
import CourseSubscriptionDialog from './CourseSubscriptionDialog.vue'
import VenueBookingDialog from './VenueBookingDialog.vue'
import VenueAreaDetailsDialog from './VenueAreaDetailsDialog.vue'
import SearchDialog from './SearchDialog.vue'
import CourseReviewDialog from './CourseReviewDialog.vue'
import CourseCreateDialog from './CourseCreateDialog.vue'
import CourseOfferDialog from './CourseOfferDialog.vue'
import CourseModuleDialog from './CourseModuleDialog.vue'
import CourseLessonDialog from './CourseLessonDialog.vue'
import CourseResourceDialog from './CourseResourceDialog.vue'
import ReviewDialog from './ReviewDialog.vue'
import EventCreateDialog from './EventCreateDialog.vue'

export const dialogs = {
  PricingOptionsDialog,
  UserTypeInfoDialog,
  ArtistBookingDialog,
  CourseSubscriptionDialog,
  VenueBookingDialog,
  VenueAreaDetailsDialog,
  SearchDialog,
  CourseReviewDialog,
  CourseCreateDialog,
  CourseOfferDialog,
  CourseModuleDialog,
  CourseLessonDialog,
  CourseResourceDialog,
  ReviewDialog,
  EventCreateDialog,
}
// Dynamically import all dialog Vue components
const dialogModules = import.meta.glob('./*.vue', { eager: true })

// Create the dialogs object by transforming filenames to component names
export const dialogs = Object.fromEntries(
  Object.entries(dialogModules)
    .filter(([path]) => {
      // Exclude provider components that aren't actual dialogs
      const excludePatterns = [
        'Provider.vue',
        'AlertDialogProvider.vue',
        'DialogProvider.vue',
      ]
      return !excludePatterns.some((pattern) => path.includes(pattern))
    })
    .map(([path, module]) => {
      // Extract component name from file path (e.g., './ArtistBookingDialog.vue' -> 'ArtistBookingDialog')
      const componentName = path.replace('./', '').replace('.vue', '')
      return [componentName, (module as any).default]
    })
)
