<template>
  <LandingHeroFeatures
    badge="Early Access"
    badgeIcon="ph:sparkle"
    title="The Future of Dance Spaces"
    description="Be among the first venues to join our platform. Connect with organizers, manage bookings, and grow your dance business globally."
    primaryText="Join Early Access"
    primaryLink="/register"
    secondaryText="How It Works"
    secondaryLink="/venues/1"
    :features="[
      { icon: 'ph:check-circle', text: '5-minute setup' },
      { icon: 'ph:crown', text: 'Founding member benefits' },
      { icon: 'ph:star', text: 'First month free' }
    ]"
    :cards="[
      {
        icon: 'ph:calendar',
        title: 'Space Management',
        description: 'Manage your dance spaces and availability'
      },
      {
        icon: 'ph:users-three',
        title: 'Booking System',
        description: 'Handle reservations and scheduling efficiently'
      },
      {
        icon: 'ph:chart-line',
        title: 'Venue Analytics',
        description: 'Track occupancy, revenue, and performance metrics'
      },
      {
        icon: 'ph:storefront',
        title: 'Marketing Tools',
        description: 'Promote your venue to the dance community'
      }
    ]"
  />

  <LandingPricing
    title="Simple & Transparent Pricing"
    description="No hidden fees. No monthly charges. Only pay when you get bookings."
    :plans="[
      {
        icon: 'ph:calendar',
        title: 'Space Rental',
        price: '5%',
        unit: 'per booking'
      }
    ]"
    footer="All fees include payment processing, hosting, and platform tools. Get paid directly to your bank account every week."
  />

  <LandingTools
    title="All-in-One Platform"
    description="Everything you need to manage your dance venue"
    :tools="[
      {
        icon: 'ph:calendar',
        title: 'Space Management',
        description: 'Smart scheduling, availability management, and booking system'
      },
      {
        icon: 'ph:credit-card',
        title: 'Payment Processing',
        description: 'Secure payments, automatic payouts, and financial reporting'
      },
      {
        icon: 'ph:users-three',
        title: 'Client Portal',
        description: 'Organizer profiles, communication tools, and reviews'
      },
      {
        icon: 'ph:storefront',
        title: 'Venue Profile',
        description: 'Showcase your space with photos, amenities, and pricing'
      },
      {
        icon: 'ph:chart-line',
        title: 'Analytics Dashboard',
        description: 'Track bookings, revenue, and space utilization'
      },
      {
        icon: 'ph:megaphone',
        title: 'Marketing Suite',
        description: 'Promotion tools, SEO optimization, and social media integration'
      }
    ]"
  />

  <LandingTestimonials
    title="Join Our Vision"
    description="Be among the first venues to shape the future of dance spaces"
    :testimonials="[
      {
        title: 'For Dance Studios',
        subtitle: 'Space Rental',
        quote: 'The platform streamlines our studio bookings and helps us reach more dance organizers. The scheduling system is intuitive and saves us hours of work.',
        highlight: '🏢 Efficient space management'
      },
      {
        title: 'For Event Venues',
        subtitle: 'Event Hosting',
        quote: 'Managing multiple dance events has never been easier. The platform helps us coordinate with organizers and maintain a busy event calendar.',
        highlight: '🎭 Seamless event coordination'
      },
      {
        title: 'For Cultural Centers',
        subtitle: 'Community Spaces',
        quote: 'We love how the platform connects us with the local dance community. The booking system and analytics help us optimize our space usage.',
        highlight: '🏛️ Community engagement'
      }
    ]"
  />

  <LandingComparison
    title="Why Choose WeDance?"
    description="See how WeDance compares to platforms you might be using today"
    :items="[
      {
        icon: 'ph:calendar',
        title: 'vs Calendly',
        description: 'Dance-specific features vs general scheduling tool',
        link: '/vs/calendly'
      },
      {
        icon: 'ph:storefront',
        title: 'vs Spacebase',
        description: 'Specialized dance venue tools vs generic space rental',
        link: '/vs/spacebase'
      },
      {
        icon: 'ph:buildings',
        title: 'vs Own Website',
        description: 'Complete management system vs basic web presence',
        link: '/vs/website'
      }
    ]"
  />

  <LandingGetStarted
    title="Be Among the First Venues"
    description="Join now and get exclusive founding member benefits"
    secondary="Founding Member Benefits"
    secondaryLink="/founding-members"
  />
</template>
