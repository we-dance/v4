<template>
  <div>
    <LandingIntro
      title="WeDance vs Others"
      description="See how WeDance compares to other platforms and why it's the best choice for dancers"
    />

    <LandingComparison
      title="Why Choose WeDance?"
      description="See how WeDance compares to platforms you might be using today"
      :items="[
        {
          icon: 'ph:instagram-logo',
          title: 'vs Instagram',
          description: 'Dance-focused platform vs social media',
          link: '/vs/instagram',
        },
        {
          icon: 'ph:chat-circle-text',
          title: 'vs WhatsApp',
          description: 'Organized dance community vs chat groups',
          link: '/vs/whatsapp',
        },
        {
          icon: 'ph:calendar-check',
          title: 'vs Fitogram',
          description: 'Dance studio management and class booking',
          link: '/vs/fitogram',
        },
        {
          icon: 'ph:ticket',
          title: 'vs TicketTailor',
          description: 'Dance-focused event platform vs generic ticketing',
          link: '/vs/tickettailor',
        },
        {
          icon: 'ph:student',
          title: 'vs Skool',
          description: 'Dance education and community platform',
          link: '/vs/skool',
        },
        {
          icon: 'ph:chats-circle',
          title: 'vs SalsaForums',
          description: 'Modern community features vs traditional forums',
          link: '/vs/salsaforums',
        },
        {
          icon: 'ph:reddit-logo',
          title: 'vs Reddit',
          description: 'Dedicated dance platform vs general discussion',
          link: '/vs/reddit',
        },
        {
          icon: 'ph:globe',
          title: 'vs Own Website',
          description: 'All-in-one platform vs custom development',
          link: '/vs/website',
        },
      ]"
    />

    <LandingGetStarted
      title="Ready to Join WeDance?"
      description="Experience the best platform built specifically for dancers"
      secondary="Founding Member Benefits"
      secondaryLink="/founding-members"
    />
  </div>
</template>
