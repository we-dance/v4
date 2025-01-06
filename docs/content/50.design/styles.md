# Dance Styles

## Overview

Based on our detailed discussion, here are the key questions we need to address with the dance community to validate and refine our approach:

1. **Style Organization**

   - How do you prefer to discover new dance styles?
   - What terminology do you use for your style? (e.g., "On1" vs "LA Style" vs "Linear")
   - Should fusion styles (like salsa-bachata) be listed separately or within parent styles?

2. **Community Structure**

   - Should sub-styles have separate communities (e.g., Rueda within Cuban Salsa)?
   - How do you want to organize cross-style communities?
   - What makes you join or stay active in a dance community?

3. **Navigation & Discovery**

   - When you search for dance styles, what terms do you use?
   - How do you prefer to compare different styles?
   - What information helps you choose a style to learn?

4. **Music Integration**

   - How important is music understanding to your dance journey?
   - How do you discover music for your dance style?
   - Should music genres have their own pages or be integrated into dance pages?

5. **Local Context**

   - How important is seeing local activity in search results?
   - What local information is most valuable? (events, teachers, venues?)
   - How do you want to connect with your local dance scene?

6. **Beginner Journey**
   - What confused you most when starting to dance?
   - How did you choose your first dance style?
   - What would have made your learning journey easier?

These questions would help us validate our assumptions and ensure we're building something that truly serves the dance community's needs.

## Use Cases

1. **Style Names & Discovery**

   - When you hear "Cuban Salsa" and "Casino", which name resonates more with you?
   - If you search for "salsa classes", what specific style information would help you choose?
   - When you see "LA Style (On1)" vs just "Salsa On1", which makes more sense to you?

2. **Style Relationships**

   - Should Rueda be shown as:
     a) Part of Cuban Salsa community
     b) Its own separate community
     c) Both with cross-references?
   - When you dance multiple styles (e.g., both On1 and On2), do you see these as separate communities or one salsa community?

3. **Navigation Structure**

   - Which URL would you expect to find Cuban style salsa at:
     a) `/dance/casino`
     b) `/dance/salsa/cuban`
     c) `/dance/cuban-salsa`
   - When searching for "bachata", would you prefer to:
     a) See all styles immediately (Dominican, Modern, Sensual)
     b) Land on a general bachata page first, then explore styles

4. **Local Scene Integration**

   - When you search for "salsa", what's more important to see first:
     a) Different style explanations
     b) Tonight's events
     c) Local teachers
   - Would you prefer to join:
     a) One city-wide salsa community
     b) Specific style communities (e.g., LA Style Berlin)
     c) Both options

5. **Music Connection**

   - If you're dancing Cuban style, would you prefer:
     a) Music info integrated in the Cuban style page
     b) Separate pages for Timba, Son, etc.
   - When exploring a style, how important is it to:
     a) See example songs
     b) Understand music structure
     c) Learn about music history

6. **Beginner Guidance**
   - When starting salsa, what would be more helpful:
     a) Immediate style comparison (On1 vs On2 vs Cuban)
     b) General salsa introduction first
   - Would a "Find Your Style" quiz be useful with questions like:
     a) "Do you prefer structured or freestyle movement?"
     b) "What kind of music do you enjoy more?"

## Iteration 1

we were talking about dance communities, our platform communities, dance styles and tags. now let's think from ux perspective. we have 2 different concepts: /dance/casino (opens /dance/[style]/index) and /dance/salsa and /dance/salsa/cuban.

which concept should we choose and why?

## Iteration 1 Answer

Let me analyze both concepts from a UX perspective based on the architecture documentation and best practices.

Current Concepts:

1. `/dance/casino` → redirects to `/dance/[style]/index.vue`
2. `/dance/salsa` with sub-styles like `/dance/salsa/cuban`

Let's evaluate both approaches:

### Analysis of `/dance/casino` Approach:

Pros:

- Simpler, flatter URL structure
- More intuitive for newcomers who might search directly for "casino"
- Easier to remember and share
- Works well for styles that don't have sub-styles

Cons:

- Loses the hierarchical relationship between styles
- Makes it harder to show related styles
- Could lead to confusion with duplicate content (casino vs cuban salsa)
- Doesn't align with the documented dance styles taxonomy

### Analysis of `/dance/salsa/cuban` Approach:

Pros:

- Reflects the natural hierarchy of dance styles
- Better for SEO as it shows style relationships
- Enables better content organization and navigation
- Matches the documented architecture in `dance-styles.md`
- Makes it easier to show related styles and variations
- Better supports the community structure where some dancers practice multiple sub-styles

Cons:

- Slightly longer URLs
- Requires more clicks to reach specific sub-styles
- Might be less intuitive for complete beginners

### Recommendation

I recommend going with the hierarchical approach (`/dance/salsa/cuban`) for these reasons:

1. **Taxonomy Alignment**: It matches our documented dance styles taxonomy structure which is well thought out in `docs/content/30.architecture/dance-styles.md`.

2. **SEO Benefits**: The hierarchical structure helps search engines understand the relationship between styles, potentially improving our search rankings.

3. **Community Organization**: It better supports how dance communities actually organize themselves, where there's often overlap between sub-styles (as documented in the architecture).

4. **Navigation**: We can implement redirects for common aliases while maintaining the canonical URLs:

