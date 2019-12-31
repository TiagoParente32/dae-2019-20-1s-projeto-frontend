<template>
  <b-container>
    <h1>Pagamento Details</h1>
    <h4>Id: {{ pagamento.id }}</h4>
    <label for="username">User:</label>
    <b-form-input id="username" v-model="pagamento.username" readonly></b-form-input>
    <label for="prod">Produto Id:</label>
    <b-form-input id="prod" v-model="pagamento.produtoID" readonly></b-form-input>
    <label for="quantidade">Quantidade:</label>
    <b-form-input id="quantidade" v-model="pagamento.quantidade" readonly></b-form-input>
    <label for="precoFinal">precoFinal:</label>
    <b-form-input id="precoFinal" v-model="pagamento.precoFinal" readonly></b-form-input>
    <label for="estado">estado:</label>
    <b-form-input id="estado" v-model="pagamento.estado" readonly></b-form-input>
    <label for="dataLancamento">dataLancamento:</label>
    <b-form-input id="dataLancamento" v-model="pagamento.dataLancamento" readonly></b-form-input>
    <br />
    <nuxt-link :to="`${this.id}/edit`" class="btn btn link btn-primary">Edit</nuxt-link>
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
