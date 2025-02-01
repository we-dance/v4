# Dance Styles

## Taxonomy Structure

Each dance style should be defined with:

1. **Canonical Name**: Main identifier for the style
2. **Aliases**: Alternative names or spellings
3. **Parent Style**: Broader category it belongs to
4. **Sub-styles**: Variations of the main style
5. **Related Styles**: Styles that share common elements
6. **Origin**: Geographic and cultural roots
7. **Key Characteristics**: Defining features

## Dance Styles vs Tags

### Core Differences

1. **Structure**

   - Dance Styles:
     - Hierarchical (parent/child relationships)
     - Strictly controlled vocabulary
     - Official URLs and routing
     - Part of main navigation
   - Tags:
     - Flat structure
     - User-generated
     - Flexible and evolving
     - Used for content discovery

2. **Purpose**
   - Dance Styles:
     - Community organization
     - Main navigation structure
     - Official categorization
     - Learning paths
     - Artist specializations
   - Tags:
     - Content discovery
     - Cross-referencing
     - Trending topics
     - User interests
     - Ad-hoc grouping

### Usage Guidelines

1. **When to Use Dance Styles**

   Use for:

   - Main community pages
   - Event categorization
   - Artist specializations
   - Course/class categorization
   - Directory structure

2. **When to Use Tags**

   Use for:

   - Specific moves or techniques
   - Music genres
   - Skill levels
   - Event types
   - Teaching concepts
   - Cultural aspects

3. **Combined Example**

   ```yaml
   Event:
     title: 'Rueda de Casino Workshop'
     style: 'salsa/cuban' # Primary categorization
     tags: # Additional context
       - beginner-friendly
       - rueda-basics
       - group-class
       - cuban-music
       - social-dancing

   Artist Profile:
     name: 'Maria Rodriguez'
     styles: # Main expertise
       - salsa/cuban
       - salsa/ny
     tags: # Specific skills
       - ladies-styling
       - body-movement
       - performance
       - choreography
   ```

### Best Practices

1. **Style References**

   - Always use canonical style paths
   - Link aliases to canonical styles
   - Maintain style hierarchy
   - Use for structural organization

2. **Tag Usage**

   - Use kebab-case formatting
   - Keep tags concise
   - Allow organic growth
   - Monitor popular tags
   - Merge similar tags

3. **Content Organization**

   - Every post must have a primary style
   - Tags are optional but encouraged
   - Use multiple tags for better discovery
   - Combine styles and tags for filtering

4. **Search and Discovery**
   - Search across both styles and tags
   - Show style-based navigation
   - Use tags for related content
   - Tag clouds for exploration

## Example: Salsa

### Canonical Structure

```yaml
name: Salsa
slug: salsa
aliases:
  - Mambo (in some contexts)
parent: Latin Dance
origin: Caribbean (Puerto Rico, Cuba, New York)
```

### Sub-styles

1. **Cuban Style**

   - Canonical: Salsa Cubana
   - Aliases:
     - Casino
     - Rueda de Casino
     - Cuban Casino
   - Origin: Cuba
   - Key Characteristics:
     - Circular movement
     - Strong African influence
     - Complex arm patterns
     - Often danced in Rueda formation

2. **Linear Style**

   - LA Style (On1)

     - Canonical: Salsa LA
     - Aliases:
       - On1
       - LA Style Salsa
     - Origin: Los Angeles, USA
     - Key Characteristics:
       - Linear movement
       - Theatrical performance style
       - Break on 1
       - Hollywood influence

   - NY Style (On2)
     - Canonical: Salsa NY
     - Aliases:
       - On2
       - Mambo Style
       - Eddie Torres Style
     - Origin: New York, USA
     - Key Characteristics:
       - Linear movement
       - Break on 2
       - Strong connection to mambo
       - More grounded movement

3. **Colombian Style**
   - Canonical: Salsa Caleña
   - Aliases:
     - Colombian Salsa
     - Cali Style
   - Origin: Cali, Colombia
   - Key Characteristics:
     - Fast footwork
     - Minimal upper body movement
     - Quick turns
     - Distinctive shines

### URL Structure

