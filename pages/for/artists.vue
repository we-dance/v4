<template>
  <LandingHeroFeatures
    badge="Early Access"
    badgeIcon="ph:sparkle"
    title="The Future of Dance Business"
    description="Be among the first artists to join our platform. Create online courses, get bookings, and grow your dance business globally."
    primaryText="Join Early Access"
    primaryLink="/register"
    secondaryText="How It Works"
    secondaryLink="/courses/1"
    :features="[
      { icon: 'ph:check-circle', text: '5-minute setup' },
      { icon: 'ph:crown', text: 'Founding member benefits' },
      { icon: 'ph:star', text: 'First month free' },
    ]"
    :cards="[
      {
        icon: 'ph:video-camera',
        title: 'Online Courses',
        description: 'Create and sell dance courses to students worldwide',
      },
      {
        icon: 'ph:users-three',
        title: 'Private Classes',
        description: 'Get booked for private lessons and workshops',
      },
      {
        icon: 'ph:ticket',
        title: 'Festival Gigs',
        description: 'Perform and teach at international festivals',
      },
      {
        icon: 'ph:chart-line',
        title: 'Business Tools',
        description: 'Everything you need to grow your dance business',
      },
    ]"
  />

  <LandingPricing
    title="Simple & Transparent Pricing"
    description="No hidden fees. No monthly charges. Only pay when you earn."
    :plans="[
      {
        icon: 'ph:video-camera',
        title: 'Pre-recorded Courses',
        features: [
          'Create unlimited courses',
          'Set your own prices',
          'Reach global audience',
        ],
        price: '30%',
        unit: 'per sale',
      },
      {
        icon: 'ph:users-three',
        title: 'Live Classes',
        features: [
          'Host Zoom classes',
          'Automatic ticketing',
          'Manage registrations',
        ],
        price: '€0.25',
        unit: 'per ticket',
      },
      {
        icon: 'ph:calendar-check',
        title: 'Private Bookings',
        features: [
          'Private classes',
          'Festival performances',
          'Workshop bookings',
        ],
        price: '5%',
        unit: 'per booking',
      },
    ]"
    footer="All fees include payment processing, hosting, and platform tools. Get paid directly to your bank account every week."
  />

  <LandingTools
    title="All-in-One Platform"
    description="Everything you need to run your dance business professionally"
    :tools="[
      {
        icon: 'ph:video-camera',
        title: 'Course Creator',
        description:
          'Professional video hosting, curriculum builder, and student progress tracking',
      },
      {
        icon: 'ph:credit-card',
        title: 'Payment System',
        description:
          'Secure payments, automatic payouts, and financial reporting',
      },
      {
        icon: 'ph:users-three',
        title: 'Student Portal',
        description: 'Student profiles, messaging, and progress tracking',
      },
      {
        icon: 'ph:calendar',
        title: 'Booking Calendar',
        description: 'Smart scheduling, availability management, and reminders',
      },
      {
        icon: 'ph:chart-line',
        title: 'Analytics',
        description:
          'Revenue tracking, student engagement, and growth insights',
      },
      {
        icon: 'ph:storefront',
        title: 'Marketing Suite',
        description: 'SEO optimization, social sharing, and promotional tools',
      },
    ]"
  />

  <LandingTestimonials
    title="Join Our Vision"
    description="Be among the first artists to shape the future of dance education"
    :testimonials="[
      {
        title: 'For Dance Teachers',
        subtitle: 'Create & Sell Courses',
        quote:
          'I\'m excited about the opportunity to reach students worldwide with my online courses. The platform makes it easy to start with zero tech experience.',
        highlight: '🎓 Pre-recorded & live classes',
      },
      {
        title: 'For Performers',
        subtitle: 'Get More Bookings',
        quote:
          'Looking forward to a platform that helps me manage bookings and grow my performance career. The tools look perfect for professional artists.',
        highlight: '🎭 Private & festival bookings',
      },
      {
        title: 'For Studio Owners',
        subtitle: 'Grow Your Business',
        quote:
          'Can\'t wait to use the business tools to streamline my studio operations and reach new students in my area.',
        highlight: '🏢 Complete business solution',
      },
    ]"
  />

  <LandingComparison
    title="Why Choose WeDance?"
    description="See how WeDance compares to platforms you might be using today"
    :items="[
      {
        icon: 'ph:instagram-logo',
        title: 'vs Instagram',
        description:
          'Better reach and direct student engagement vs social media algorithms',
        link: '/vs/instagram',
      },
      {
        icon: 'ph:student',
        title: 'vs Skool',
        description: 'Dance-specific features vs general course platform',
        link: '/vs/skool',
      },
      {
        icon: 'ph:ticket',
        title: 'vs TicketTailor',
        description: 'Specialized dance event tools vs generic ticketing',
        link: '/vs/tickettailor',
      },
    ]"
  />

  <LandingGetStarted
    title="Be Among the First Artists"
    description="Join now and get exclusive founding member benefits"
    secondary="Founding Member Benefits"
    secondaryLink="/founding-members"
  />
</template>
