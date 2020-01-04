<template>
  <b-container>
    <h1>Edit Produto</h1>
    <label for="type">Tipo:</label>
    <select class="form-control" id="type" name="type" v-model="produto.tipo">
      <option
        v-for="option in optionsTipo"
        :key="option.value"
        v-bind:value="option.value"
      >{{ option.text }}</option>
    </select>
    <label for="descricao">Descrição:</label>
    <b-form-input id="descricao" v-model="produto.descricao"></b-form-input>
    <label for="valorBase">Valor Base:</label>
    <b-form-input id="valorBase" v-model="produto.valorBase"></b-form-input>

    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updateProduto(produto.id)"
    >Submit</button>
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
  middleware: "adminOnly",

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
  methods: {
    updateProduto(id) {
      this.$axios
        .$put(`/api/produtos/${id}`, {
          tipo: this.produto.tipo,
          valorBase: this.produto.valorBase,
          descricao: this.produto.descricao
        })
        .then(modalidades => {
          this.$toast.success("Produto " + id + " updated Sucessfully");
          this.$router.push(`/produtos/${id}`);
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    }
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
