<template>
  <v-container>
    <v-row>
      <v-col class="text-center mt-5">
        <div class="d-flex flex-column justify-space-between align-center mb-5">
          <v-img
            contain
            lazy-src="../assets/sm-header.png"
            max-height="196"
            max-width="302"
            src="../assets/sm.png"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row> </template
          ></v-img>
        </div>
        <blockquote class="blockquote">
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {}
</script>
