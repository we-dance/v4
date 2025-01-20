# Venues

## Why

Based on analysis of real dance events and venue booking needs:

1. **Complex Event Requirements**

   - Dance festivals need multiple rooms with different floor types
   - Workshops require specific room sizes and capacities
   - Performance events need additional services (sound, lighting)
   - Multi-day events need storage and flexible access

2. **Diverse Pricing Scenarios**

   - Regular classes need affordable hourly rates
   - Weekend workshops need package deals
   - Festivals need weekly rates with discounts
   - Resident teachers need monthly options

3. **Resource Management**

   - Sound systems are shared between rooms
   - Storage space is limited and needs allocation
   - Setup/cleanup times overlap between bookings
   - Staff availability affects booking options

4. **Business Rules**
   - Insurance requirements vary by event type
   - Cancellation policies depend on booking size
   - Damage deposits scale with event duration
   - Minimum booking times vary by area

## Overview

We are extending the venue management system to provide a more comprehensive solution for dance studio and event space bookings.

## Goals

1. **Enhanced Venue Details**

   - Detailed area information (capacity, size, amenities)
   - Floor type specifications
   - Equipment and facilities list
   - Image galleries

2. **Flexible Pricing Models**

   - Hourly rates
   - Daily rates
   - Weekly rates
   - Monthly rates (optional)
   - Package deals
   - Special event pricing

3. **Service Add-ons**

   - Sound engineer
   - Staff assistance
   - Cleaning services
   - Equipment rental

4. **Booking Management**

   - Minimum booking time
   - Setup/cleanup time requirements
   - Availability calendar
   - Real-time slot booking
   - Multiple areas booking

5. **Storage & Equipment**

   - Storage options for regular clients
   - Equipment rental with availability tracking
   - Professional sound system options

6. **Policies**
   - Cancellation policies
   - Insurance requirements
   - Damage deposits
   - Usage restrictions

## Implementation Details

### Data Structure

We're extending the base `Area` and `Venue` types with dialog-specific interfaces:

```typescript
interface DialogArea extends Omit<Area, "pricing"> {
  pricing: {
    hourly: number;
    daily: number;
    weekly: number;
    monthly?: number;
  };
  availability: {
    [key: string]: string | null; // days of week -> hours string or null if closed
  };
}

interface DialogVenue extends Pick<Venue, "id" | "name"> {
  areas: DialogArea[];
}
```

### Components

1. **VenueAreaDetailsDialog**

   - Displays comprehensive area information
   - Shows availability calendar
   - Handles booking requests

2. **VenueBookingDialog**
   - Date and time slot selection
   - Area selection
   - Service add-ons
   - Price calculation

## Current Status

- Implementing dialog interfaces
- Updating components to handle new data structure
- Working on type compatibility between base and dialog interfaces
- Adding validation for booking requirements