```yaml
/dance/casino    → redirects to /dance/salsa/cuban
/dance/rueda     → redirects to /dance/salsa/cuban
/dance/salsa-on2 → redirects to /dance/salsa/ny
```

5. **Content Organization**: It allows for better organization of content, where general salsa content lives at `/dance/salsa` while style-specific content lives in the sub-style pages.

To address the potential UX concerns, we should:

1. Implement proper redirects for common aliases
2. Ensure clear navigation between related styles
3. Add breadcrumbs for easy navigation up the hierarchy
4. Include style comparison tools on the main style page
5. Use clear visual indicators to show style relationships

This approach provides the best balance between user experience, technical organization, and future scalability of the platform.

## Iteration 2

i mean the ux, the templates of this pages, the components, the look and feel, the cta and alignment with the vision and mission of the platform

## Iteration 2 Answer

Ah, now I understand - you're asking about the UX design and components of these pages and how they align with WeDance's mission to "organize all the world's information about dance" and create a participatory network.

Let's analyze both current implementations:

1. `/dance/[style]/index.vue` (Current simpler version):

```vue
<template>
  <DanceStyleLayout
    title="Salsa Cubana"
    description="Connect, organize, and grow with your local salsa community..."
  >
    <Feed />
  </DanceStyleLayout>
</template>
```

2. `/dance/salsa/cuban.vue` (Current detailed version):

```vue
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <!-- Style Overview -->
    <!-- Communities Section -->
    <!-- Events Section -->
    <!-- Learn Section -->
  </div>
</template>
```

### Recommendation

I recommend evolving the simpler `/dance/[style]/index.vue` approach but enhancing it to better serve our mission. Here's why:

1. **Community-First Approach**

- The Feed component puts community activity front and center
- Aligns with the "participatory network" vision
- Shows real-time community engagement
- Makes the platform feel alive and active

2. **Dynamic Content Over Static**

- Current `cuban.vue` has more static sections
- A dynamic feed better reflects the community's current state
- Allows for organic growth of content
- More aligned with the "self-organize" vision

Here's how I would enhance the simpler version:

```vue
<script setup>
const tabs = [
  { id: "feed", label: "Community" },
  { id: "events", label: "Events" },
  { id: "learn", label: "Learn" },
  { id: "about", label: "About" },
];

const selectedTab = ref("feed");
</script>

<template>
  <DanceStyleLayout :title="style.name" :description="style.description">
    <!-- Quick Actions -->
    <div class="flex gap-4 mb-6">
      <Button variant="primary">Find Events</Button>
      <Button variant="secondary">Join Community</Button>
      <Button variant="outline">Share Style</Button>
    </div>

    <!-- Community Stats -->
    <div class="flex gap-8 mb-8">
      <Stat label="Active Dancers" value="2.3k" />
      <Stat label="Events This Month" value="45" />
      <Stat label="Communities" value="12" />
    </div>

    <!-- Tabs -->
    <Tabs v-model="selectedTab" :tabs="tabs">
      <!-- Feed Tab -->
      <TabPanel value="feed">
        <Feed :filters="{ style: style.id }" :quick-post="true" />
      </TabPanel>

      <!-- Events Tab -->
      <TabPanel value="events">
        <EventsCalendar :style="style.id" :show-filters="true" />
      </TabPanel>

      <!-- Learn Tab -->
      <TabPanel value="learn">
        <ResourceGrid :style="style.id" :show-levels="true" />
      </TabPanel>

      <!-- About Tab -->
      <TabPanel value="about">
        <StyleInfo
          :style="style"
          :show-history="true"
          :show-characteristics="true"
        />
      </TabPanel>
    </Tabs>
  </DanceStyleLayout>
</template>
```

Key improvements:

1. **Participatory Elements**

- Quick post option in the feed
- Easy event creation
- Community contribution features
- Real-time interactions

2. **Organization**

- Clear tab structure
- Important information easily accessible
- Balanced between static and dynamic content
- Progressive disclosure of information

3. **Community Building**

- Clear CTAs for engagement
- Visible community stats
- Easy ways to connect
- Multiple entry points for participation

4. **Discovery**

- Related styles
- Upcoming events
- Active communities
- Learning resources

This approach:

- Makes the platform feel more alive and community-driven
- Puts user-generated content first
- Makes it easy to contribute and participate
- Maintains organization while being dynamic
- Scales well for different dance styles
- Supports both beginners and experienced dancers

The key is that it focuses on facilitating community interaction rather than just presenting information, which better aligns with WeDance's vision of being a participatory network rather than just an information directory.

## Iteration 3

What about the taxonomy? Which community should people join? Salsa? Salsa Cubana? Casino? What structure of the page should we use? How should we organize the content? What CTA should we use?

## Iteration 3 Answer

This is a crucial UX question that impacts how people discover and engage with dance communities. Let's analyze this based on real-world dance community behavior and our platform's goals.

### Real-World Community Behavior

1. **Identity & Search Patterns**

- New dancers often search for "salsa classes" (broad)
- Experienced dancers look for specific styles ("casino", "cuban salsa")
- Communities often form around specific styles and venues
- People typically join multiple related communities

2. **Learning Journey**

```
Beginner → "I want to learn salsa"
Intermediate → "I prefer Cuban style"
Advanced → "I'm part of the casino/timba community"
```