```yaml
# Main Style
/dance/salsa

# Sub-styles with redirects
/dance/salsa/cuban     → Salsa Cubana content
/dance/casino          → redirects to /dance/salsa/cuban
/dance/rueda           → redirects to /dance/salsa/cuban

/dance/salsa/la        → LA Style content
/dance/salsa-on1       → redirects to /dance/salsa/la

/dance/salsa/ny        → NY Style content
/dance/salsa-on2       → redirects to /dance/salsa/ny
/dance/mambo           → shows relation to /dance/salsa/ny

/dance/salsa/colombian → Colombian Style content
/dance/salsa-cali      → redirects to /dance/salsa/colombian
```

### Implementation Notes

1. **Style Pages**

   - Main style page shows overview of all variations
   - Sub-style pages focus on specific variation
   - Clear navigation between related styles
   - Style comparison tools

2. **Content Organization**

   - Events tagged with specific style
   - Artists can specify style specialties
   - Content can be tagged with multiple related styles
   - Search works across all style variations

3. **Community Features**

   - Style-specific forums
   - Cross-style discussions
   - Style fusion events
   - Multi-style artist profiles

4. **SEO Considerations**
   - Proper canonical URLs
   - Rich metadata for each style
   - Style relationship markup
   - Clear breadcrumb navigation
   - Style-specific keywords

## Communities and Styles

### Community Formation Patterns

1. **Style-Based Communities**

   ```yaml
   Example - Munich:
     Linear Salsa Community:
       - Main Style: Salsa NY (On2)
       - Regular Events:
           - Thursdays at Hakan's
       - Crossover: Often dance On1
       - Music Preference:
           - Classic Salsa Dura
           - Eddie Torres style music
           - More traditional arrangements

     Cuban Salsa Community:
       - Main Style: Salsa Cubana/Casino
       - Regular Events:
           - Saturdays at Megano
           - Events at Salsea
       - Music Preference:
           - Timba
           - Modern Cuban bands
           - More percussion-heavy
   ```

2. **Community Overlap**

   - Some venues attract multiple communities
   - Music selection often determines crowd
   - Teachers/organizers build their own communities
   - Events can be style-specific or mixed

3. **Implementation Strategy**

   ```yaml
   Venue:
     name: 'Megano'
     primary_styles:
       - salsa/cuban
     events:
       - type: 'party'
         day: 'Saturday'
         style: 'salsa/cuban'
         music_style: 'timba'

   Event:
     title: 'Thursday Salsa Social'
     style: 'salsa/ny'
     venue: "Hakan's"
     tags:
       - on2
       - salsa-dura
       - social-dancing

   Community:
     style: 'salsa/cuban'
     venues:
       - megano
       - salsea
     organizers:
       - megano_team
     events:
       - regular_parties
       - workshops
     music:
       - timba
       - cuban-salsa
   ```

4. **Content Organization**
   - Allow users to follow specific communities
   - Group content by style AND venue
   - Show related styles/venues
   - Respect community boundaries while enabling discovery

## Community-Specific Features

### Navigation Structure

1. **Style Pages**

   ```yaml
   /dance/salsa:
     overview: 'General salsa information'
     communities:
       - salsa/cuban
       - salsa/ny
       - salsa/la
     upcoming_events: 'All salsa events'

   /dance/salsa/cuban:
     overview: 'Cuban style specific'
     venues:
       - megano
       - salsea
     organizers: 'Cuban style teachers'
     events: 'Cuban style events'
     music: 'Timba and Cuban music'
   ```

2. **Venue Pages**
   ```yaml
   /venues/megano:
     primary_style: 'salsa/cuban'
     regular_events:
       - day: 'Saturday'
         style: 'salsa/cuban'
     community:
       - teachers
       - upcoming_events
       - photos
       - reviews
   ```

### Community Features

1. **Event Discovery**

   - Filter events by style AND venue
   - Show venue's typical crowd/style
   - Indicate music style played
   - Link to related communities

2. **User Preferences**

   ```yaml
   User Profile:
     primary_styles:
       - salsa/cuban
     venues:
       - megano
       - salsea
     music_preferences:
       - timba
       - cuban-salsa
     communities:
       - munich_casino
       - bavaria_salseros
   ```

3. **Content Targeting**

   - Style-specific news feeds
   - Venue-specific announcements
   - Community-specific events
   - Cross-community promotions

4. **Community Interaction**
   - Style-specific groups
   - Venue-specific chat
   - Community calendars
   - Joint events/festivals

### Implementation Guidelines

1. **Community Boundaries**

   - Respect style preferences
   - Show relevant content first
   - Enable cross-community discovery
   - Maintain separate spaces

