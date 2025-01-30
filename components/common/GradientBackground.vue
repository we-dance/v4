<template>
  <!-- Animated background -->
  <div class="absolute inset-0">
    <!-- Base background -->
    <div class="absolute inset-0 bg-[hsl(var(--gradient-base))]"></div>

    <!-- Animated blobs -->
    <div class="absolute inset-0">
      <div
        class="absolute w-[900px] h-[600px] -top-[400px] -left-[200px] rounded-[40%_60%_60%_40%_/_70%_30%_70%_30%] bg-[hsl(var(--gradient-1)_/_0.4)] mix-blend-multiply dark:mix-blend-overlay blur-[96px] animate-blob"
      ></div>
      <div
        class="absolute w-[600px] h-[800px] top-[20%] right-[0px] rounded-[40%_60%_30%_70%_/_60%_30%_70%_40%] bg-[hsl(var(--gradient-2)_/_0.4)] mix-blend-multiply dark:mix-blend-overlay blur-[96px] animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute w-[900px] h-[700px] bottom-[-10%] left-[20%] rounded-[60%_40%_30%_70%_/_30%_30%_70%_70%] bg-[hsl(var(--gradient-3)_/_0.4)] mix-blend-multiply dark:mix-blend-overlay blur-[96px] animate-blob animation-delay-4000"
      ></div>
    </div>

    <!-- Subtle noise texture -->
    <div
      class="absolute inset-0 opacity-[0.15] mix-blend-soft-light dark:mix-blend-overlay"
      style="
        background-image: url(&quot;data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4NCjxmaWx0ZXIgaWQ9ImEiIHg9IjAiIHk9IjAiPg0KPGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPg0KPC9maWx0ZXI+DQo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjA1Ii8+DQo8L3N2Zz4=&quot;);
      "
    ></div>
  </div>
</template>