### Recommended Structure

1. **Main Salsa Page** (`/dance/salsa`)

```vue
<template>
  <DanceStyleLayout>
    <!-- Hero -->
    <StyleHero
      title="Salsa"
      description="Discover the joy of salsa dancing in all its forms"
    >
      <PrimaryCTA>Find Local Classes</PrimaryCTA>
      <SecondaryCTA>Explore Styles</SecondaryCTA>
    </StyleHero>

    <!-- Style Variants -->
    <StyleGrid>
      <StyleCard
        v-for="style in salsaStyles"
        :key="style.id"
        :style="style"
        @click="navigateToStyle(style)"
      />
    </StyleGrid>

    <!-- Local Scene -->
    <LocalScene>
      <VenueList />
      <TeacherList />
      <EventList />
    </LocalScene>

    <!-- Community Feed -->
    <Feed :filters="{ style: 'salsa' }" />
  </DanceStyleLayout>
</template>
```

2. **Style-Specific Page** (`/dance/salsa/cuban`)

```vue
<template>
  <DanceStyleLayout>
    <!-- Hero -->
    <StyleHero
      title="Cuban Style Salsa"
      description="Experience the circular, rhythmic style of Cuban salsa"
    >
      <PrimaryCTA>Join Local Community</PrimaryCTA>
      <SecondaryCTA>Find Events</SecondaryCTA>
    </StyleHero>

    <!-- Community Sections -->
    <CommunityTabs>
      <!-- Active Communities -->
      <CommunityList>
        <CommunityCard
          v-for="community in localCommunities"
          :community="community"
        >
          <template #cta>
            <Button>Join Group</Button>
          </template>
        </CommunityCard>
      </CommunityList>

      <!-- Events Calendar -->
      <EventCalendar :style="style.id" />

      <!-- Learning Resources -->
      <ResourceGrid :style="style.id" />
    </CommunityTabs>
  </DanceStyleLayout>
</template>
```

### Community Organization

1. **Hierarchical but Flexible**

```yaml
Salsa:
  Communities:
    - General Salsa Community (city-wide)
    - Beginner-Friendly Groups

  Cuban Style:
    Communities:
      - Cuban Salsa/Casino Groups
      - Timba Music Lovers
      - Rueda Groups
    Venues:
      - Regular Social Venues
      - Practice Spots
    Events:
      - Weekly Socials
      - Rueda Practice
```

2. **CTAs Based on User Journey**

```yaml
New Visitor:
  Primary: "Find Local Classes"
  Secondary: "Explore Styles"

Style Page Visitor:
  Primary: "Join Community"
  Secondary: "Find Events"

Community Member:
  Primary: "Share Event"
  Secondary: "Find Partner"
```

### Content Organization

1. **Progressive Disclosure**

```yaml
Level 1 (Immediate):
  - Local classes and events
  - Basic style information
  - Quick start guide

Level 2 (One Click):
  - Specific communities
  - Venue details
  - Teacher profiles

Level 3 (Detailed):
  - History and culture
  - Advanced resources
  - Special events
```

2. **Community Features**

```yaml
Quick Actions:
  - Join WhatsApp/Telegram group
  - Find today's events
  - Connect with dancers

Content Types:
  - Event announcements
  - Dance videos
  - Music sharing
  - Partner search
```

### Recommendations

1. **URL Structure**

- Keep `/dance/salsa` as main entry
- Use `/dance/salsa/cuban` for specific style
- Implement redirects: `/dance/casino` → `/dance/salsa/cuban`

2. **Community Access**

- Allow joining multiple communities
- Show most active/relevant first
- Group by location and venue
- Enable cross-community interaction

3. **CTAs Priority**

```yaml
First Time: 1. Find Local Classes
  2. Explore Styles
  3. Join Community

Returning: 1. Today's Events
  2. Practice Groups
  3. Share/Contribute
```

4. **Content Strategy**

- Lead with local, active content
- Show community activity
- Highlight upcoming events
- Feature learning resources

This structure:

- Makes it easy for beginners to start
- Supports natural progression
- Maintains community identity
- Enables organic growth
- Reflects real-world dance community organization
- Supports both online and offline interaction

The key is to make it easy for people to find their community while maintaining the natural relationships between different styles and groups.

## Iteration 4

what if we make /salsa page like a train station, where people can find different styles and communities? so salsa is a dance family so to say. but communities will actually form around specific styles. so salsa is a dance family, but salsa cubana is a community. so dance family would be something like a wiki page with more static information and kinda landing page for seo. which will lead to specific styles pages, which are communities with more dynamic content. and on homepage we would make navigation to specific styles pages, and for beginners we would offer an interative game so that they compare different styles and choose the one that suits them the best.

## Iteration 4 Answer

This is a brilliant concept! It aligns perfectly with both real-world dance community behavior and effective information architecture. Let me break down how this could work:

### Dance Family Page (`/salsa`)

