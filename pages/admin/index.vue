<template>
  <div class="container py-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <Button asChild>
        <NuxtLink to="/admin/events/create"> Create Event </NuxtLink>
      </Button>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Events</CardTitle>
          <CardDescription>All your events</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-3xl font-bold">0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Bookings</CardTitle>
          <CardDescription>Across all events</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-3xl font-bold">0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Total earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-3xl font-bold">€0</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-muted-foreground">No events yet</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>
