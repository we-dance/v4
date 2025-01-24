<template>
  <LandingHeroFeatures
    badge="New Opportunity"
    badgeIcon="ph:star"
    title="Share & Earn with Dance"
    description="Turn your dance passion into earnings. Share events and services with your network, grow your influence, and get rewarded."
    primaryText="Start Earning Now"
    primaryLink="/register"
    secondaryText="How It Works"
    secondaryLink="/events/1"
    :features="[
      { icon: 'ph:check-circle', text: 'No experience needed' },
      { icon: 'ph:money', text: 'Earn from day one' },
      { icon: 'ph:users', text: 'Grow your influence' }
    ]"
    :cards="[
      {
        icon: 'ph:calendar',
        title: 'Event Tickets',
        description: 'Share events and earn commission on every ticket sale'
      },
      {
        icon: 'ph:graduation-cap',
        title: 'Class Packages',
        description: 'Refer students and earn from their first class'
      },
      {
        icon: 'ph:users-three',
        title: 'Partner Network',
        description: 'Connect with artists and venues for special deals'
      },
      {
        icon: 'ph:crown',
        title: 'VIP Benefits',
        description: 'Unlock exclusive perks as your influence grows'
      }
    ]"
  />

  <!-- How It Works -->
  <section class="py-16 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground">How It Works</h2>
        <p class="text-muted-foreground mt-2">
          Three simple steps to start earning with your dance influence
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <Icon name="ph:user-plus" class="w-6 h-6 text-primary" />
            </div>
            <CardTitle>1. Create Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Sign up and create your dancer profile. Share your dance styles,
              experience, and social media presence.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <Icon name="ph:share" class="w-6 h-6 text-primary" />
            </div>
            <CardTitle>2. Share & Promote</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Share events, classes, and services with your unique referral
              links on social media and with your network.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <Icon name="ph:money" class="w-6 h-6 text-primary" />
            </div>
            <CardTitle>3. Earn Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Earn commission when people book through your links. Get special
              perks as your influence grows.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Earning Opportunities -->
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground">
          Earning Opportunities
        </h2>
        <p class="text-muted-foreground mt-2">
          Multiple ways to earn through your dance network
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <Icon name="ph:ticket" class="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Event Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>10% commission on ticket sales</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Festival & workshop referrals</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Special event access</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <Icon name="ph:graduation-cap" class="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Class Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>15% on first-time students</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Recurring commission</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Free class credits</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <Icon name="ph:storefront" class="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Dance Services</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>20% on service bookings</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Partner referral bonus</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Exclusive service deals</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Influence Levels -->
  <section class="py-16 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground">Influence Levels</h2>
        <p class="text-muted-foreground mt-2">
          Unlock more benefits as your influence grows
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Rising Star</CardTitle>
            <CardDescription>Getting Started</CardDescription>
          </CardHeader>
          <CardContent>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Basic commission rates</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Referral dashboard</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Promotional materials</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dance Leader</CardTitle>
            <CardDescription>Established Influence</CardDescription>
          </CardHeader>
          <CardContent>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Higher commission rates</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Early event access</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Custom promo codes</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dance Ambassador</CardTitle>
            <CardDescription>Top Influencer</CardDescription>
          </CardHeader>
          <CardContent>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Premium commission rates</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>VIP event perks</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="ph:check" class="w-5 h-5 text-success" />
                <span>Exclusive partnerships</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <LandingTestimonials
    title="Success Stories"
    description="See how dancers are growing their influence and earnings"
    :testimonials="[
      {
        title: 'Sarah M.',
        subtitle: 'Salsa Instructor',
        quote: 'I\'ve earned over €500 in my first month just by sharing events with my students and social media followers!',
      },
      {
        title: 'David K.',
        subtitle: 'Festival Organizer',
        quote: 'The referral system helped me fill my workshops faster and reward my loyal community members.',
      },
      {
        title: 'Maria L.',
        subtitle: 'Dance Blogger',
        quote: 'WeDance\'s promotion tools helped me monetize my dance blog and create additional income streams.',
      }
    ]"
  />

  <LandingComparison
    title="Why Choose WeDance?"
    description="See how WeDance compares to platforms you might be using today"
    :items="[
      {
        icon: 'ph:whatsapp-logo',
        title: 'vs WhatsApp',
        description: 'Organized event discovery vs scattered group messages',
        link: '/vs/whatsapp'
      },
      {
        icon: 'ph:chat-circle',
        title: 'vs Facebook Groups',
        description: 'Dedicated dance platform vs general social network',
        link: '/vs/facebook'
      },
      {
        icon: 'ph:globe',
        title: 'vs Dance Forums',
        description: 'Modern community features vs outdated forums',
        link: '/vs/salsaforums'
      }
    ]"
  />

  <LandingGetStarted
    title="Ready to Start Your Dance Journey?"
    description="Join thousands of dancers in your city"
    secondary="Founding Member Benefits"
    secondaryLink="/founding-members"
  />
</template>