```vue
<template>
  <DanceFamilyLayout>
    <!-- Hero with Clear Purpose -->
    <FamilyHero
      title="Salsa Dance Family"
      description="Discover your perfect salsa style and community"
    >
      <Button @click="startStyleQuiz">Find Your Style</Button>
      <Button variant="secondary">Browse All Styles</Button>
    </FamilyHero>

    <!-- Style "Train Station" -->
    <StyleStation>
      <!-- Each "Platform" is a style -->
      <StylePlatform
        v-for="style in salsaStyles"
        :key="style.id"
        :style="{
          title: style.name,
          description: style.shortDesc,
          characteristics: style.key_points,
          image: style.cover,
        }"
      >
        <template #preview>
          <VideoPreview :src="style.demo_video" />
        </template>

        <template #stats>
          <CommunityStats
            :active_members="style.stats.members"
            :weekly_events="style.stats.events"
          />
        </template>

        <template #cta>
          <Button @click="joinCommunity(style.id)">
            Join {{ style.name }} Community
          </Button>
        </template>
      </StylePlatform>
    </StyleStation>

    <!-- Interactive Style Comparison -->
    <StyleComparison>
      <ComparisonCard
        v-for="style in salsaStyles"
        :key="style.id"
        :style="style"
        @click="showDetails(style)"
      >
        <template #characteristics>
          <li>{{ style.movement_type }}</li>
          <li>{{ style.music_type }}</li>
          <li>{{ style.key_feature }}</li>
        </template>
      </ComparisonCard>
    </StyleComparison>

    <!-- Wiki-style Information -->
    <WikiSection>
      <HistoryTimeline />
      <MusicGuide />
      <BasicTerminology />
      <GlobalInfluence />
    </WikiSection>
  </DanceFamilyLayout>
</template>
```

### Style Community Page (`/salsa/cuban`)

```vue
<template>
  <CommunityLayout>
    <!-- Community Hero -->
    <CommunityHero
      :style="style"
      :active_members="stats.active_members"
      :weekly_events="stats.weekly_events"
    >
      <PrimaryCTA>Join Community</PrimaryCTA>
    </CommunityHero>

    <!-- Dynamic Community Content -->
    <CommunityTabs>
      <!-- Today's Activity -->
      <TodayTab>
        <EventsList type="today" />
        <ActiveDiscussions />
        <NewMembers />
      </TodayTab>

      <!-- Events & Classes -->
      <EventsTab>
        <EventCalendar />
        <RegularSocials />
        <UpcomingWorkshops />
      </EventsTab>

      <!-- Community Feed -->
      <FeedTab>
        <CreatePost />
        <CommunityFeed />
      </FeedTab>

      <!-- Resources -->
      <ResourcesTab>
        <BeginnerGuide />
        <MusicPlaylists />
        <TechniqueVideos />
      </ResourcesTab>
    </CommunityTabs>
  </CommunityLayout>
</template>
```

### Homepage Style Discovery

```vue
<template>
  <section class="style-discovery">
    <!-- Interactive Style Quiz -->
    <StyleQuiz v-if="showQuiz" @complete="recommendStyle">
      <Question v-for="q in styleQuestions" :key="q.id" :question="q" />
    </StyleQuiz>

    <!-- Visual Style Navigation -->
    <StyleGrid>
      <StyleCard
        v-for="family in danceFamilies"
        :key="family.id"
        :family="family"
        @click="navigateToFamily(family)"
      >
        <template #preview>
          <StylePreview :styles="family.styles" />
        </template>
      </StyleCard>
    </StyleGrid>
  </section>
</template>
```

### Key Benefits of This Approach:

1. **Clear User Journeys**

```yaml
Beginner Path: Homepage → Style Quiz → Recommended Style Community

Explorer Path: Homepage → Dance Family → Style Comparison → Chosen Community

Direct Path: Search "Casino" → Redirect to Cuban Salsa Community
```

2. **Information Architecture**

```yaml
Dance Family (/salsa):
  Purpose: Education & Discovery
  Content:
    - Style comparisons
    - History & culture
    - Music foundations
    - Learning paths

Style Community (/salsa/cuban):
  Purpose: Active Participation
  Content:
    - Live events
    - Community discussions
    - Learning resources
    - Member interactions
```

3. **SEO Benefits**

- Rich content on family pages
- Natural keyword hierarchy
- Clear content structure
- Educational resources

4. **Community Building**

- Communities form around specific styles
- Clear identity and focus
- Natural progression paths
- Active participation opportunities

This structure:

- Makes style discovery intuitive
- Supports both education and community
- Matches real-world dance community organization
- Scales well for all dance styles
- Helps beginners find their path
- Maintains engagement for experienced dancers

The train station metaphor is perfect because it:

1. Shows clear destinations (styles)
2. Provides orientation (comparison)
3. Facilitates movement between communities
4. Creates natural gathering points

Would you like me to elaborate on any specific aspect of this structure?

## Iteration 5

And what about rueda de casino? should it be a community people can join? or is it just part of casino style?

## Iteration 5 Answer

This is a nuanced question that reflects a real complexity in the Cuban salsa community. Let me analyze this:

### Real-World Context

Rueda de Casino has unique characteristics:

1. It's a format of dancing Casino (Cuban salsa)
2. BUT it often forms distinct communities because:
   - It requires specific group organization
   - Has its own teaching methodology
   - Needs dedicated practice sessions
   - Forms around specific "cantantes" (callers)
   - Has its own events and festivals

### Recommended Approach

I recommend treating Rueda as a "sub-community" within Cuban Salsa, but with its own dedicated space. Here's how:

