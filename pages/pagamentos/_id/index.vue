<template>
  <b-container>
    <h4>Pagamento Details</h4>
    <p>Id: {{ pagamento.id }}</p>
    <p>username: {{ pagamento.username }}</p>
    <p>produtoID: {{ pagamento.produtoID }}</p>
    <p>quantidade: {{ pagamento.quantidade }}</p>
    <p>precoFinal: {{ pagamento.precoFinal }}</p>
    <p>estado: {{ pagamento.estado }}</p>
    <p>dataLancamento: {{ pagamento.dataLancamento }}</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      pagamento: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  created() {
    this.$axios
      .$get(`/api/pagamentos/${this.id}`)
      .then(pagamento => (this.pagamento = pagamento || {}));
  }
};
</script>
