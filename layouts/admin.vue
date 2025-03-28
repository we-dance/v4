<script setup>
const route = useRoute()
const { signOut } = useAppAuth()
const isCollapsed = ref(false)
const expandedItems = ref([])

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleSubMenu = (itemTo) => {
  const index = expandedItems.value.indexOf(itemTo)
  if (index === -1) {
    expandedItems.value.push(itemTo)
  } else {
    expandedItems.value.splice(index, 1)
  }
}

const isActiveParent = (item) => {
  if (!item.children) return route.path === item.to
  return item.children.some(child => route.path === child.to)
}

const navigationItems = [
  { 
    to: '/admin', 
    label: 'Dashboard', 
    icon: 'lucide:layout-dashboard'
  },
  { 
    to: '/admin/courses', 
    label: 'Courses', 
    icon: 'lucide:book-open',
    children: [
      { to: '/admin/courses/list', label: 'All Courses', icon: 'lucide:list' },
      { to: '/admin/courses/create', label: 'Create Course', icon: 'lucide:plus-circle' },
      { to: '/admin/courses/edit', label: 'Edit Course', icon: 'lucide:pencil' },
      { to: '/admin/courses/reviews', label: 'Course Reviews & Ratings', icon: 'lucide:star' },
      { to: '/admin/courses/analytics', label: 'Analytics', icon: 'lucide:bar-chart' },
      { to: '/admin/courses/videos', label: 'Video Uploads', icon: 'lucide:video' },
      { to: '/admin/courses/drafts', label: 'Drafts vs Published', icon: 'lucide:file-edit' }
    ]
  },
  { 
    to: '/admin/artists', 
    label: 'Artists / Instructors', 
    icon: 'lucide:users',
    children: [
      { to: '/admin/artists/list', label: 'All Artists', icon: 'lucide:list' },
      { to: '/admin/artists/applications', label: 'Instructor Applications', icon: 'lucide:clipboard-check' },
      { to: '/admin/artists/performance', label: 'Performance Metrics', icon: 'lucide:trending-up' },
      { to: '/admin/artists/payouts', label: 'Payout History', icon: 'lucide:wallet' }
    ]
  },
  { 
    to: '/admin/events', 
    label: 'Events', 
    icon: 'lucide:calendar',
    children: [
      { to: '/admin/events/list', label: 'All Events', icon: 'lucide:list' },
      { to: '/admin/events/create', label: 'Create Event', icon: 'lucide:plus-circle' },
      { to: '/admin/events/rsvps', label: 'Manage RSVPs & Guest List', icon: 'lucide:users' },
      { to: '/admin/events/venues', label: 'Venue Mapping', icon: 'lucide:map-pin' },
      { to: '/admin/events/promotions', label: 'Promotions & Featured', icon: 'lucide:star' }
    ]
  },
  { 
    to: '/admin/bookings', 
    label: 'Bookings', 
    icon: 'lucide:ticket',
    children: [
      { to: '/admin/bookings/classes', label: 'Class Bookings', icon: 'lucide:book-open' },
      { to: '/admin/bookings/festivals', label: 'Festival & Workshop Tickets', icon: 'lucide:ticket' },
      { to: '/admin/bookings/status', label: 'Booking Status & Refunds', icon: 'lucide:refresh-cw' },
      { to: '/admin/bookings/calendar', label: 'Calendar View', icon: 'lucide:calendar' }
    ]
  },
  { 
    to: '/admin/payments', 
    label: 'Payments', 
    icon: 'lucide:credit-card',
    children: [
      { to: '/admin/payments/payouts', label: 'Payout Settings', icon: 'lucide:wallet' },
      { to: '/admin/payments/transactions', label: 'Transactions Log', icon: 'lucide:history' },
      { to: '/admin/payments/commission', label: 'Commission & Fee Settings', icon: 'lucide:percent' },
      { to: '/admin/payments/promotions', label: 'Coupons / Promotions', icon: 'lucide:tag' },
      { to: '/admin/payments/sales', label: 'Sales by Course/Event/Artist', icon: 'lucide:trending-up' }
    ]
  },
  { 
    to: '/admin/users', 
    label: 'Users & Community', 
    icon: 'lucide:users-2',
    children: [
      { to: '/admin/users/directory', label: 'User Directory', icon: 'lucide:list' },
      { to: '/admin/users/roles', label: 'Role Management', icon: 'lucide:shield' },
      { to: '/admin/users/verification', label: 'Account Verification', icon: 'lucide:check-circle' },
      { to: '/admin/users/reports', label: 'Reports / Flagged Accounts', icon: 'lucide:flag' },
      { to: '/admin/users/support', label: 'Support Requests', icon: 'lucide:help-circle' }
    ]
  },
  { 
    to: '/admin/content', 
    label: 'Content', 
    icon: 'lucide:file-text',
    children: [
      { to: '/admin/content/posts', label: 'Posts & Blogs', icon: 'lucide:pen-tool' },
      { to: '/admin/content/qa', label: 'Ask the Locals Q&A', icon: 'lucide:message-circle' },
      { to: '/admin/content/reviews', label: 'Reviews', icon: 'lucide:star' },
      { to: '/admin/content/translations', label: 'Translations', icon: 'lucide:languages' }
    ]
  },
  { 
    to: '/admin/venues', 
    label: 'Venues & Locations', 
    icon: 'lucide:map-pin',
    children: [
      { to: '/admin/venues/list', label: 'City & Venue Listings', icon: 'lucide:list' },
      { to: '/admin/venues/maps', label: 'Map Pins Management', icon: 'lucide:map' },
      { to: '/admin/venues/calendars', label: 'Subscribe to City Calendars', icon: 'lucide:calendar' },
      { to: '/admin/venues/sync', label: 'Location Data Sync', icon: 'lucide:refresh-cw' }
    ]
  },
  { 
    to: '/admin/notifications', 
    label: 'Emails & Notifications', 
    icon: 'lucide:mail',
    children: [
      { to: '/admin/notifications/templates', label: 'Email Templates', icon: 'lucide:file-text' },
      { to: '/admin/notifications/sequences', label: 'Automated Sequences', icon: 'lucide:repeat' },
      { to: '/admin/notifications/newsletter', label: 'Newsletter Builder', icon: 'lucide:newspaper' }
    ]
  },
  { 
    to: '/admin/seo', 
    label: 'Search & SEO', 
    icon: 'lucide:search',
    children: [
      { to: '/admin/seo/tags', label: 'Custom SEO Tags', icon: 'lucide:tag' },
      { to: '/admin/seo/sitemap', label: 'Sitemap Generator', icon: 'lucide:sitemap' },
      { to: '/admin/seo/redirects', label: 'Redirects / Broken Links', icon: 'lucide:link' }
    ]
  },
  { 
    to: '/admin/analytics', 
    label: 'Analytics & Insights', 
    icon: 'lucide:bar-chart',
    children: [
      { to: '/admin/analytics/growth', label: 'User Growth Trends', icon: 'lucide:trending-up' },
      { to: '/admin/analytics/revenue', label: 'Revenue Breakdown', icon: 'lucide:dollar-sign' },
      { to: '/admin/analytics/content', label: 'Most Watched / Booked', icon: 'lucide:play-circle' },
      { to: '/admin/analytics/engagement', label: 'Engagement KPIs', icon: 'lucide:activity' }
    ]
  },
  { 
    to: '/admin/settings', 
    label: 'Platform Settings', 
    icon: 'lucide:settings',
    children: [
      { to: '/admin/settings/general', label: 'General Settings', icon: 'lucide:sliders' },
      { to: '/admin/settings/pricing', label: 'Pricing / Fees', icon: 'lucide:tag' },
      { to: '/admin/settings/legal', label: 'Terms, Privacy, Cookies', icon: 'lucide:file-text' },
      { to: '/admin/settings/locale', label: 'Locale Management', icon: 'lucide:globe' },
      { to: '/admin/settings/features', label: 'Feature Flags', icon: 'lucide:flag' }
    ]
  },
  { 
    to: '/admin/access', 
    label: 'Access Control', 
    icon: 'lucide:shield',
    children: [
      { to: '/admin/access/roles', label: 'Role Management', icon: 'lucide:users' },
      { to: '/admin/access/permissions', label: 'Permissions', icon: 'lucide:key' },
      { to: '/admin/access/audit', label: 'Audit Log', icon: 'lucide:history' }
    ]
  }
]