```vue
<!-- /salsa/cuban page -->
<template>
  <CommunityLayout>
    <CommunityHero
      title="Cuban Style Salsa (Casino)"
      description="Experience the circular, rhythmic style of Cuban salsa"
    >
      <CommunityStats>
        <Stat label="Dancers" :value="activeDancers" />
        <Stat label="Events/Week" :value="weeklyEvents" />
        <Stat label="Rueda Groups" :value="ruedaGroups" />
      </CommunityStats>
    </CommunityHero>

    <!-- Community Navigation -->
    <CommunityNav>
      <NavItem>Social Dancing</NavItem>
      <NavItem>
        Rueda Groups
        <Badge>Special Format</Badge>
      </NavItem>
    </CommunityNav>

    <!-- Sub-communities Section -->
    <section v-if="activeTab === 'rueda'">
      <RuedaGroups>
        <RuedaGroup v-for="group in ruedaGroups" :key="group.id" :group="group">
          <template #info>
            <div>Caller: {{ group.caller }}</div>
            <div>Practice: {{ group.schedule }}</div>
            <div>Level: {{ group.level }}</div>
          </template>

          <template #cta>
            <Button>Join Group</Button>
          </template>
        </RuedaGroup>
      </RuedaGroups>

      <!-- Rueda-specific Resources -->
      <RuedaResources>
        <h3>Learn Rueda</h3>
        <ResourceList>
          <li>Basic Rueda Calls</li>
          <li>Finding Your Role</li>
          <li>Group Practice Tips</li>
        </ResourceList>
      </RuedaResources>
    </section>
  </CommunityLayout>
</template>
```

### Content Organization

```yaml
Cuban Salsa Community:
  Main Focus:
    - Social dancing
    - Partner work
    - Individual styling

  Rueda Sub-community:
    Unique Elements:
      - Group practices
      - Call learning
      - Formation work

    Group Types:
      - Beginner Rueda
      - Performance Teams
      - Social Rueda
      - Festival Teams
```

### Navigation Structure

```yaml
/salsa/cuban:
  Sections:
    - Social Dancing
    - Events
    - Music
    - Learning

    Rueda Special Section:
      - Active Groups
      - Practice Schedule
      - Calls Dictionary
      - Formation Guides
```

### Community Features

```yaml
Regular Casino:
  Primary CTA: "Join Community"
  Activities:
    - Social dancing
    - Partner practice
    - Workshops

Rueda Groups:
  Primary CTA: "Find Group"
  Activities:
    - Group practice
    - Call training
    - Team performances
```

### Recommendations

1. **Keep Rueda Integrated but Distinct**

   - Part of Cuban salsa community
   - Special section for group organization
   - Dedicated resources and events
   - Cross-promotion with social dancing

2. **Clear User Paths**

```yaml
New Dancer: 1. Discover Cuban Salsa
  2. Learn basics in partner work
  3. Introduction to Rueda concepts
  4. Join beginner Rueda group

Experienced Dancer: 1. Join Cuban salsa community
  2. Find Rueda groups
  3. Connect with multiple groups
  4. Participate in Rueda events
```

3. **Content Strategy**

```yaml
Shared Content:
  - Music
  - Basic steps
  - Cuban style principles

Rueda-specific:
  - Call dictionary
  - Formation guides
  - Group practice tips
  - Team building
```

4. **Event Organization**

```yaml
Regular Events:
  - Social parties
  - Classes
  - Workshops

Rueda-specific:
  - Group practices
  - Caller training
  - Flash mobs
  - Team performances
```

This approach:

- Maintains the natural connection between Casino and Rueda
- Supports the unique aspects of Rueda communities
- Makes it easy to participate in both formats
- Reflects real-world community organization
- Provides clear paths for different interests
- Supports both social and team-based dancing

The key is to recognize Rueda as a special format within Casino that often forms its own sub-communities, while maintaining its connection to the broader Cuban salsa community.

## Iteration 6

that's just one of examples, we touched only one dance family, but what about others? we need a concept that would work for all dance families and styles. and it should be simple.

## Iteration 6 Answer

You're absolutely right - we need a universal, simple concept that works for all dance families and styles. Let me propose a streamlined structure:

### Core Concept

1. **Dance Families** (e.g., `/salsa`, `/bachata`, `/tango`)

- Like "train stations" or "gateways"
- Educational, static content
- Style comparison and guidance
- SEO-optimized landing pages

2. **Style Communities** (e.g., `/salsa/cuban`, `/tango/argentino`)

- Active, dynamic communities
- Real events and people
- Local activities
- Community-driven content

### Universal Template Structure

```vue
<!-- Dance Family Template (/[family]) -->
<template>
  <DanceFamilyLayout>
    <!-- Educational Gateway -->
    <FamilyHero>
      <StyleFinder>
        <Button>Find Your Style</Button>
        <Button>Browse Communities</Button>
      </StyleFinder>
    </FamilyHero>

    <!-- Style Comparison -->
    <StyleGrid>
      <StyleCard
        v-for="style in styles"
        :key="style.id"
        :style="style"
        @click="navigateToCommunity(style.id)"
      />
    </StyleGrid>

    <!-- Wiki Section -->
    <WikiContent>
      <History />
      <Music />
      <Basics />
    </WikiContent>
  </DanceFamilyLayout>
</template>

<!-- Style Community Template (/[family]/[style]) -->
<template>
  <CommunityLayout>
    <!-- Community Hub -->
    <CommunityHero>
      <JoinCTA />
      <LocalStats />
    </CommunityHero>

    <!-- Dynamic Content -->
    <CommunityTabs>
      <Tab name="feed">Community Feed</Tab>
      <Tab name="events">Events</Tab>
      <Tab name="learn">Resources</Tab>
    </CommunityTabs>
  </CommunityLayout>
</template>
```

