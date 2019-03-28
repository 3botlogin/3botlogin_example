<template>
  <v-app>
    <v-content fill-height>
      <v-layout justify-center fill-height>
        <v-layout column align-center justify-center>
          <router-view/>
        </v-layout>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import main from "./bus.js";
export default {
  name: "App",
  mounted() {
    main.$on("gotUser", user => {
      console.log(user);
      this.$router.push({ name: "profile", params: { user: user } });
    });
  }
};
</script>
<style>
#app {
  background: url("./assets/background.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
