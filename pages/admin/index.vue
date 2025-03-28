<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Icon name="lucide:download" class="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="lucide:calendar" class="mr-2 h-4 w-4" />
          Last 7 Days
        </Button>
      </div>
    </div>

    <!-- Core Summary Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <!-- Total Events -->
      <Card class="hover:bg-muted/50 transition-colors">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Events</CardTitle>
          <Icon name="lucide:calendar" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold">0</div>
            <div class="flex items-center text-xs text-green-500">
              <Icon name="lucide:trending-up" class="mr-1 h-3 w-3" />
              +0%
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-1">Published events</p>
          <Button variant="link" class="px-0 font-normal mt-2" asChild>
            <NuxtLink to="/admin/events/list" class="flex items-center">
              View all events
              <Icon name="lucide:arrow-right" class="ml-1 h-3 w-3" />
            </NuxtLink>
          </Button>
        </CardContent>
      </Card>

      <!-- Total Bookings -->
      <Card class="hover:bg-muted/50 transition-colors">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Bookings</CardTitle>
          <div class="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              class="h-8 w-8"
              :class="{ 'bg-muted': viewMode === 'week' }"
              @click="viewMode = 'week'"
            >
              <Icon name="lucide:calendar" class="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              class="h-8 w-8"
              :class="{ 'bg-muted': viewMode === 'month' }"
              @click="viewMode = 'month'"
            >
              <Icon name="lucide:bar-chart" class="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold">0</div>
            <div class="flex items-center text-xs text-green-500">
              <Icon name="lucide:trending-up" class="mr-1 h-3 w-3" />
              +0%
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-1">Across events and courses</p>
          <div class="mt-2 h-8 w-full rounded-full bg-muted">
            <!-- Placeholder for mini chart -->
          </div>
        </CardContent>
      </Card>

      <!-- Revenue Generated -->
      <Card class="hover:bg-muted/50 transition-colors">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Revenue Generated</CardTitle>
          <Icon name="lucide:dollar-sign" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold">€0</div>
            <div class="flex items-center text-xs text-green-500">
              <Icon name="lucide:trending-up" class="mr-1 h-3 w-3" />
              +0%
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-1">Gross revenue</p>
          <Button variant="link" class="px-0 font-normal mt-2" asChild>
            <NuxtLink to="/admin/payments/reports" class="flex items-center">
              View payouts/reporting
              <Icon name="lucide:arrow-right" class="ml-1 h-3 w-3" />
            </NuxtLink>
          </Button>
        </CardContent>
      </Card>

      <!-- Active Courses -->
      <Card class="hover:bg-muted/50 transition-colors">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Active Courses</CardTitle>
          <Icon name="lucide:book-open" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold">0</div>
            <div class="flex items-center text-xs text-green-500">
              <Icon name="lucide:trending-up" class="mr-1 h-3 w-3" />
              +0%
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-1">Live published courses</p>
          <Button variant="link" class="px-0 font-normal mt-2" asChild>
            <NuxtLink to="/admin/courses/list" class="flex items-center">
              Manage Courses
              <Icon name="lucide:arrow-right" class="ml-1 h-3 w-3" />
            </NuxtLink>
          </Button>
        </CardContent>
      </Card>

      <!-- New Signups -->
      <Card class="hover:bg-muted/50 transition-colors">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">New Signups</CardTitle>
          <Icon name="lucide:users" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold">0</div>
            <div class="flex items-center text-xs text-green-500">
              <Icon name="lucide:trending-up" class="mr-1 h-3 w-3" />
              +0%
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-1">Last 7 days</p>
          <Button variant="link" class="px-0 font-normal mt-2" asChild>
            <NuxtLink to="/admin/users/directory" class="flex items-center">
              View users
              <Icon name="lucide:arrow-right" class="ml-1 h-3 w-3" />
            </NuxtLink>
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Recent Activity -->
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="rounded-full bg-primary/10 p-2">
                <Icon name="lucide:bell" class="h-4 w-4 text-primary" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">No recent notifications</p>
                <p class="text-xs text-muted-foreground">You're all caught up!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Quick Actions -->
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-2">
            <Button variant="outline" class="w-full justify-start" asChild>
              <NuxtLink to="/admin/events/create">
                <Icon name="lucide:calendar" class="mr-2 h-4 w-4" />
                Create Event
              </NuxtLink>
            </Button>
            <Button variant="outline" class="w-full justify-start" asChild>
              <NuxtLink to="/admin/courses/create">
                <Icon name="lucide:book-open" class="mr-2 h-4 w-4" />
                Publish Course
              </NuxtLink>
            </Button>
            <Button variant="outline" class="w-full justify-start" asChild>
              <NuxtLink to="/admin/users/artists">
                <Icon name="lucide:user-plus" class="mr-2 h-4 w-4" />
                Add New Artist
              </NuxtLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const viewMode = ref<'week' | 'month'>('week')
</script>
