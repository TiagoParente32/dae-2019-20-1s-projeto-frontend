<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="pagamentos" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/pagamentos/create" class="btn btn link btn-primary">Create a Pagamento</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index";

export default {
  data() {
    return {
      fields: [
        "id",
        "estado",
        "username",
        "produtoID",
        "precoFinal",
        "quantidade",
        "dataLancamento"
      ],
      pagamentos: []
    };
  },
  created() {
    this.$axios
      .$get("/api/pagamentos")
      .then(pagamentos => {
        this.pagamentos = pagamentos;
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