2. **Content Organization**

   - Tag content with both style and venue
   - Allow multiple community associations
   - Enable cross-posting where appropriate
   - Preserve community context

3. **Search and Discovery**

   ```yaml
   Search Filters:
     style: 'salsa/cuban'
     venue: 'megano'
     music: 'timba'
     event_type: 'social'
     community: 'munich_casino'
   ```

4. **Community Growth**
   - Enable community creation
   - Support multiple affiliations
   - Facilitate cross-community events
   - Preserve community identity

## Page Structure

### Main Style Page (`/dance/salsa`)

```yaml
Layout:
  Hero:
    - Style name and brief intro
    - Quick navigation to sub-styles
    - Key statistics (total events, active communities)

  Communities Section:
    Title: 'Local Communities'
    Description: 'Active salsa communities in your area'
    Content:
      Munich Example:
        NY/On2 Community:
          - Regular Event: "Thursday Socials at Hakan's"
          - Music: Salsa Dura, Classic Salsa
          - Teachers/Organizers associated
          - Recent photos/videos

        Cuban Community:
          - Regular Event: 'Saturday Socials at Megano'
          - Additional Venue: Salsea
          - Music: Timba, Modern Cuban
          - Active organizers and teachers

  Events Calendar:
    - Visual calendar with style-color coding
    - Filters for style preferences
    - Venue-specific grouping
    - Music style indicators

  Learn Section:
    - Style comparison table
    - Basic descriptions
    - History and evolution
    - Links to detailed style pages

  Feed:
    - Mixed content from all sub-styles
    - Style-labeled content
    - Community-specific updates
    - Trending topics
```

### Sub-style Page (`/dance/salsa/cuban`)

```yaml
Layout:
  Hero:
    - Style-specific intro
    - Key characteristics
    - Music examples

  Local Scene:
    - Primary venues (Megano, Salsea)
    - Regular events
    - Active teachers
    - Practice groups

  Events:
    - Style-specific events
    - Workshops and courses
    - Special events/festivals

  Community:
    - Style-specific news
    - Photos and videos
    - Discussion topics
    - Learning resources
```

### Content Priority Rules

1. **Location-Based Content**

   ```yaml
   User in Munich:
     Primary Content:
       - Local communities first
       - Nearby events
       - Active local teachers
     Secondary:
       - Global content
       - Online resources
       - International events
   ```

2. **Style Preferences**

   ```yaml
   User follows Cuban Style:
     Primary Feed:
       - Cuban style events
       - Timba music posts
       - Related venues
     Secondary:
       - Other salsa styles
       - Fusion events
       - Cross-style socials
   ```

3. **Community Context**
   ```yaml
   Content Mixing Rules:
     - Keep style-specific content separate
     - Show cross-style events clearly labeled
     - Maintain community identity
     - Enable discovery of other styles
   ```

## Cross-Location Communities

### Festival & Travel Groups

```yaml
Example - Afro-Cuban Festivals:
  Type: WhatsApp Group
  Scope: International (German-based)
  Purpose:
    - Festival planning
    - Travel coordination
    - Accommodation sharing
    - Experience sharing

Discovery Points:
  1. Style Page (/dance/salsa/cuban):
     - "Festival Communities" section
     - Listed under "International Groups"

  2. Festivals Page (/events/festivals):
     - Style-specific community groups
     - Travel & planning resources

  3. Event Pages:
     - Related groups section
     - "Join festival community" CTA

  4. City Pages:
     - Under "International Connections"
     - Festival-related groups

Content Strategy:
  - List upcoming festivals
  - Show active members count
  - Preview recent discussions
  - Highlight success stories
  - Share festival reviews
```

### Implementation Guidelines

1. **Group Discovery**

   - Make groups findable where relevant
   - Show group purpose and activity level
   - Display membership demographics
   - List primary festivals covered

2. **Content Integration**

   ```yaml
   Festival Event:
     title: 'Cuban Salsa Festival Berlin'
     style: 'salsa/cuban'
     related_groups:
       - name: 'Afro-Cuban Festivals'
         type: 'WhatsApp'
         members: 234
         focus: 'Festival planning'
         link: 'https://chat.whatsapp.com/...'
   ```

