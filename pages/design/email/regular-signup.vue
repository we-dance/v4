<template>
  <div class="container max-w-3xl mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Course Purchase Confirmation</h1>
      <p class="text-muted-foreground mt-2">
        A confirmation email sent to users after successful course purchase.
      </p>
    </div>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          This email confirms course purchase and provides access instructions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="prose max-w-none">
          <p>
            The course purchase confirmation email is sent immediately after payment. 
            It serves to:
          </p>
          <ul>
            <li>Confirm successful payment</li>
            <li>Provide immediate access to course content</li>
            <li>Guide users to start learning</li>
            <li>Share course materials access instructions</li>
          </ul>
        </div>
      </CardContent>
    </Card>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>
          Example of the email as received by course purchasers
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
                Your Course is Ready!
              </h2>
              <p class="text-center text-base text-muted-foreground">Start your learning journey now</p>
            </div>
          </div>

          <!-- Email Body -->
          <div class="p-8 space-y-8">
            <div class="max-w-xl mx-auto">
              <p class="text-xl font-medium">Hi {{ '{' + '{ firstName }' + '}' }} 👋</p>
              <p class="mt-3 text-base text-muted-foreground leading-relaxed">
                Thank you for purchasing {{ '{' + '{ courseName }' + '}' }}! Your payment has been successfully processed, and you now have full access to all course materials.
              </p>
            </div>

            <div class="bg-gradient-to-br from-muted/40 to-muted/20 p-6 rounded-xl border shadow-sm">
              <h3 class="font-bold text-xl mb-6 text-center">Access Your Course</h3>
              <div class="grid gap-4">
                <div class="group flex items-start gap-4 hover:bg-background/80 p-3 rounded-lg transition-all duration-300">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:play" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="font-semibold text-lg group-hover:text-primary transition-colors">Start Learning</p>
                    <p class="text-muted-foreground mt-1 text-base">
                      Access your course content and begin your first lesson
                    </p>
                    <Button variant="link" class="px-0 h-7 mt-1 font-medium text-primary">
                      Go to Course →
                    </Button>
                  </div>
                </div>

                <div class="group flex items-start gap-4 hover:bg-background/80 p-3 rounded-lg transition-all duration-300">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:download" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="font-semibold text-lg group-hover:text-primary transition-colors">Course Materials</p>
                    <p class="text-muted-foreground mt-1 text-base">
                      Download supplementary materials and resources
                    </p>
                    <Button variant="link" class="px-0 h-7 mt-1 font-medium text-primary">
                      View Materials →
                    </Button>
                  </div>
                </div>

                <div class="group flex items-start gap-4 hover:bg-background/80 p-3 rounded-lg transition-all duration-300">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:message-circle" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="font-semibold text-lg group-hover:text-primary transition-colors">Join Discussion</p>
                    <p class="text-muted-foreground mt-1 text-base">
                      Connect with other students and your instructor
                    </p>
                    <Button variant="link" class="px-0 h-7 mt-1 font-medium text-primary">
                      Open Forum →
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <Button 
                size="lg" 
                class="w-full sm:w-auto px-6 py-2 text-base font-medium rounded-lg shadow-sm hover:shadow transition-all duration-300 bg-gradient-to-r from-primary to-primary-600 hover:scale-[1.01]"
              >
                Start Learning Now
              </Button>
            </div>

            <div class="max-w-xl mx-auto">
              <div class="border border-primary/10 rounded-lg p-6 bg-primary/5">
                <p class="text-lg font-semibold mb-2">Need help with the course?</p>
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
              </div>
            </div>
          </div>

          <!-- Email Footer -->
          <div class="p-6 bg-muted/20 border-t">
            <div class="max-w-xl mx-auto text-center space-y-4">
              <img src="/logo.svg" alt="WeDance" class="h-5 mx-auto opacity-50" />
              <p class="text-xs text-muted-foreground/80">
                You're receiving this email because you purchased a course on WeDance.
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
                <td class="py-3 px-4">Name of the purchased course</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">courseUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to access the course content</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">materialsUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to download course materials</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">forumUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to course discussion forum</td>
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