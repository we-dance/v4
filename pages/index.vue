<template>
  <LandingHero
    title="One Place for All Dance Events"
    description="Stop searching through WhatsApp, Telegram, and Facebook groups. Find all dance events, classes, and festivals in your city in one place. Join 3,000+ dancers who already found their community."
  />
  <LandingBenefits
    title="Your Dance Community Awaits"
    description="Join thousands of dancers, artists, and organizers making dance more accessible and connected"
  />
  <LandingCities
    title="Join Local Dance Communities"
    description="Connect with dancers in any city, join local groups, and get insider tips from the community. Your dance network, everywhere."
    muted
  />
  <LandingTestimonials
    title="Loved by the Community"
    description="Here's what our members say about WeDance"
  />
  <LandingHowItWorks
    title="Start Dancing Today"
    description="Join 3,000+ dancers who found their dance community with WeDance"
    :steps="[
      {
        number: 1,
        icon: 'ph:compass',
        title: 'Find Your Scene',
        description: 'Choose your city and dance styles - we\'ll show you what\'s happening tonight',
        colors: {
          from: 'fuchsia-500',
          to: 'accent'
        },
        shape: '40%_60%_60%_40%_/_70%_30%_70%_30%',
        rotate: 'rotate-6'
      },
      {
        number: 2,
        icon: 'ph:users-three',
        title: 'Meet Dancers',
        description: 'Join local groups, find dance buddies, and plan festival trips together',
        colors: {
          from: 'purple-500',
          to: 'accent'
        },
        shape: '60%_40%_30%_70%_/_30%_30%_70%_70%',
        rotate: '-rotate-6'
      },
      {
        number: 3,
        icon: 'ph:calendar-check',
        title: 'Join Events',
        description: 'Book classes, attend socials, and experience amazing festivals',
        colors: {
          from: 'orange-500',
          to: 'accent'
        },
        shape: '40%_60%_30%_70%_/_60%_30%_70%_40%',
        rotate: 'rotate-6'
      },
      {
        number: 4,
        icon: 'ph:heart-fill',
        title: 'Fall in Love',
        description: 'With the dance, the music, the community, and the lifestyle',
        colors: {
          from: 'pink-500',
          to: 'accent'
        },
        shape: '30%_70%_70%_30%_/_50%_50%_50%_50%',
        rotate: '-rotate-6'
      }
    ]"
  />
  <LandingGetStarted
    title="Ready to join the community?"
    description="Start your dance journey today and connect with dancers worldwide"
  />
</template>
