<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="modalidades" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/modalidades/create">Create a Modalidade</nuxt-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: ["id", "nome", "horarios"],
      modalidades: []
    };
  },
  created() {
    this.$axios
      .$get("/api/modalidades")
      .then(modalidades => {
        console.log(modalidades);
        this.modalidades = modalidades;
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
