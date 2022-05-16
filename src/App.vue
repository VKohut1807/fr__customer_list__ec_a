<template>
  <v-app>
    <v-app-bar app>
      <v-header />
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VHeader from "@/components/VHeader.vue";

export default {
  name: 'App',

  components: {
    VHeader
  },

  data: () => ({
  }),
};
</script>
