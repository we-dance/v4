<!-- BookingDialog.vue -->
<template>
  <DialogHeader>
    <DialogTitle>Book {{ venue.name }}</DialogTitle>
    <DialogDescription> Select your booking options below </DialogDescription>
  </DialogHeader>

  <div class="space-y-6 py-4">
    <!-- Booking Type Selection -->
    <div class="space-y-2">
      <Label>Booking Type</Label>
      <Select v-model="bookingType">
        <SelectTrigger>
          <SelectValue placeholder="Select booking type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="area">Single Area</SelectItem>
          <SelectItem value="full">Full Venue</SelectItem>
          <SelectItem value="package">Package</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Area Selection (for single area booking) -->
    <div v-if="bookingType === 'area'" class="space-y-2">
      <Label>Select Area</Label>
      <Select v-model="selectedAreaId">
        <SelectTrigger>
          <SelectValue placeholder="Select an area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="area in venue.areas"
            :key="area.id"
            :value="area.id"
          >
            {{ area.name }} (Capacity: {{ area.capacity }})
          </SelectItem>
        </SelectContent>
      </Select>

      <div v-if="selectedArea" class="mt-4 space-y-4">
        <!-- Area Details -->
        <div class="rounded-lg bg-muted p-4">
          <p class="font-medium">{{ selectedArea.description }}</p>
          <ul class="mt-2 text-sm">
            <li>Minimum booking: {{ selectedArea.minimumBookingTime }}h</li>
            <li>Setup time: {{ selectedArea.setupTimeRequired }}min</li>
            <li>Cleanup time: {{ selectedArea.cleanupTimeRequired }}min</li>
          </ul>
        </div>

        <!-- Equipment Selection -->
        <div v-if="selectedArea.equipment?.length" class="space-y-2">
          <Label>Additional Equipment</Label>
          <div class="space-y-2">
            <div
              v-for="item in selectedArea.equipment"
              :key="item.id"
              class="flex items-center space-x-2"
            >
              <Checkbox :id="item.id" v-model="selectedEquipment[item.id]" />
              <Label :for="item.id">
                {{ item.name }} (€{{ item.pricePerHour }}/hour)
              </Label>
            </div>
          </div>
        </div>

        <!-- Storage Options -->
        <div v-if="selectedArea.storage?.length" class="space-y-2">
          <Label>Storage Options</Label>
          <div class="space-y-2">
            <div
              v-for="item in selectedArea.storage"
              :key="item.id"
              class="flex items-center space-x-2"
            >
              <Checkbox :id="item.id" v-model="selectedStorage[item.id]" />
              <Label :for="item.id">
                {{ item.name }} - {{ item.size }} (€{{
                  item.pricePerMonth
                }}/month)
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Package Selection -->
    <div v-if="bookingType === 'package'" class="space-y-2">
      <Label>Select Package</Label>
      <Select v-model="selectedPackageId">
        <SelectTrigger>
          <SelectValue placeholder="Select a package" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="pkg in venue.packages"
            :key="pkg.id"
            :value="pkg.id"
          >
            {{ pkg.name }} (€{{ pkg.price }})
          </SelectItem>
        </SelectContent>
      </Select>

      <div v-if="selectedPackage" class="mt-4 rounded-lg bg-muted p-4">
        <p class="font-medium">{{ selectedPackage.description }}</p>
        <p class="mt-2 text-sm">Duration: {{ selectedPackage.duration }}</p>
        <p class="text-sm">
          Minimum bookings: {{ selectedPackage.minimumBookings }}
        </p>
      </div>
    </div>

    <!-- Full Venue Booking -->
    <div v-if="bookingType === 'full'" class="space-y-2">
      <div class="rounded-lg bg-muted p-4">
        <p class="font-medium">Full Venue Pricing:</p>
        <ul class="mt-2 text-sm">
          <li>Hourly: €{{ venue.fullVenuePricing.hourly }}</li>
          <li>Daily: €{{ venue.fullVenuePricing.daily }}</li>
          <li>Weekly: €{{ venue.fullVenuePricing.weekly }}</li>
        </ul>
      </div>
    </div>

    <!-- Services Selection -->
    <div v-if="venue.services?.length" class="space-y-2">
      <Label>Additional Services</Label>
      <div class="space-y-2">
        <div
          v-for="service in venue.services"
          :key="service.id"
          class="flex items-center space-x-2"
        >
          <Checkbox :id="service.id" v-model="selectedServices[service.id]" />
          <Label :for="service.id">
            {{ service.name }} - {{ service.description }} (€{{
              service.price
            }}/{{ service.type === "per_hour" ? "hour" : "event" }})
          </Label>
        </div>
      </div>
    </div>

    <!-- Date and Time Selection -->
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="space-y-2">
        <Label>Date</Label>
        <Input type="date" v-model="bookingDate" />
      </div>
      <div class="space-y-2">
        <Label>Time</Label>
        <Input type="time" v-model="bookingTime" />
      </div>
      <div class="space-y-2">
        <Label>Duration (hours)</Label>
        <Input
          type="number"
          v-model="duration"
          :min="selectedArea?.minimumBookingTime || 1"
          step="0.5"
        />
      </div>
    </div>

    <!-- Insurance Option -->
    <div v-if="insuranceRequired" class="rounded-lg bg-muted p-4">
      <div class="flex items-start space-x-2">
        <Checkbox
          id="insurance"
          v-model="includeInsurance"
          :disabled="insuranceRequired"
        />
        <div>
          <Label for="insurance">Event Insurance</Label>
          <p class="text-sm text-muted-foreground">
            {{
              insuranceRequired
                ? "Required for this booking"
                : "Optional insurance coverage"
            }}
            (€{{ insurancePrice }}/event)
          </p>
        </div>
      </div>
    </div>

    <!-- Price Calculation -->
    <div class="rounded-lg bg-muted p-4">
      <h3 class="font-medium">Total Price Breakdown</h3>
      <div class="mt-2 space-y-1 text-sm">
        <p v-if="basePrice">Base Price: €{{ basePrice }}</p>
        <p v-if="equipmentPrice">Equipment: €{{ equipmentPrice }}</p>
        <p v-if="servicesPrice">Services: €{{ servicesPrice }}</p>
        <p v-if="insurancePrice && includeInsurance">
          Insurance: €{{ insurancePrice }}
        </p>
        <div class="mt-2 pt-2 border-t">
          <p class="font-medium">Total: €{{ totalPrice }}</p>
        </div>
      </div>
    </div>
  </div>

  <DialogFooter>
    <Button @click="closeDialog">Cancel</Button>
    <Button
      variant="default"
      :disabled="!isValidBooking"
      @click="handleBooking"
    >
      Confirm Booking
    </Button>
  </DialogFooter>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Venue, Area, Package } from "@/types";

