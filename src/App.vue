<template>
  <v-app>
    <v-app-bar app>
      <my-header />
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";

export default {
  name: 'App',

  components: {
    MyHeader
  },

  data: () => ({
  }),
};
</script>
