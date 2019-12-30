<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="treinadores" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/treinadores/create" class="btn btn link btn-primary">Create a Treinador</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index";

export default {
  data() {
    return {
      fields: ["username", "name", "email"],
      treinadores: []
    };
  },
  created() {
    this.$axios
      .$get("/api/treinadores")
      .then(treinadores => {
        this.treinadores = treinadores;
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
