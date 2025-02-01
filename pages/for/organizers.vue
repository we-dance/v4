<template>
  <LandingHeroFeatures
    badge="Early Access"
    badgeIcon="ph:sparkle"
    title="The Future of Event Management"
    description="Be among the first organizers to join our platform. Create events, sell tickets, and grow your dance business globally."
    primaryText="Join Early Access"
    primaryLink="/register"
    secondaryText="How It Works"
    secondaryLink="/events/200"
    :features="[
      { icon: 'ph:check-circle', text: '5-minute setup' },
      { icon: 'ph:crown', text: 'Founding member benefits' },
      { icon: 'ph:star', text: 'First month free' },
    ]"
    :cards="[
      {
        icon: 'ph:ticket',
        title: 'Event Ticketing',
        description: 'Sell tickets online with automated processing',
      },
      {
        icon: 'ph:users-three',
        title: 'Attendee Management',
        description: 'Handle registrations and check-ins efficiently',
      },
      {
        icon: 'ph:chart-line',
        title: 'Event Analytics',
        description: 'Track sales, attendance, and engagement metrics',
      },
      {
        icon: 'ph:storefront',
        title: 'Marketing Tools',
        description: 'Promote events and reach your target audience',
      },
    ]"
  />

  <LandingPricing
    title="Simple & Transparent Pricing"
    description="No hidden fees. No monthly charges. Only pay when you sell tickets."
    :plans="[
      {
        icon: 'ph:ticket',
        title: 'Event Tickets',
        features: [
          'Create unlimited events',
          'Set your own prices',
          'Global reach',
        ],
        price: '€0.25',
        unit: 'per ticket',
      },
      {
        icon: 'ph:users-three',
        title: 'Resource Booking',
        features: [
          'Book venues, teachers, DJs, and manage your resources',
          'Automatic contracts',
          'Secure payments',
        ],
        price: '5%',
        unit: 'per booking',
      },
      {
        icon: 'ph:megaphone',
        title: 'Community Referrals',
        features: ['Reward promoters', 'Grow attendance', 'Track referrals'],
        price: '10%',
        unit: 'to promoters',
      },
    ]"
    footer="All fees include payment processing, hosting, and platform tools. Get paid directly to your bank account every week."
  />

  <LandingTools
    title="All-in-One Platform"
    description="Everything you need to run successful dance events"
    :tools="[
      {
        icon: 'ph:ticket',
        title: 'Ticketing System',
        description:
          'Professional ticketing with QR codes, multiple ticket types, and easy refunds',
      },
      {
        icon: 'ph:credit-card',
        title: 'Payment Processing',
        description:
          'Secure payments, automatic payouts, and financial reporting',
      },
      {
        icon: 'ph:users-three',
        title: 'Attendee Portal',
        description: 'Registration management, check-ins, and communication',
      },
      {
        icon: 'ph:calendar',
        title: 'Event Planning',
        description:
          'Schedule management, artist booking, and venue coordination',
      },
      {
        icon: 'ph:chart-line',
        title: 'Analytics Dashboard',
        description:
          'Sales tracking, attendance metrics, and performance insights',
      },
      {
        icon: 'ph:storefront',
        title: 'Marketing Suite',
        description:
          'Promotion tools, email campaigns, and social media integration',
      },
    ]"
  />

  <LandingTestimonials
    title="Join Our Vision"
    description="Be among the first organizers to shape the future of dance events"
    :testimonials="[
      {
        title: 'For Social Events',
        subtitle: 'Weekly Parties',
        quote:
          'The platform makes it so easy to manage our weekly socials. The ticketing system is smooth, and the analytics help us understand our audience better.',
        highlight: '🎟️ Effortless ticketing',
      },
      {
        title: 'For Workshops',
        subtitle: 'Dance Classes',
        quote:
          'Managing workshop registrations has never been easier. The communication tools help us stay connected with our students.',
        highlight: '👥 Simple registration',
      },
      {
        title: 'For Festivals',
        subtitle: 'Multi-day Events',
        quote:
          'Finally, a platform that understands the complexity of running dance festivals. The artist management and scheduling tools are game-changers.',
        highlight: '🎭 Complete event solution',
      },
    ]"
  />

  <LandingComparison
    title="Why Choose WeDance?"
    description="See how WeDance compares to platforms you might be using today"
    :items="[
      {
        icon: 'ph:ticket',
        title: 'vs TicketTailor',
        description: 'Dance-focused features vs generic ticketing platform',
        link: '/vs/tickettailor',
      },
      {
        icon: 'ph:whatsapp-logo',
        title: 'vs WhatsApp',
        description: 'Professional event tools vs chat groups',
        link: '/vs/whatsapp',
      },
      {
        icon: 'ph:calendar',
        title: 'vs Fitogram',
        description: 'Dance-specific scheduling vs general booking system',
        link: '/vs/fitogram',
      },
    ]"
  />

  <LandingGetStarted
    title="Be Among the First Organizers"
    description="Join now and get exclusive founding member benefits"
    secondary="Founding Member Benefits"
    secondaryLink="/founding-members"
  />
</template>
