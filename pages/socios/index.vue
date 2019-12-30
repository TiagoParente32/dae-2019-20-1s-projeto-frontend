<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="socios" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/socios/create" class="btn btn link btn-primary">Create a Sócio</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index";

export default {
  data() {
    return {
      fields: ["username", "name", "email"],
      socios: []
    };
  },
  created() {
    this.$axios
      .$get("/api/socios")
      .then(socios => {
        this.socios = socios;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
