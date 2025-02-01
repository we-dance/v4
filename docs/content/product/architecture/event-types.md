# Event Types

## Multi-Day Events

- Congresses (4-7 days):

  - Largest events (500+ participants)
  - Multiple venues (hotels, clubs)
  - 20+ international artists
  - Parallel workshops (10+ rooms)
  - Evening shows
  - Multiple parties per night
  - Vendor area
  - Open to all levels
  - Example: Berlin Salsa Congress, Paris International Salsa Congress

- Festivals (2-4 days):

  - Mid-size events (100-500 participants)
  - Main venue + parties
  - 5-10 artists
  - Focused workshop program
  - Evening shows
  - Main party each night
  - Usually style-specific
  - Example: Cuban Salsa Festival, Timba Festival

- Weekenders (2-3 days):

  - Intimate events (50-200 participants)
  - Single venue (hotel/resort)
  - Few selected artists (2-5)
  - Focused on social dancing
  - Usually level-specific
  - Example: London Cuban Weekender

- Bootcamps (2-5 days):

  - Training events (20-50 participants)
  - Training facility
  - 1-3 instructors
  - Intensive learning
  - Specific technique focus
  - Level requirements
  - Example: Ladies Styling Bootcamp

- Marathons (2-3 days):

  - Focused on social dancing only
  - Limited participants (50-150)
  - No workshops/classes
  - Balanced leads/follows
  - Pre-selected experienced dancers
  - Non-stop dancing (day and night)
  - Example: Amsterdam Cuban Marathon

## Single-Day Events

- Socials (parties):

  - Regular parties
  - Open air socials
  - Beach parties
  - Holiday specials
  - Example: Friday Cuban Party

- Workshops:

  - 1-2 hour classes
  - Single topic focus
  - Open level or specific level
  - Example: Cuban Style Basics

- Master Classes:

  - Single intensive class (2-4 hours)
  - Taught by renowned artist
  - Usually level-specific
  - Limited spots
  - Special technique focus
  - Example: Maykel Fonts Master Class

- Intensives:

  - Full day training (4-8 hours)
  - Deep focus on specific element
  - Usually part of regular training
  - Limited spots
  - Example: Body Movement Intensive

- Shows & Showcases:

  - Student performances
  - Professional shows
  - Dance company showcases
  - End of course presentations
  - Example: Dance School Annual Show

- Competitions:

  - Dance contests
  - Battles
  - Championships
  - Amateur/Pro divisions
  - Example: Salsa Open

## Regular Events

- Weekly Classes:

  - Drop-in classes
  - Fixed schedule
  - Pay per class
  - Example: "Tuesday Beginner Salsa"

- Courses:

  - Fixed-term programs (4-12 weeks)
  - Progressive curriculum
  - Same group of students
  - Regular schedule (weekly)
  - Pre-registration required
  - Example: "Beginner Course Level 1"

- Practice Sessions (Practicas):

  - Guided practice
  - Training exchanges
  - Technique drills
  - Supervised practice
  - Example: "Sunday Practice Session"

## Online Classes

- Live group classes
- Live workshops

# Event Schema Documentation

## Schema Organization

The event schema is organized into several types to handle different kinds of events:

- Workshop Events
- Festival Events
- Concert Events
- Party Events

## Completed Steps ✅

1. Schema alignment with mock data structure
2. Schema organization and type definitions
3. Price handling standardization across components
   - Added festival type support
   - Fixed free event detection
   - Implemented currency conversion
   - Unified price display logic

## Remaining Steps

1. Component Updates

   - Update event creation form
   - Add validation for event fields
   - Implement event editing functionality
   - Add event deletion confirmation

2. Data Layer Migration

   - Move from mock data to API endpoints
   - Implement proper error handling
   - Add loading states
   - Cache frequently accessed data

3. Schema.org Alignment
   - Review schema.org Event standards
   - Implement required properties
   - Add recommended properties
   - Validate against schema.org requirements