const props = defineProps<{
  venue: Venue;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  book: [booking: any];
}>();

// Form state
const bookingType = ref<"area" | "full" | "package">("area");
const selectedAreaId = ref<number>();
const selectedPackageId = ref<string>();
const selectedEquipment = ref<Record<string, boolean>>({});
const selectedStorage = ref<Record<string, boolean>>({});
const selectedServices = ref<Record<string, boolean>>({});
const bookingDate = ref("");
const bookingTime = ref("");
const duration = ref(1);
const includeInsurance = ref(false);

// Computed properties
const selectedArea = computed(() =>
  props.venue.areas.find((a) => a.id === selectedAreaId.value)
);

const selectedPackage = computed(() =>
  props.venue.packages?.find((p) => p.id === selectedPackageId.value)
);

const insuranceRequired = computed(() => {
  if (bookingType.value === "area") {
    return selectedArea.value?.policies.insurance.required;
  }
  return false;
});

const insurancePrice = computed(() => {
  if (bookingType.value === "area" && selectedArea.value) {
    return selectedArea.value.policies.insurance.pricePerEvent;
  }
  return 0;
});

// Price calculations
const basePrice = computed(() => {
  if (bookingType.value === "package" && selectedPackage.value) {
    return selectedPackage.value.price;
  }
  if (bookingType.value === "full") {
    return props.venue.fullVenuePricing.hourly * duration.value;
  }
  if (selectedArea.value) {
    return selectedArea.value.pricing.hourly * duration.value;
  }
  return 0;
});

const equipmentPrice = computed(() => {
  if (!selectedArea.value?.equipment) return 0;
  return Object.entries(selectedEquipment.value)
    .filter(([, selected]) => selected)
    .reduce((total, [id]) => {
      const equipment = selectedArea.value?.equipment.find((e) => e.id === id);
      return total + (equipment ? equipment.pricePerHour * duration.value : 0);
    }, 0);
});

const servicesPrice = computed(() => {
  if (!props.venue.services) return 0;
  return Object.entries(selectedServices.value)
    .filter(([, selected]) => selected)
    .reduce((total, [id]) => {
      const service = props.venue.services?.find((s) => s.id === id);
      if (!service) return total;
      return (
        total +
        (service.type === "per_hour"
          ? service.price * duration.value
          : service.price)
      );
    }, 0);
});

const totalPrice = computed(
  () =>
    basePrice.value +
    equipmentPrice.value +
    servicesPrice.value +
    (includeInsurance.value ? insurancePrice.value : 0)
);

const isValidBooking = computed(() => {
  if (!bookingDate.value || !bookingTime.value || !duration.value) return false;

  if (bookingType.value === "area" && !selectedAreaId.value) return false;
  if (bookingType.value === "package" && !selectedPackageId.value) return false;

  if (insuranceRequired.value && !includeInsurance.value) return false;

  return true;
});

// Methods
const closeDialog = () => {
  emit("update:open", false);
};

const handleBooking = () => {
  const booking = {
    venueId: props.venue.id,
    type: bookingType.value,
    areaId: selectedAreaId.value,
    packageId: selectedPackageId.value,
    equipment: selectedEquipment.value,
    storage: selectedStorage.value,
    services: selectedServices.value,
    date: bookingDate.value,
    time: bookingTime.value,
    duration: duration.value,
    insurance: includeInsurance.value,
    totalPrice: totalPrice.value,
  };

  emit("book", booking);
  closeDialog();
};
</script>
