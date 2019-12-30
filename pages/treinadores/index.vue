<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="treinadores" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/treinadores/create">Create a Atleta</nuxt-link>
  </div>
</template>
<script>
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
  }
};
</script>
<style>
</style>