### Examples How It Works

```yaml
Dance Families:
  Salsa:
    Communities:
      - Cuban
      - LA Style
      - NY Style

  Bachata:
    Communities:
      - Dominican
      - Modern/Sensual

  Tango:
    Communities:
      - Argentino
      - Nuevo

  Swing:
    Communities:
      - Lindy Hop
      - West Coast
      - Boogie Woogie
```

This simple two-level structure:

1. Makes style discovery intuitive
2. Works for any dance family
3. Supports natural community formation
4. Easy to understand and navigate
5. Scales well for growth

Would you like me to elaborate on any aspect of this simplified structure?

## Iteration 7

so on homepage when a no-dancer comes in, can they search for salsa? what will they find? what are the next steps?

## Iteration 7 Answer

Let me design a clear user journey for a new dancer discovering salsa:

### Homepage for New Dancers

```vue
<template>
  <HomeLayout>
    <!-- Hero Search -->
    <HeroSection>
      <h1>Find Your Dance</h1>

      <!-- Main Search -->
      <SearchBar
        placeholder="Try 'salsa' or 'bachata'..."
        :suggestions="popularDances"
      />

      <!-- Quick Starts -->
      <PopularSearches>
        <Chip>Salsa</Chip>
        <Chip>Bachata</Chip>
        <Chip>Kizomba</Chip>
      </PopularSearches>

      <!-- Alternative Entry -->
      <Button variant="secondary"> Not sure? Take the Dance Quiz </Button>
    </HeroSection>

    <!-- After Search Results for "Salsa" -->
    <SearchResults v-if="query">
      <!-- Dance Family Card -->
      <FamilyCard
        title="Salsa"
        description="Popular social dance with Latin American roots"
      >
        <Stats>
          <Stat label="Active Communities" value="4" />
          <Stat label="Events this week" value="12" />
        </Stats>

        <!-- Quick Choice -->
        <QuickStart>
          <Button>Explore Styles</Button>
          <Button>Find Local Classes</Button>
        </QuickStart>
      </FamilyCard>

      <!-- Local Activities -->
      <LocalSection>
        <h3>Happening Near You</h3>
        <EventList :events="nearbyEvents" />
      </LocalSection>
    </SearchResults>
  </HomeLayout>
</template>
```

### User Journey

1. **Initial Search**

```yaml
Entry Points:
  - Search "salsa"
  - Click popular dance chip
  - Take dance quiz
```

2. **Search Results**

```yaml
Primary Option:
  - "Explore Salsa Styles" → /salsa (Dance Family page)

Quick Actions:
  - "Find Classes Near You"
  - "View Tonight's Events"
  - "Join Beginner Community"
```

3. **Dance Family Page** (`/salsa`)

```yaml
Key Sections:
  - Style Comparison
  - Beginner Guide
  - Local Communities
  - Upcoming Classes
```

The key is making it super easy for newcomers to:

1. Find basic information
2. See local opportunities
3. Choose their path (explore vs direct action)
4. Connect with beginners like them

Would you like me to detail any part of this journey further?

## Iteration 8

and when people enter "salsa", how do they find salsa on1 and on2? are those different communities? or same? can they see those styles in results on homepage? is it called salsa on1? or salsa linear? or salsa urban? or?

## Iteration 8 Answer

This is a crucial UX question that touches on a common challenge in dance communities - terminology and style identification. Let me break down the approach:

### Search Results for "Salsa"

```vue
<template>
  <!-- Initial Search Results -->
  <SearchResults>
    <!-- Main Salsa Family Card -->
    <FamilyCard
      title="Salsa"
      description="Discover different styles of salsa dancing"
    >
      <QuickView>
        <!-- Popular Local Styles -->
        <PopularStyles>
          <StyleChip v-for="style in localPopularStyles" :key="style.id">
            {{ style.commonName }}
            <Badge v-if="style.aliases">
              {{ style.aliases[0] }}
            </Badge>
          </StyleChip>
        </PopularStyles>

        <Button>Compare All Styles</Button>
      </QuickView>
    </FamilyCard>

    <!-- Style Quick Cards -->
    <StyleGrid>
      <!-- LA Style Card -->
      <StyleCard>
        <h3>LA Style Salsa</h3>
        <Badges>
          <Badge>On1</Badge>
          <Badge>Linear</Badge>
        </Badges>
        <LocalStats />
      </StyleCard>

      <!-- NY Style Card -->
      <StyleCard>
        <h3>NY Style Salsa</h3>
        <Badges>
          <Badge>On2</Badge>
          <Badge>Mambo</Badge>
        </Badges>
        <LocalStats />
      </StyleCard>

      <!-- Cuban Style Card -->
      <StyleCard>
        <h3>Cuban Style Salsa</h3>
        <Badges>
          <Badge>Casino</Badge>
          <Badge>Circular</Badge>
        </Badges>
        <LocalStats />
      </StyleCard>
    </StyleGrid>

    <!-- Local Context -->
    <LocalContext>
      <h3>Popular in Your City</h3>
      <PopularStylesList :styles="localPrevalentStyles" />
    </LocalContext>
  </SearchResults>
</template>
```

