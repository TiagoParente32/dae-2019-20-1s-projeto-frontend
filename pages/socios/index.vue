<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="socios" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/socios/create">Create a Atleta</nuxt-link>
  </div>
</template>
<script>
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
  }
};
</script>
<style>
</style>
