<script setup lang="ts">
import { ref, computed } from "vue";
import { mockCourses } from "~/data/mockCourses";
import { useDialog } from "~/composables/useDialog";
import { useRoute } from "vue-router";

const route = useRoute();
const course = ref(
  mockCourses.find((course) => String(course.id) === String(route.params.id))!
);
const dialog = useDialog();

const currentLesson = ref(course.value.modules[0].lessons[0]);

const progress = computed(() => {
  const totalLessons = course.value.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );
  const completedLessons = course.value.modules.reduce(
    (acc, module) =>
      acc + module.lessons.filter((lesson) => lesson.completed).length,
    0
  );
  return Math.round((completedLessons / totalLessons) * 100);
});

const selectLesson = (lesson: any) => {
  currentLesson.value = lesson;
};

const handleSubscribe = () => {
  dialog.open({
    component: "CourseSubscriptionDialog",
    props: {
      course: course.value,
      onSelect: (plan: { type: string; interval?: string }) => {
        navigateTo(
          `/checkout/${route.params.id}?type=course&plan=${plan.type}${plan.interval ? `&interval=${plan.interval}` : ""}`
        );
      },
    },
  });
};
</script>

<template>
  <div class="min-h-screen bg-muted">
    <!-- Course Header -->
    <div class="bg-background border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">{{ course.title }}</h1>
            <p class="text-sm text-muted-foreground">
              Instructor: {{ course.instructor.name }}
            </p>
          </div>
          <div class="text-right">
            <div class="text-sm text-muted-foreground">Progress</div>
            <div class="text-lg font-semibold">{{ progress }}%</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Video Player -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="aspect-video">
              <iframe
                :src="`https://www.youtube.com/embed/${currentLesson.videoId}`"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">
                {{ currentLesson.title }}
              </h2>
              <p class="text-sm text-muted-foreground">
                Duration: {{ currentLesson.duration }}
              </p>
            </div>
          </div>

          <!-- Course Content -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Course Content</h3>
            </div>
            <div class="divide-y">
              <div
                v-for="module in course.modules"
                :key="module.id"
                class="p-4"
              >
                <h4 class="font-medium mb-2">{{ module.title }}</h4>
                <ul class="space-y-2">
                  <li
                    v-for="lesson in module.lessons"
                    :key="lesson.id"
                    @click="selectLesson(lesson)"
                    class="flex items-center gap-3 p-2 rounded hover:bg-accent cursor-pointer"
                    :class="{
                      'bg-accent/10': currentLesson.id === lesson.id,
                    }"
                  >
                    <Icon
                      :name="
                        lesson.completed
                          ? 'ph:check-circle-fill'
                          : 'ph:play-circle'
                      "
                      class="w-5 h-5"
                      :class="
                        lesson.completed
                          ? 'text-success'
                          : 'text-muted-foreground'
                      "
                    />
                    <div class="flex-1">
                      <div
                        class="text-sm"
                        :class="{
                          'font-medium': currentLesson.id === lesson.id,
                        }"
                      >
                        {{ lesson.title }}
                      </div>
                      <div class="text-xs text-muted-foreground">
                        {{ lesson.duration }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Course Materials -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Course Materials</h3>
            </div>
            <div class="p-4">
              <ul class="space-y-3">
                <li
                  v-for="material in course.materials"
                  :key="material.id"
                  class="flex items-center gap-3 p-2 rounded hover:bg-accent cursor-pointer"
                >
                  <Icon
                    :name="material.icon"
                    class="w-5 h-5 text-muted-foreground"
                  />
                  <div class="flex-1">
                    <div class="text-sm font-medium">{{ material.title }}</div>
                    <div class="text-xs text-muted-foreground">
                      {{ material.size }}
                    </div>
                  </div>
                  <Icon
                    name="ph:download-simple"
                    class="w-5 h-5 text-muted-foreground"
                  />
                </li>
              </ul>
            </div>
          </div>

          <!-- Instructor Info -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">About the Instructor</h3>
            </div>
            <div class="p-4">
              <div class="flex items-start gap-4">
                <img
                  :src="course.instructor.image"
                  :alt="course.instructor.name"
                  class="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h4 class="font-semibold text-lg">
                    {{ course.instructor.name }}
                  </h4>
                  <p class="text-sm text-muted-foreground mb-2">
                    {{ course.instructor.level }} instructor in
                    {{ course.instructor.location }}
                  </p>
                  <div
                    class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                  >
                    <Icon name="ph:star-fill" class="w-4 h-4 text-warning" />
                    {{ course.instructor.rating }} ({{
                      course.instructor.reviewCount
                    }}
                    reviews)
                  </div>
                  <div class="space-y-2">
                    <p class="text-sm text-muted-foreground">
                      <Icon name="ph:translate" class="w-4 h-4 inline mr-1" />
                      Languages: {{ course.instructor.languages.join(", ") }}
                    </p>
                    <p class="text-sm text-muted-foreground">
                      <Icon name="ph:medal" class="w-4 h-4 inline mr-1" />
                      {{ course.instructor.experience.years }}+ years of
                      experience
                    </p>
                    <div class="text-sm text-muted-foreground">
                      <Icon name="ph:trophy" class="w-4 h-4 inline mr-1" />
                      Achievements:
                      <ul class="list-disc list-inside ml-5">
                        <li
                          v-for="achievement in course.instructor.experience
                            .achievements"
                          :key="achievement"
                        >
                          {{ achievement }}
                        </li>
                      </ul>
                    </div>
                    <!-- Social Media Links -->
                    <div
                      class="flex items-center gap-4 mt-4"
                      v-if="course.instructor.socialMedia"
                    >
                      <a
                        v-if="course.instructor.socialMedia.instagram"
                        :href="`https://instagram.com/${course.instructor.socialMedia.instagram}`"
                        target="_blank"
                        class="text-muted-foreground hover:text-accent"
                      >
                        <Icon name="ph:instagram-logo" class="w-6 h-6" />
                      </a>
                      <a
                        v-if="course.instructor.socialMedia.youtube"
                        :href="`https://youtube.com/${course.instructor.socialMedia.youtube}`"
                        target="_blank"
                        class="text-muted-foreground hover:text-destructive"
                      >
                        <Icon name="ph:youtube-logo" class="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Student Reviews</h3>
            </div>
            <div class="divide-y">
              <div
                v-for="review in course.reviews"
                :key="review.id"
                class="p-4"
              >
                <div class="flex items-center gap-2 mb-2">
                  <div class="flex">
                    <Icon
                      v-for="i in review.rating"
                      :key="i"
                      name="ph:star-fill"
                      class="w-4 h-4 text-warning"
                    />
                  </div>
                  <span class="text-sm text-muted-foreground">{{
                    review.user
                  }}</span>
                  <span class="text-xs text-muted-foreground">
                    {{ new Date(review.date).toLocaleDateString() }}
                  </span>
                </div>
                <p class="text-sm text-muted-foreground">
                  {{ review.comment }}
                </p>
              </div>
            </div>
          </div>

          <!-- Community -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Community</h3>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-accent">
                    {{ course.community.discussions }}
                  </div>
                  <div class="text-sm text-muted-foreground">Discussions</div>
                </div>
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-accent">
                    {{ course.community.activeStudents }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    Active Students
                  </div>
                </div>
              </div>
              <div class="bg-accent/10 rounded-lg p-4">
                <h4 class="font-medium mb-2">Next Live Q&A Session</h4>
                <p class="text-sm text-muted-foreground">
                  {{ new Date(course.community.nextLiveQ_A).toLocaleString() }}
                </p>
                <Button class="w-full mt-3" variant="outline"
                  >Join Community</Button
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:sticky lg:top-8 space-y-8">
          <!-- Course Stats -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Course Overview</h3>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-accent">
                    {{ course.stats.enrolled }}
                  </div>
                  <div class="text-sm text-muted-foreground">Students</div>
                </div>
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-accent">
                    {{ course.stats.completed }}
                  </div>
                  <div class="text-sm text-muted-foreground">Completed</div>
                </div>
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-warning">
                    {{ course.stats.avgRating }}
                  </div>
                  <div class="text-sm text-muted-foreground">Avg Rating</div>
                </div>
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-accent">
                    {{ course.stats.reviewCount }}
                  </div>
                  <div class="text-sm text-muted-foreground">Reviews</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing Tiers -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4">
              <div class="space-y-4">
                <div>
                  <h3 class="font-semibold mb-2">Starting from</h3>
                  <div class="text-2xl font-bold text-accent">
                    {{ course.pricing.regular.monthly.amount }}
                    {{ course.pricing.regular.monthly.currency }}
                    <span class="text-base font-normal text-muted-foreground"
                      >/month</span
                    >
                  </div>
                </div>

                <Button
                  class="w-full"
                  variant="default"
                  @click="handleSubscribe"
                >
                  View Pricing Plans
                </Button>

                <p class="text-xs text-center text-muted-foreground">
                  14-day money-back guarantee
                </p>
              </div>
            </div>
          </div>

          <!-- Private Class Booking -->
          <div
            class="bg-background rounded-xl shadow-sm overflow-hidden"
            v-if="course.instructor.privateClass"
          >
            <div class="p-4 border-b">
              <h3 class="font-semibold">Book Private Class</h3>
            </div>
            <div class="p-4">
              <div class="text-2xl font-bold mb-1">
                {{ course.instructor.privateClass.amount }}
                {{ course.instructor.privateClass.currency }}
              </div>
              <p class="text-sm text-muted-foreground mb-4">
                {{ course.instructor.privateClass.duration }} minutes private
                lesson
              </p>
              <Button class="w-full" variant="default" as-child>
                <NuxtLink
                  :to="`/checkout/${route.params.id}?type=private&instructor=${course.instructor.id}`"
                >
                  Book Private Class
                </NuxtLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
