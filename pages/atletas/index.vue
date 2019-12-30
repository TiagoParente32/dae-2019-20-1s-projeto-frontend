<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="atletas" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/atletas/create">Create a Atleta</nuxt-link>
  </div>
</template>
<script>
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
  }
};
</script>
<style>
</style>
