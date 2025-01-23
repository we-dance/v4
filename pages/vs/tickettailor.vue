<template>
  <div>
    <!-- Hero Section -->
    <section
      class="pt-32 pb-24 bg-gradient-to-br from-purple-600 to-purple-900 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
      ></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            WeDance vs TicketTailor
          </h1>
          <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            More than just tickets - a complete platform to grow your dance
            events and community
          </p>
          <div class="flex justify-center">
            <Button
              size="lg"
              variant="secondary"
              class="text-lg px-12"
              as-child
            >
              <NuxtLink
                to="/register"
                class="flex items-center justify-center gap-2"
              >
                Create Your Event
                <Icon name="ph:arrow-right" class="w-5 h-5" />
              </NuxtLink>
            </Button>
          </div>
          <div class="text-sm text-white/60 mt-4">
            ⚡️ 5-minute setup • No credit card required
          </div>
        </div>
      </div>
    </section>

    <!-- Pain Points Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Common Event Organizer Challenges
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:megaphone" class="w-10 h-10 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Limited Reach</h3>
            <p class="text-gray-600">
              Hard to reach new dancers and grow your community beyond your
              existing network
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon
              name="ph:users-three"
              class="w-10 h-10 text-purple-600 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Community Building</h3>
            <p class="text-gray-600">
              No tools to engage with attendees before and after events
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:chart-line" class="w-10 h-10 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Growth Insights</h3>
            <p class="text-gray-600">
              Missing data about your audience and what drives attendance
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Why Choose WeDance?
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-sm">
            <div class="flex items-center gap-4 mb-6">
              <Icon name="ph:ticket-bold" class="w-8 h-8 text-gray-600" />
              <h3 class="text-2xl font-semibold">TicketTailor</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>Just a ticketing platform</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>No built-in promotion tools</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>Limited attendee engagement</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>Generic event features</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>No dance community focus</span>
              </li>
            </ul>
          </div>
          <div
            class="bg-white rounded-xl p-8 shadow-sm border-2 border-purple-600"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center"
              >
                <Icon
                  name="ph:heart-straight-fill"
                  class="w-5 h-5 text-white"
                />
              </div>
              <h3 class="text-2xl font-semibold">WeDance Platform</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Complete event management suite</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Built-in dance community audience</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Engage attendees & build community</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Dance-specific features & insights</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Lower fees, higher reach</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Comparison -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Simple & Fair Pricing
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <Icon name="ph:ticket-bold" class="w-8 h-8 text-gray-600" />
              <h3 class="text-2xl font-semibold">TicketTailor</h3>
            </div>
            <div class="space-y-4">
              <div>
                <div class="text-sm text-gray-500">Pay as You Sell</div>
                <div class="text-3xl font-bold text-purple-600">€0.70</div>
                <div class="text-sm text-gray-500">per ticket + VAT</div>
              </div>
              <div>
                <div class="text-sm text-gray-500">Bulk Credits</div>
                <div class="text-lg font-semibold text-gray-700">
                  From €0.26
                </div>
                <div class="text-sm text-gray-500">
                  per ticket + VAT (20k credits)
                </div>
              </div>
              <div class="pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-500">Payment Processing</div>
                <div class="text-lg font-semibold text-gray-700">
                  1.5% + €0.25
                </div>
                <div class="text-sm text-gray-500">
                  per transaction (Stripe)
                </div>
              </div>
            </div>
          </div>

          <div class="bg-muted rounded-xl p-8 border-2 border-purple-600">
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center"
              >
                <Icon
                  name="ph:heart-straight-fill"
                  class="w-5 h-5 text-white"
                />
              </div>
              <h3 class="text-2xl font-semibold">WeDance</h3>
            </div>
            <div class="space-y-4">
              <div>
                <div class="text-sm text-gray-500">Simple Pricing</div>
                <div class="text-3xl font-bold text-purple-600">€0.25</div>
                <div class="text-sm text-gray-500">per ticket</div>
              </div>
              <div>
                <div class="text-sm text-gray-500">No Hidden Fees</div>
                <div class="text-lg font-semibold text-gray-700">
                  No Bulk Purchase Required
                </div>
                <div class="text-sm text-gray-500">
                  Same low price for everyone
                </div>
              </div>
              <div class="pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-500">Payment Processing</div>
                <div class="text-lg font-semibold text-gray-700">
                  1.5% + €0.25
                </div>
                <div class="text-sm text-gray-500">
                  per transaction (Stripe)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          Payment processing fees are charged by Stripe and apply to both
          platforms. The rates shown are for standard European cards.
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Everything You Need to Grow
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6">
            <Icon name="ph:ticket" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Smart Ticketing</h3>
            <p class="text-gray-600">
              Multiple ticket types, early bird pricing, and role-based
              registration
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users-three" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Community Tools</h3>
            <p class="text-gray-600">
              Discussion boards, attendee profiles, and direct messaging
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:chart-bar" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Analytics & Insights</h3>
            <p class="text-gray-600">
              Track attendance trends, popular ticket types, and audience
              demographics
            </p>
          </div>
          <div class="p-6">
            <Icon
              name="ph:share-network"
              class="w-8 h-8 text-purple-600 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Marketing Tools</h3>
            <p class="text-gray-600">
              Promo codes, referral tracking, and social media integration
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:check-square" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Check-in App</h3>
            <p class="text-gray-600">
              Fast check-in, real-time attendance tracking, and digital waivers
            </p>
          </div>
          <div class="p-6">
            <Icon
              name="ph:currency-circle-dollar"
              class="w-8 h-8 text-purple-600 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Lower Fees</h3>
            <p class="text-gray-600">
              Keep more of your revenue with our competitive pricing
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to Grow Your Events?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join organizers who are building thriving dance communities with
          WeDance
        </p>
        <div class="flex justify-center">
          <Button size="lg" variant="secondary" class="text-lg px-12" as-child>
            <NuxtLink
              to="/register"
              class="flex items-center justify-center gap-2"
            >
              Create Your Event
              <Icon name="ph:arrow-right" class="w-5 h-5" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
