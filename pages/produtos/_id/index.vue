<template>
  <b-container>
    <h4>Produto Details</h4>
    <p>Id: {{ produto.id }}</p>
    <p>tipo: {{ produto.tipo }}</p>
    <p>descricao: {{ produto.descricao }}</p>
    <p>valorBase: {{ produto.valorBase }}</p>
    <p>pagamentos: {{ produto.pagamentos }}</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      produto: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  created() {
    this.$axios
      .$get(`/api/produtos/${this.id}`)
      .then(produto => (this.produto = produto || {}));
  }
};
</script>
