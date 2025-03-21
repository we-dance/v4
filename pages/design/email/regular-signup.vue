<template>
  <div class="container max-w-3xl mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Regular Sign-up Email</h1>
      <p class="text-muted-foreground mt-2">
        A confirmation email sent to new users immediately after registration.
      </p>
    </div>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          This email confirms account creation and provides next steps for new users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="prose max-w-none">
          <p>
            The regular sign-up email is a crucial touchpoint in the user onboarding journey. 
            It serves to:
          </p>
          <ul>
            <li>Confirm successful account creation</li>
            <li>Welcome the user to the WeDance community</li>
            <li>Provide immediate access to their account</li>
            <li>Guide them towards key platform features</li>
          </ul>
        </div>
      </CardContent>
    </Card>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>
          Example of the email as received by new users
        </CardDescription>
      </CardHeader>
      <CardContent class="bg-muted/50 rounded-lg">
        <div class="max-w-2xl mx-auto bg-background rounded-lg shadow-sm overflow-hidden">
          <!-- Email Header -->
          <div class="p-6 border-b">
            <h2 class="text-2xl font-bold text-center mb-2">
              Welcome to WeDance – Your Account is Ready!
            </h2>
          </div>

          <!-- Email Body -->
          <div class="p-6 space-y-6">
            <div>
              <p class="text-lg">Hi {{ '{' + '{ firstName }' + '}' }},</p>
              <p class="mt-2">
                Welcome to WeDance! 🎉 Your account has been successfully created and is ready to use.
              </p>
            </div>

            <div class="bg-muted p-6 rounded-lg">
              <h3 class="font-semibold text-lg mb-4">Get Started with WeDance</h3>
              <div class="grid gap-4">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="lucide:log-in" class="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium">Access Your Account</p>
                    <p class="text-sm text-muted-foreground">
                      Log in now to start exploring
                    </p>
                    <Button variant="link" class="px-0 h-8">
                      Log In Now →
                    </Button>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="lucide:user" class="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium">Complete Your Profile</p>
                    <p class="text-sm text-muted-foreground">
                      Add your dance styles and preferences
                    </p>
                    <Button variant="link" class="px-0 h-8">
                      Edit Profile →
                    </Button>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="lucide:search" class="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium">Discover Dance Events</p>
                    <p class="text-sm text-muted-foreground">
                      Find local dance events and classes
                    </p>
                    <Button variant="link" class="px-0 h-8">
                      Browse Events →
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <Button size="lg" class="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </div>

            <div class="border-t pt-6 text-sm text-muted-foreground">
              <p class="mb-2">Need help getting started?</p>
              <p>
                Our support team is here to help! Contact us at
                <a href="mailto:support@wedance.vip" class="text-primary hover:underline">
                  support@wedance.vip
                </a>
              </p>
            </div>
          </div>

          <!-- Email Footer -->
          <div class="p-6 bg-muted/30 border-t text-center text-sm text-muted-foreground">
            <p>
              You're receiving this email because you signed up for WeDance.
            </p>
            <div class="mt-2 flex items-center justify-center gap-2">
              <a href="#" class="hover:text-primary">Privacy Policy</a>
              <span>•</span>
              <a href="#" class="hover:text-primary">Terms of Service</a>
              <span>•</span>
              <a href="#" class="hover:text-primary">Unsubscribe</a>
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
                <td class="py-3 px-4">loginUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL for the login page</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">dashboardUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to the user's dashboard</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4">profileUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to edit user's profile</td>
              </tr>
              <tr>
                <td class="py-3 px-4">eventsUrl</td>
                <td class="py-3 px-4">string</td>
                <td class="py-3 px-4">Yes</td>
                <td class="py-3 px-4">URL to browse dance events</td>
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