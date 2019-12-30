<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="atletas" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/atletas/create" class="btn btn link btn-primary">Create an Atleta</nuxt-link>
  </div>
</template>
<script>
  import StartPage from "../index.vue";
export default {
  data() {
    return {
      fields: ["username", "name", "email"],
      atletas: []
    };
  },
  created() {
    this.$axios
      .$get("/api/atletas")
      .then(atletas => {
        this.atletas = atletas;
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