### Style Naming Strategy

```yaml
LA Style (On1):
  Primary Name: "LA Style Salsa"
  Common Names:
    - "Salsa On1"
    - "Linear Salsa"
  Tags:
    - on1
    - linear
    - los_angeles

NY Style (On2):
  Primary Name: "NY Style Salsa"
  Common Names:
    - "Salsa On2"
    - "Mambo"
  Tags:
    - on2
    - mambo
    - new_york

Cuban Style:
  Primary Name: "Cuban Style Salsa"
  Common Names:
    - "Casino"
    - "Cuban Salsa"
  Tags:
    - casino
    - cuban
    - circular
```

### Key Principles

1. **Use Common Names First**

- Show the most locally used term prominently
- Include other names as badges/aliases
- Adapt to local terminology

2. **Context Over Technicality**

```yaml
If local scene calls it:
  "On1": Show as "LA Style (On1)"
  "Linear": Show as "Linear Salsa (LA Style)"
  "Urban": Show as "Urban Salsa (LA Style)"
```

3. **Community Organization**

```yaml
Linear Styles:
  Shared:
    - Similar basic step
    - Linear movement
    - Similar music

  Separate Communities:
    - Different timing
    - Different styling
    - Different social scenes
```

4. **Search Intelligence**

```yaml
Search "on1" shows:
  Primary: "LA Style Salsa"
  Note: "Also known as Salsa On1"
  Related: Other linear styles

Search "linear" shows:
  - LA Style (On1)
  - NY Style (On2)
  With: Style comparison option
```

### Recommendations

1. **Show Style Relationships**

- Group related styles
- Explain connections
- Show local prevalence

2. **Adapt to User**

```yaml
Beginner:
  Show: Basic style differences
  Focus: Getting started

Intermediate:
  Show: Timing differences
  Focus: Style characteristics

Advanced:
  Show: All variations
  Focus: Community connections
```

3. **Local Context**

```yaml
Display:
  - Most popular local style first
  - Active local communities
  - Available classes
  - Regular events
```

This approach:

- Makes style discovery intuitive
- Respects local terminology
- Shows natural relationships
- Guides beginners effectively
- Supports multiple entry points
- Adapts to local scene preferences

The key is to use common terminology while educating about proper names, and to show styles in their local context rather than just technical definitions.

## Iteration 9

do we need music genres pages? data structures?

## Iteration 9 Answer

Yes, we should create music genre pages since they're an essential part of dance education and discovery.

Let me explain why music genre pages would be valuable:

1. **Educational Value**

   - New dancers need to understand the connection between dance and music
   - Different styles are danced to specific rhythms and musical patterns
   - Understanding music helps improve musicality and style authenticity

2. **Discovery Path**

   - Many people discover dance through music first (e.g., hearing timba and wanting to learn Cuban salsa)
   - Music preferences can guide style choice (e.g., someone who loves bachata romantica might prefer modern bachata)
   - DJs and event organizers need reference for appropriate music selection

3. **Community Connection**

   - Music is a core part of dance culture and identity
   - Different communities have strong ties to specific music genres
   - Understanding music history helps appreciate dance evolution

4. **Practical Implementation**
   - We already have music data in our styles (see `musicStyles` in Cuban Style Salsa)
   - This data could be expanded into dedicated pages
   - Would help with SEO for music-related searches

However, you raise a good point about necessity. Instead of creating separate music pages, we could:

1. Integrate music information directly into style pages
2. Add a music section to each dance family page
3. Include music players and playlists within existing pages

This would be more efficient and maintain focus on the core dance community features. Would you prefer this integrated approach?

## Iteration 10

Can you show an example how is it related to dance styles?

## Iteration 10 Answer

Ah, let me explain the relationship between music and dance styles using Salsa as an example:

1. **Cuban Style Salsa (Casino)**

   - Danced to: Timba, Son Cubano
   - Music characteristics: Complex rhythms, strong percussion, call-and-response
   - Key artists: Los Van Van, Havana D'Primera
   - Dance adapts to: Breaks in music, percussion solos, singer's calls

2. **LA Style Salsa (On1)**

   - Danced to: Commercial Salsa, Salsa Romantica
   - Music characteristics: More structured, consistent rhythm
   - Key artists: Marc Anthony, Jerry Rivera
   - Dance focuses on: Choreographed patterns, performance style

3. **NY Style Salsa (On2)**
   - Danced to: Classic Mambo, Puerto Rican Salsa
   - Music characteristics: Strong emphasis on the 2nd beat, mambo influence
   - Key artists: Eddie Palmieri, Tito Puente
   - Dance emphasizes: Musicality, connection to mambo roots

Each style evolved with its music:

- Cuban style developed with street parties and live bands
- LA style grew with the entertainment industry
- NY style maintained strong connections to mambo history

This is why understanding music helps dancers choose their style and improve their dancing. Would you like me to explain another dance family's music connections?

## Iteration 11

can't we make use of tag pages? like /tags/salsa would be a page with all salsa styles? so to say showing all styles that have salsa tag? so then we don't really have dance families but just pure taxonomy? or is it a bad idea?

