<template>
  <div class="container max-w-3xl mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Course Enrollment Confirmation Email</h1>
      <p class="text-muted-foreground mt-2">
        A confirmation email sent to users after enrolling in a dance course (Regular Plan).
      </p>
    </div>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          This email confirms course enrollment and helps users stay on track with their lessons.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="prose max-w-none">
          <p>
            The course enrollment confirmation email is sent immediately after successful payment. 
            It serves to:
          </p>
          <ul>
            <li>Confirm successful payment and enrollment</li>
            <li>Provide immediate access to course content</li>
            <li>Share course and instructor details</li>
            <li>Help users set up lesson reminders</li>
            <li>Enable calendar synchronization</li>
          </ul>
        </div>
      </CardContent>
    </Card>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>
          Example of the email as received by course enrollees
        </CardDescription>
      </CardHeader>
      <CardContent class="bg-muted/50 rounded-lg">
        <div class="max-w-2xl mx-auto bg-background rounded-lg shadow-sm overflow-hidden">
          <!-- Email Header -->
          <div class="relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
            <div class="relative p-8 border-b">
              <img src="/logo.svg" alt="WeDance" class="h-8 mx-auto mb-6" />
              <h2 class="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                You're In! 🎉
              </h2>
              <p class="text-center text-base text-muted-foreground">Your dance journey begins now</p>
            </div>
          </div>

          <!-- Email Body -->
          <div class="p-8 space-y-6">
            <div class="max-w-xl mx-auto">
              <p class="text-xl font-medium">Hi {{ '{' + '{ firstName }' + '}' }} 👋</p>
              <p class="mt-3 text-base text-muted-foreground leading-relaxed">
                Great news! You're now enrolled in <span class="font-medium text-foreground">{{ '{' + '{ courseName }' + '}' }}</span>. Your payment has been successfully processed, and you have full access to all course materials.
              </p>
            </div>

            <!-- Course Details -->
            <div class="max-w-xl mx-auto bg-muted/20 rounded-lg p-6">
              <h4 class="font-semibold text-lg mb-4">Course Details</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <Icon name="lucide:user" class="w-5 h-5 text-muted-foreground" />
                  <p>Instructor: <span class="font-medium">{{ '{' + '{ instructorName }' + '}' }}</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="lucide:clock" class="w-5 h-5 text-muted-foreground" />
                  <p>Duration: <span class="font-medium">{{ '{' + '{ courseDuration }' + '}' }}</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="lucide:calendar" class="w-5 h-5 text-muted-foreground" />
                  <p>Next Lesson: <span class="font-medium">{{ '{' + '{ nextLessonDate }' + '}' }}</span></p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-muted/40 to-muted/20 p-6 rounded-xl border shadow-sm">
              <h3 class="font-bold text-xl mb-6 text-center">Get Started</h3>
              <div class="grid gap-4">
                <div class="group flex items-start gap-4 hover:bg-background/80 p-3 rounded-lg transition-all duration-300">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:play" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="font-semibold text-lg group-hover:text-primary transition-colors">Access Course</p>
                    <p class="text-muted-foreground mt-1 text-base">
                      Start your first lesson right away
                    </p>
                    <Button variant="link" class="px-0 h-7 mt-1 font-medium text-primary">
                      Begin Learning →
                    </Button>
                  </div>
                </div>

                <div class="group flex items-start gap-4 hover:bg-background/80 p-3 rounded-lg transition-all duration-300">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:bell" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="font-semibold text-lg group-hover:text-primary transition-colors">Set Reminders</p>
                    <p class="text-muted-foreground mt-1 text-base">
                      Never miss a lesson with notifications
                    </p>
                    <Button variant="link" class="px-0 h-7 mt-1 font-medium text-primary">
                      Manage Notifications →
                    </Button>
                  </div>
                </div>

                <div class="group flex items-start gap-4 hover:bg-background/80 p-3 rounded-lg transition-all duration-300">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:calendar-plus" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="font-semibold text-lg group-hover:text-primary transition-colors">Sync Calendar</p>
                    <p class="text-muted-foreground mt-1 text-base">
                      Add lessons to your calendar
                    </p>
                    <div class="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" class="h-7 text-xs">
                        <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
                        Google
                      </Button>
                      <Button variant="outline" size="sm" class="h-7 text-xs">
                        <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
                        Apple
                      </Button>
                      <Button variant="outline" size="sm" class="h-7 text-xs">
                        <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
                        Outlook
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <Button 
                size="lg" 
                class="w-full sm:w-auto px-6 py-2 text-base font-medium rounded-lg shadow-sm hover:shadow transition-all duration-300 bg-gradient-to-r from-primary to-primary-600 hover:scale-[1.01]"
              >
                Start Your First Lesson
              </Button>
            </div>

            <div class="max-w-xl mx-auto">
              <div class="border border-primary/10 rounded-lg p-6 bg-primary/5">
                <p class="text-lg font-semibold mb-2">Need help getting started?</p>
                <p class="text-base leading-relaxed">
                  Our instructor support team is here to help! Contact us at
                  <a href="mailto:support@wedance.vip" class="text-primary hover:text-primary-600 font-medium underline decoration-1 underline-offset-2 transition-colors">
                    support@wedance.vip
                  </a>
                </p>
              </div>
            </div>

            <div class="max-w-xl mx-auto bg-muted/20 rounded-lg p-6">
              <h4 class="font-semibold text-lg mb-3">Order Summary</h4>
              <div class="space-y-2 text-muted-foreground text-sm">
                <p>Course: {{ '{' + '{ courseName }' + '}' }}</p>
                <p>Order ID: {{ '{' + '{ orderId }' + '}' }}</p>
                <p>Purchase Date: {{ '{' + '{ purchaseDate }' + '}' }}</p>
                <p>Plan: Regular</p>
              </div>
            </div>
          </div>

          <!-- Email Footer -->
          <div class="p-6 bg-muted/20 border-t">
            <div class="max-w-xl mx-auto text-center space-y-4">
              <img src="/logo.svg" alt="WeDance" class="h-5 mx-auto opacity-50" />
              <p class="text-xs text-muted-foreground/80">
                You're receiving this email because you enrolled in a course on WeDance.
                <br />© 2024 WeDance. All rights reserved.
              </p>
              <div class="flex items-center justify-center gap-3 text-xs">
                <a href="#" class="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
                <span class="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                <a href="#" class="text-muted-foreground hover:text-primary transition-colors">Terms</a>
                <span class="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                <a href="#" class="text-muted-foreground hover:text-primary transition-colors">Help</a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Props</CardTitle>
        <CardDescription>
          Required properties for the email template
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4">Name</th>
                <th class="text-left py-3 px-4">Type</th>
                <th class="text-left py-3 px-4">Required</th>
                <th class="text-left py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-3 px-4">firstName</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">User's first name for personalization</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">courseName</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">Name of the enrolled course</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">instructorName</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">Name of the course instructor</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">courseDuration</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">Total duration of the course</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">nextLessonDate</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">Date and time of the next lesson</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">courseUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to access the course content</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">notificationsUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to manage notification preferences</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">googleCalendarUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to add to Google Calendar</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">appleCalendarUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to add to Apple Calendar</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">outlookCalendarUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to add to Outlook Calendar</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">orderId</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">Unique order identifier</td>
              </tr>
              <tr>
                <td class="py-3 px-4">purchaseDate</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">Date of course purchase</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
// This is a design system page, no actual functionality needed
</script> 