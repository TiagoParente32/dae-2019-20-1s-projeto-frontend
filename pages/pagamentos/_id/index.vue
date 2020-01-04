<template>
  <b-container>
    <h1>Pagamento Details</h1>
    <h4>Id: {{ pagamento.id }}</h4>
    <label for="username">User:</label>
    <b-form-input id="username" v-model="pagamento.username" readonly></b-form-input>
    <label for="prod">Produto ID:</label>
    <b-form-input id="prod" v-model="pagamento.produtoID" readonly></b-form-input>
    <label for="quantidade">Quantidade:</label>
    <b-form-input id="quantidade" v-model="pagamento.quantidade" readonly></b-form-input>
    <label for="precoFinal">Preço Final:</label>
    <b-form-input id="precoFinal" v-model="pagamento.precoFinal" readonly></b-form-input>
    <label for="estado">Estado:</label>
    <b-form-input id="estado" v-model="pagamento.estado" readonly></b-form-input>
    <label for="dataLancamento">Data Lançamento:</label>
    <b-form-input id="dataLancamento" v-model="pagamento.dataLancamento" readonly></b-form-input>
    <br />
    <nuxt-link :to="`${this.id}/edit`" class="btn btn-primary">Edit</nuxt-link>
  </b-container>
</template>
<script>
export default {
  middleware: "adminOnly",

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
