<template>
  <div class="LayoutAuthorized">
    <nav class="LayoutAuthorized__nav">
      <h1>stuff authorized</h1>
    </nav>
    <main class="LayoutAuthorized__main">
      <slot />
    </main>
    <footer class="LayoutAuthorized__footer">
      <v-bottom-navigation v-model="value" :background-color="color" dark shift>
        <v-btn to="/">
          <span>Meet-Up</span>
          <v-icon>mdi-sword-cross</v-icon>
        </v-btn>
        <v-btn to="about">
          <span>Collection</span>
          <v-icon>mdi-library-shelves</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </footer>
  </div>
</template>
