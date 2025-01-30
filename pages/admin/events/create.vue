<template>
  <div class="container py-6 space-y-6">
    <div class="flex items-center gap-4">
      <Button variant="ghost" asChild>
        <NuxtLink to="/admin/events">
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          Back
        </NuxtLink>
      </Button>
      <h1 class="text-3xl font-bold">Create Event</h1>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Event Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class">Class</SelectItem>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Enter event title" />
          </div>

          <div class="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe your event" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Schedule Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select schedule type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">One-time Event</SelectItem>
                <SelectItem value="recurring">Recurring Event</SelectItem>
                <SelectItem value="self-paced">Self-paced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label>Location Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="venue">Physical Venue</SelectItem>
                <SelectItem value="online">Online (Zoom)</SelectItem>
                <SelectItem value="recorded">Pre-recorded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Pricing Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select pricing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Price</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="donation">Donation Based</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label>Price (€)</Label>
            <Input type="number" placeholder="0.00" />
          </div>

          <div class="space-y-2">
            <Label>Capacity</Label>
            <Input type="number" placeholder="Maximum number of attendees" />
          </div>
        </CardContent>
      </Card>

      <div class="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <NuxtLink to="/admin/events">Cancel</NuxtLink>
        </Button>
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const onSubmit = () => {
  // TODO: Implement event creation
};
</script>