3. **Access Points**
   - Style community pages
   - Festival event pages
   - City community pages
   - User profiles (groups they're in)
   - Search results for "festivals"

## Community Landing Pages

### URL Structure

```yaml
Main Community URL: /communities/[slug]
Examples:
  - /communities/afro-cuban-festivals
  - /communities/munich-casino
  - /communities/berlin-salseros
```

### Page Types

1. **Cross-Location Communities**

   ```yaml
   Example - Festival Group:
     URL: /communities/afro-cuban-festivals
     Type: International Group
     Focus: Festival Planning

     Layout:
       Hero:
         - Group name and type
         - Member count and demographics
         - Primary value proposition
         - Join CTA (WhatsApp/Telegram)

       Value Proposition:
         - Festival planning coordination
         - Travel & accommodation sharing
         - Experience exchange
         - Community support

       Active Content:
         - Upcoming festivals
         - Recent experiences
         - Member testimonials
         - Success stories

       Join Section:
         - Community guidelines
         - What to expect
         - How to contribute
         - Code of conduct
   ```

2. **Local Communities**

   ```yaml
   Example - City Group:
     URL: /communities/munich-casino
     Type: Local Group
     Focus: Regular Events

     Layout:
       Hero:
         - Community name
         - Regular venues
         - Weekly schedule
         - Join options

       Local Scene:
         - Regular events
         - Key organizers
         - Active teachers
         - Practice spots

       Communication:
         - WhatsApp groups
         - Telegram channels
         - Facebook groups
         - Local forums
   ```

### Content Guidelines

1. **Essential Elements**

   ```yaml
   Every Landing Page:
     - Clear value proposition
     - Active member count
     - Recent activity indicators
     - Easy join process
     - Community guidelines
     - Contact information
   ```

2. **Social Proof**

   ```yaml
   Show Activity:
     - Member testimonials
     - Recent event photos
     - Success stories
     - Community achievements
     - Active discussions
   ```

3. **Call to Action**
   ```yaml
   Join Options:
     Primary: 'Join WhatsApp Group'
     Secondary:
       - Follow on social media
       - Subscribe to updates
       - Add to calendar
       - Save venues
   ```

### Best Practices

1. **Content Management**

   - Keep information up-to-date
   - Regular activity updates
   - Clear moderation guidelines
   - Easy contact methods

2. **User Experience**

   - One clear primary action
   - Mobile-friendly layout
   - Fast loading essential info
   - Easy sharing options

3. **Community Growth**

   - Welcome message templates
   - Onboarding process
   - Regular event schedule
   - Community roles

4. **Integration Points**
   ```yaml
   Cross-link from:
     - Style pages
     - Event pages
     - City pages
     - Festival pages
     - User profiles
     - Search results
   ```

## Communities vs Organizers

### Key Differences

```yaml
Organizers:
  Type: Official Entities
  Examples:
    - Dance schools
    - Event production companies
    - Venue management
    - Teaching collectives
  Characteristics:
    - Have business profiles
    - Run regular events
    - Offer paid services
    - Have formal roles
    - Manage venues/spaces

Communities:
  Type: Groups of People
  Examples:
    - Festival travel groups
    - Style-specific groups
    - City dance scenes
    - Practice groups
  Characteristics:
    - Informal connections
    - Shared interests
    - Can span multiple organizers
    - Member-driven
    - Often use messaging apps
```

### Relationship Examples

```yaml
Scenario 1 - Local Scene:
  Organizer:
    name: 'Megano'
    type: 'Venue & Event Production'
    services:
      - Weekly parties
      - Classes
      - Workshops

  Related Communities:
    - Saturday Cuban Salsa crowd
    - Timba music enthusiasts
    - Practice group

Scenario 2 - Festival Circuit:
  Organizer:
    name: 'Berlin Salsa Festival'
    type: 'Event Production'
    services:
      - Annual festival
      - Workshops
      - Shows

  Related Communities:
    - Afro-Cuban Festivals group
    - Festival volunteers
    - Performance teams
```

### Implementation Strategy

1. **Profile Types**

   ```yaml
   Organizer Profile (/organizers/[slug]):
     - Official business info
     - Services offered
     - Regular events
     - Venue details
     - Team members

   Community Page (/communities/[slug]):
     - Group purpose
     - How to join
     - Member activities
     - Related organizers
     - Communication channels
   ```

2. **Content Organization**

   ```yaml
   Event:
     organizer: 'Megano' # Official entity running it
     communities: # Related groups
       - 'Saturday Cuban Salsa'
       - 'Afro-Cuban Festivals'

   Venue:
     manager: 'Megano' # Official management
     communities: # Groups that use the space
       - 'Practice Group'
       - 'Social Dancers'
   ```
