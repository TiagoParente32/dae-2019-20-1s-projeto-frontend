<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="modalidades" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/modalidades/create" class="btn btn link btn-primary">Create a Modalidade</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index";
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
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
