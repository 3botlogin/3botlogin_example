<template>
  <v-app>
    <!--v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat exact :to="{name: 'home'}">home</v-btn>
      <v-btn flat exact :to="{name: 'login'}">login</v-btn>
      <v-btn flat exact :to="{name: 'profile'}">profile</v-btn>
    </v-toolbar-->

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