const handleSignOut = async () => {
  await signOut()
  navigateTo('/')
}

// Mock notification count - replace with actual count
const notificationCount = ref(3)
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside 
      class="min-h-screen bg-background border-r border-border transition-all duration-300"
      :class="[isCollapsed ? 'w-16' : 'w-64']"
    >
      <div class="h-16 flex items-center justify-between px-4 border-b border-border">
        <NuxtLink to="/" class="flex items-center gap-2">
          <WeDanceLogo class="h-10" />
        </NuxtLink>
        <Button 
          variant="ghost" 
          size="icon" 
          @click="toggleCollapse"
          class="hover:bg-accent/10"
        >
          <Icon 
            :name="isCollapsed ? 'lucide:chevron-right' : 'lucide:chevron-left'" 
            class="h-4 w-4" 
          />
        </Button>
      </div>
      <nav class="p-4">
        <div class="space-y-1">
          <template v-for="item in navigationItems" :key="item.to">
            <!-- Parent menu items with sub-menus -->
            <div v-if="item.children">
              <div
                class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer"
                :class="[
                  isActiveParent(item)
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  isCollapsed ? 'justify-center' : ''
                ]"
                @click="toggleSubMenu(item.to)"
              >
                <Icon :name="item.icon" class="h-4 w-4" />
                <span v-if="!isCollapsed" class="flex-1">{{ item.label }}</span>
                <Icon 
                  v-if="!isCollapsed" 
                  :name="expandedItems.includes(item.to) ? 'lucide:chevron-down' : 'lucide:chevron-right'" 
                  class="h-4 w-4" 
                />
              </div>
              <!-- Sub-menu items -->
              <div 
                v-if="expandedItems.includes(item.to) && !isCollapsed"
                class="ml-4 mt-1 space-y-1"
              >
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
                  :class="[
                    route.path === child.to
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  ]"
                >
                  <Icon :name="child.icon" class="h-4 w-4" />
                  <span class="flex-1">{{ child.label }}</span>
                </NuxtLink>
              </div>
            </div>

            <!-- Single menu items without sub-menus -->
            <NuxtLink
              v-else
              :to="item.to"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
              :class="[
                route.path === item.to
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                isCollapsed ? 'justify-center' : ''
              ]"
            >
              <Icon :name="item.icon" class="h-4 w-4" />
              <span v-if="!isCollapsed" class="flex-1">{{ item.label }}</span>
            </NuxtLink>
          </template>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="h-16 border-b border-border bg-background/80 backdrop-blur-sm">
        <div class="h-full flex items-center justify-end px-6 gap-4">
          <div class="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              class="relative"
              aria-label="View notifications"
            >
              <Icon name="lucide:bell" class="h-5 w-5" />
              <span
                v-if="notificationCount > 0"
                class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
              >
                {{ notificationCount }}
              </span>
            </Button>
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <div class="max-w-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
