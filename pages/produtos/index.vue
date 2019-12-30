<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="produtos" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/produtos/create">Create a Produto</nuxt-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: ["id", "descricao", "pagamentos", "tipo", "valorBase"],
      produtos: []
    };
  },
  created() {
    this.$axios
      .$get("/api/produtos")
      .then(produtos => {
        this.produtos = produtos;
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
