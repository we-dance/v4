<!-- Founding Members Benefits Page -->
<template>
  <div>
    <!-- Hero Section -->
    <div class="relative min-h-[60vh] flex items-center overflow-hidden">
      <GradientBackground />

      <!-- Content -->
      <div class="relative w-full py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <Badge variant="secondary" class="mb-4">
              <Icon name="ph:crown" class="w-4 h-4 mr-1" />
              Limited Time Offer
            </Badge>
            <h1
              class="text-4xl lg:text-7xl font-extrabold text-foreground tracking-tight mb-6"
            >
              Founding Member Benefits
            </h1>
            <p class="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join WeDance as a founding member and get exclusive lifetime
              benefits. Limited spots available.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Eligibility Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground">
            Limited Availability
          </h2>
          <p class="text-muted-foreground mt-2">
            Founding member status is available to early adopters in each city
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Artists</CardTitle>
              <CardDescription>First 20 per city</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-5xl font-bold mb-4">20</div>
              <p class="text-muted-foreground">spots available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Venues</CardTitle>
              <CardDescription>First 10 per city</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-5xl font-bold mb-4">10</div>
              <p class="text-muted-foreground">spots available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organizers</CardTitle>
              <CardDescription>First 10 per city</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-5xl font-bold mb-4">10</div>
              <p class="text-muted-foreground">spots available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Core Benefits Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground">Core Benefits</h2>
          <p class="text-muted-foreground mt-2">
            Exclusive benefits for our founding members
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Financial Benefits -->
          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
              >
                <Icon name="ph:money" class="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Financial Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>First month free</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Price lock guarantee</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Priority early bird rates</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Platform Visibility -->
          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
              >
                <Icon name="ph:eye" class="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Platform Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Verified Founding Member badge</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Priority in search results</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Featured listings</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Early Access -->
          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
              >
                <Icon name="ph:rocket" class="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Early Access</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Beta testing of new features</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Priority access to new tools</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Exclusive previews</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Community Influence -->
          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
              >
                <Icon name="ph:users" class="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Community Influence</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Feature voting rights</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Direct dev team access</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Strategy participation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Growth Support -->
          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
              >
                <Icon name="ph:trend-up" class="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Growth Support</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Free newsletter promotion</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Featured blog stories</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Social media spotlight</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Network Benefits -->
          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
              >
                <Icon name="ph:handshake" class="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Network Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Private community access</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Exclusive events</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Priority partnerships</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Category Benefits -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground">Category Benefits</h2>
          <p class="text-muted-foreground mt-2">
            Special benefits tailored for each member category
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Artists Benefits -->
          <Card>
            <CardHeader>
              <CardTitle>For Artists</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Featured spotlights</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Priority bookings</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Profile optimization</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Promotional features</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Venues Benefits -->
          <Card>
            <CardHeader>
              <CardTitle>For Venues</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Enhanced profiles</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Priority recommendations</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Free photography</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Premium listings</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Organizers Benefits -->
          <Card>
            <CardHeader>
              <CardTitle>For Organizers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Enhanced promotion</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Priority listings</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Free consultation</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="ph:check" class="w-5 h-5 text-success" />
                  <span>Special ticketing rates</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-foreground mb-4">
            Join the Future of Dance
          </h2>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Limited spots available. Join now to secure your founding member
            status and exclusive lifetime benefits.
          </p>
          <div class="flex justify-center gap-4">
            <Button size="lg" as-child>
              <NuxtLink to="/for/artists">For Artists</NuxtLink>
            </Button>
            <Button size="lg" variant="outline" as-child>
              <NuxtLink to="/for/organizers">For Organizers</NuxtLink>
            </Button>
            <Button size="lg" variant="outline" as-child>
              <NuxtLink to="/for/venues">For Venues</NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