## Iteration 11 Answer

Let me analyze the pros and cons of using tag-based navigation versus dance families:

### Tag-Based Approach (`/tags/salsa`)

Pros:

1. More flexible categorization
2. One style can belong to multiple categories
3. Simpler URL structure
4. Easier to add new relationships
5. Natural for cross-style connections

Cons:

1. Loses the clear hierarchy that beginners need
2. Could become messy with too many tags
3. Harder to show style relationships
4. Less intuitive for SEO
5. Might confuse users looking for clear entry points

### Current Family Approach (`/dance/salsa`)

Pros:

1. Clear entry points for beginners
2. Natural hierarchy matches real-world organization
3. Better for SEO and discoverability
4. Matches how people think about dances
5. Clearer navigation structure

Cons:

1. More rigid structure
2. Harder to show cross-style relationships
3. Some styles might fit in multiple families
4. More complex URL structure
5. Less flexible for new categorizations

### Recommendation

I recommend keeping the dance family structure as primary navigation, but using tags as a complementary system:

```yaml
Primary Structure:
  /dance/salsa:
    - Clear entry point
    - Educational content
    - Style comparison
    - Community overview

Supporting Tags:
  /tags/[tag]:
    - Cross-style discovery
    - Alternative navigation
    - Related styles
    - Specialized interests
```

For example:

1. Someone searching for "salsa" lands on `/dance/salsa`
2. They can also discover related styles through tags:
   - `/tags/latin` - all Latin dances
   - `/tags/partner` - all partner dances
   - `/tags/cuban` - all Cuban-origin dances

This hybrid approach:

- Maintains clear structure for beginners
- Provides flexibility for advanced users
- Supports both hierarchical and lateral discovery
- Better matches how people learn dance

Would you like me to show how this could be implemented in the code?

## Iteration 12

so in suggestions I see "salsa", do you think it's a good approach? or is it better to list in suggestions only dance styles but when they search show results for salsa? or you think people might relate better if they see "salsa"?

## Iteration 12 Answer

Let me analyze how people typically search for dance styles:

1. **How Beginners Search**

   - "I want to learn salsa"
   - "Salsa classes near me"
   - They rarely search directly for "LA Style" or "Casino"

2. **How Experienced Dancers Search**
   - "On1 classes"
   - "Casino social"
   - More specific style names

Given this behavior, here's my recommendation for search suggestions:

```vue
<template>
  <SearchBar>
    <!-- Initial Popular Suggestions (before typing) -->
    <PopularSearches>
      <Chip>Cuban Style Salsa</Chip>
      <Chip>LA Style Salsa</Chip>
      <Chip>NY Style Salsa</Chip>
    </PopularSearches>

    <!-- Dynamic Suggestions (while typing "sa") -->
    <SearchSuggestions>
      <!-- Show specific styles first -->
      <SuggestionGroup label="Popular Styles">
        <Suggestion>
          Cuban Style Salsa
          <Badge>Casino</Badge>
        </Suggestion>
        <Suggestion>
          LA Style Salsa
          <Badge>On1</Badge>
        </Suggestion>
      </SuggestionGroup>

      <!-- Then related styles -->
      <SuggestionGroup label="Related">
        <Suggestion>Salsa Bachata Fusion</Suggestion>
        <Suggestion>Mambo (NY Style)</Suggestion>
      </SuggestionGroup>
    </SearchSuggestions>
  </SearchBar>
</template>
```

This approach:

1. Shows specific styles in suggestions
2. But when they search "salsa", shows the family overview
3. Helps users discover styles they didn't know about
4. Still works for general "salsa" searches

The key is to:

- Guide users to specific styles
- But not force them to choose immediately
- Show relationships between styles
- Support both beginner and experienced search patterns

Would you like me to show how to implement this improved search behavior?

## Iteration 13

In "salsa" it currently shows "2,500" dancers, what that number means?

## Iteration 13 Answer

Looking at our current data in `mockStyles.ts`, we have:

```typescript
{
  name: "Salsa",
  image: "https://images.unsplash.com/photo-1545959570-a94084071b5d",
  to: "/dance/salsa",
  members: 2500,  // This number
  category: "Latin",
  description: "Popular social dance with Latin American roots",
}
```

You're right to question this - the number is problematic because:

1. It's unclear what it represents:

   - All salsa dancers?
   - Platform users who selected salsa?
   - Active community members?

2. It's misleading because:
   - We also show numbers for specific styles (Cuban: 754, LA: 680, NY: 580)
   - These numbers don't add up logically
   - One person might dance multiple styles

Better approaches could be:

1. **For Dance Family (Salsa)**

   ```typescript
   stats: {
     totalCommunities: 12,      // Number of active communities
     weeklyEvents: 45,          // Events this week
     activeDancers: "2.5K+"     // Active in any salsa style
   }
   ```

2. **For Specific Styles**
   ```typescript
   stats: {
     activeDancers: 754,        // Active in this specific style
     regularEvents: 8,          // Weekly events
     teachers: 12               // Active teachers
   }
   ```

Would you like me to update the data structure to make these numbers more meaningful and accurate?

## Iteration 14

What about fusion styles? like salsa bachata fusion? do we need to show them?

## Iteration 14 Answer
