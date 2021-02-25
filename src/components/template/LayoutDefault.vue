<template>
  <div class="LayoutDefault">
    <nav class="LayoutDefault__nav">
      <h1>suff</h1>
    </nav>
    <main class="LayoutDefault__main">
      <slot />
    </main>
    <footer class="LayoutDefault__footer">
      <v-bottom-navigation v-model="value" :background-color="color" dark shift>
        <v-btn>
          <span>Meet-Up</span>
          <v-icon>mdi-sword-cross</v-icon>
        </v-btn>
        <v-btn>
          <span>Collection</span>
          <v-icon>mdi-library-shelves</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </footer>
  </div>
</template>
