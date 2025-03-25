<template>
  <LandingHeroFeatures
    badge="Early Access"
    badgeIcon="ph:sparkle"
    title="Your Dance Journey Starts Here"
    description="Join our global dance community. Find events, connect with partners, and discover your local dance scene."
    primaryText="Join Early Access"
    primaryLink="/register"
    secondaryText="How It Works"
    secondaryLink="/events/1"
    :features="[
      { icon: 'ph:check-circle', text: '5-minute setup' },
      { icon: 'ph:crown', text: 'Early Bird Customer Benefits' },
      { icon: 'ph:star', text: 'First month free' },
    ]"
    :cards="[
      {
        icon: 'ph:calendar',
        title: 'Event Discovery',
        description: 'Find dance events, classes, and festivals near you',
      },
      {
        icon: 'ph:users-three',
        title: 'Partner Finding',
        description: 'Connect with dance partners for events and practice',
      },
      {
        icon: 'ph:map-pin',
        title: 'Local Community',
        description: 'Join your city\'s dance scene and meet new friends',
      },
      {
        icon: 'ph:star',
        title: 'Premium Features',
        description: 'Access advanced tools to enhance your dance journey',
      },
    ]"
  />

  <LandingPricing
    title="Simple & Transparent Pricing"
    description="Most features are free. Upgrade for premium benefits."
    :plans="[
      {
        icon: 'ph:star',
        title: 'Premium Membership',
        features: [
          'Advanced partner matching',
          'Priority event notifications',
          'Exclusive community features',
        ],
        price: '€9.99',
        unit: 'per month',
      },
    ]"
    footer="All basic features are free forever. Premium features help support the platform and enhance your experience."
  />

  <LandingTools
    title="Everything You Need"
    description="Tools and features designed for dancers"
    :tools="[
      {
        icon: 'ph:calendar',
        title: 'Event Calendar',
        description:
          'Never miss a dance event with personalized recommendations',
      },
      {
        icon: 'ph:users-three',
        title: 'Partner Matching',
        description:
          'Find dance partners based on style, level, and availability',
      },
      {
        icon: 'ph:map-pin',
        title: 'City Groups',
        description: 'Connect with your local dance community',
      },
      {
        icon: 'ph:chat-circle',
        title: 'Community Forum',
        description: 'Share experiences and get advice from fellow dancers',
      },
      {
        icon: 'ph:book',
        title: 'Dance Journal',
        description: 'Track your progress and dance experiences',
      },
      {
        icon: 'ph:bell',
        title: 'Smart Notifications',
        description: 'Get alerts for events and partner requests',
      },
    ]"
  />

  <LandingTestimonials
    title="Join Our Community"
    description="See what dancers love about WeDance"
    :testimonials="[
      {
        title: 'For Social Dancers',
        subtitle: 'Event Discovery',
        quote:
          'I love how easy it is to find dance events and connect with the community. The partner finding feature is a game-changer!',
        highlight: '🎵 Active social life',
      },
      {
        title: 'For Dance Students',
        subtitle: 'Learning Journey',
        quote:
          'WeDance helps me find great classes and keep track of my progress. The community is so supportive and welcoming.',
        highlight: '🎓 Continuous learning',
      },
      {
        title: 'For Dance Enthusiasts',
        subtitle: 'Community Connection',
        quote:
          'Finally, a platform that brings together all aspects of dance life. From finding events to meeting dance partners, it\'s all here.',
        highlight: '🌟 Vibrant community',
      },
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
        link: '/vs/whatsapp',
      },
      {
        icon: 'ph:chat-circle',
        title: 'vs Facebook Groups',
        description: 'Dedicated dance platform vs general social network',
        link: '/vs/facebook',
      },
      {
        icon: 'ph:globe',
        title: 'vs Dance Forums',
        description: 'Modern community features vs outdated forums',
        link: '/vs/salsaforums',
      },
    ]"
  />

  <LandingGetStarted
    title="Ready to Start Your Dance Journey?"
    description="Join thousands of dancers in your city"
    secondary="Early Bird Customer Benefits"
    secondaryLink="/founding-members"
  />
</template>
