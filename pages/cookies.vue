<template>
  <div class="container py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-4">Cookie Policy</h1>
    <p class="text-xl text-muted-foreground mb-4">
      Last updated: March 20, 2024
    </p>
    <p class="text-muted-foreground mb-16">
      This policy explains how WeDance uses cookies and similar technologies to
      recognize you when you visit our platform.
    </p>

    <div class="prose prose-muted max-w-none space-y-12">
      <section>
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </p>
      </section>

      <section>
        <h2>How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for the operation of
            our platform. They include cookies that enable you to log into
            secure areas.
          </li>
          <li>
            <strong>Analytical Cookies:</strong> Allow us to recognize and count
            the number of visitors and see how visitors move around our
            platform.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> Used to recognize you when
            you return to our platform. This enables us to personalize our
            content.
          </li>
          <li>
            <strong>Targeting Cookies:</strong> Record your visit to our
            platform, the pages you have visited, and the links you have
            followed.
          </li>
        </ul>
      </section>

      <section>
        <h2>Types of Cookies We Use</h2>
        <div class="not-prose">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Session Cookies</TableCell>
                <TableCell>Enable core functionality</TableCell>
                <TableCell>Expire when browser closes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Persistent Cookies</TableCell>
                <TableCell>Remember preferences</TableCell>
                <TableCell>1 year</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Authentication</TableCell>
                <TableCell>Keep you logged in</TableCell>
                <TableCell>30 days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Analytics</TableCell>
                <TableCell>Improve our service</TableCell>
                <TableCell>2 years</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2>Your Cookie Choices</h2>
        <p>
          You can control and/or delete cookies as you wish. You can delete all
          cookies that are already on your computer and you can set most
          browsers to prevent them from being placed.
        </p>
        <div class="not-prose mt-6">
          <Button>Manage Cookie Preferences</Button>
        </div>
      </section>

      <section>
        <h2>Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use various third-party
          cookies to report usage statistics of the platform and deliver
          advertisements on and through the platform.
        </p>
      </section>

      <section>
        <h2>How to Control Cookies</h2>
        <p>
          Most browsers allow you to control cookies through their settings
          preferences. However, if you limit the ability of websites to set
          cookies, you may worsen your overall user experience.
        </p>
      </section>

      <section>
        <h2>Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time in order to reflect
          changes to the cookies we use or for other operational, legal, or
          regulatory reasons.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions about our use of cookies or other technologies,
          please
          <NuxtLink to="/contact" class="text-primary hover:underline"
            >contact us</NuxtLink
          >.
        </p>
      </section>

      <section>
        <h2>Related Policies</h2>
        <ul>
          <li>
            <NuxtLink to="/privacy" class="text-primary hover:underline"
              >Privacy Policy</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/terms" class="text-primary hover:underline"
              >Terms of Service</NuxtLink
            >
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
