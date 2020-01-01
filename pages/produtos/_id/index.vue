<template>
  <b-container>
    <h1>Produto Details</h1>
    <h4>Id: {{ produto.id }}</h4>
    <label for="tipo">Tipo:</label>
    <b-form-input id="tipo" v-model="produto.tipo" readonly></b-form-input>
    <label for="descricao">Descrição:</label>
    <b-form-input id="descricao" v-model="produto.descricao" readonly></b-form-input>
    <label for="valorBase">Valor Base:</label>
    <b-form-input id="valorBase" v-model="produto.valorBase" readonly></b-form-input>
    <br />
    <nuxt-link :to="`${this.id}/edit`" class="btn btn link btn-primary">Edit</nuxt-link>
    <hr />
    <h1>Pagamentos</h1>
    <b-table v-if="pagamentos.length" striped over :items="pagamentos" :fields="pagamentosFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/pagamentos/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary" :to="`/pagamentos/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded pagamentos.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      produto: {},
      optionsTipo: [
        { text: "Artigo Desportivo", value: "ARTIGO_DESPORTIVO" },
        { text: "Seguro", value: "SEGURO" },
        { text: "Graduação", value: "GRADUACAO" },
        { text: "Inscrição", value: "INSCRICAO" },
        { text: "Quota", value: "QUOTA" },
        { text: "Aula", value: "AULA" },
        { text: "Estagio", value: "ESTAGIO" },
        { text: "Outro", value: "OUTRO" }
      ],
      pagamentosFields: [
        "id",
        "estado",
        "username",
        "produtoID",
        "precoFinal",
        "quantidade",
        "dataLancamento",
        "actions"
      ]
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    pagamentos() {
      return this.produto.pagamentos || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/produtos/${this.id}`)
      .then(produto => (this.produto = produto || {}));
  }
};
</script>
