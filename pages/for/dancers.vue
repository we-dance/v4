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

  <LandingPricing
    title="Earning Opportunities"
    description="Multiple ways to earn from your dance influence. No hidden fees, no monthly charges."
    :plans="[
      {
        icon: 'ph:ticket',
        title: 'Event Tickets',
        features: [
          '10% commission on ticket sales',
          'Festival & workshop referrals',
          'Special event access'
        ],
        price: '10%',
        unit: 'per sale'
      },
      {
        icon: 'ph:graduation-cap',
        title: 'Class Packages',
        features: [
          '15% on first-time students',
          'Recurring commission',
          'Free class credits'
        ],
        price: '15%',
        unit: 'per student'
      },
      {
        icon: 'ph:storefront',
        title: 'Dance Services',
        features: [
          '20% on service bookings',
          'Partner referral bonus',
          'Exclusive service deals'
        ],
        price: '20%',
        unit: 'per booking'
      }
    ]"
    footer="All commissions are paid directly to your bank account every week. No minimum payout threshold."
  />

  <LandingHowItWorks
    title="How It Works"
    description="Three simple steps to start earning with your dance influence"
    :steps="[
      
      {
        number: 1,
        icon: 'ph:compass',
        title: 'Create Profile',
        description: 'Sign up and create your dancer profile. Share your dance styles, experience, and social media presence.',
        class: 'rounded-[40%_60%_60%_40%_/_70%_30%_70%_30%] hover:rotate-6 from-fuchsia-500 to-accent',
      },
      {
        number: 2,
        icon: 'ph:users-three',
        title: 'Share & Promote',
        description: 'Share events, classes, and services with your unique referral links on social media and with your network.',
        class: 'rounded-[30%_70%_70%_30%_/_50%_50%_50%_50%] hover:-rotate-6 from-purple-500 to-accent'
      },
      {
        number: 3,
        icon: 'ph:money',
        title: 'Earn Rewards',
        description: 'Earn commission when people book through your links. Get special perks as your influence grows.',
        class: 'rounded-[40%_60%_30%_70%_/_60%_30%_70%_40%] hover:rotate-6 from-orange-500 to-accent',
      },
    ]"
  />

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
