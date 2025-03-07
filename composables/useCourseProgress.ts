import { mockCourses } from '@/data/mockCourses'

export const useCourseProgress = () => {
  // receive courseId and status
  // update lesson unlock status
  const updateLessonUnlockStatus = async (
    courseId: string,
    status: boolean
  ) => {
    const course = mockCourses.find((course) => course.identifier === courseId)

    if (course) {
      // update course enrolled number
      course.stats.enrolled += 1
      // update lock status
      course.hasPart.forEach((module) => {
        return module.hasPart.forEach((lesson) => {
          lesson.locked = status
        })
      })

      // Log success
      console.log(
        `Updated all lessons for course ${courseId} to locked=${status}`
      )
      return true
    }

    return false
  }

  // write here to update completed status of course

  return {
    updateLessonUnlockStatus,
  }
}
