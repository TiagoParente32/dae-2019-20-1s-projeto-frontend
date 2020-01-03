<template>
  <div>
    <b-container>
      <h1>Produtos</h1>
      <download-csv class="btn btn-primary" :data="produtosCSV" name="produtos.csv">Export CSV</download-csv>
      <nuxt-link to="/produtos/create" class="btn btn link btn-primary">Create a Produto</nuxt-link>

      <hr />
      <b-table
        id="my-table"
        striped
        over
        :items="produtos"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/produtos/${row.item.id}`">Details</nuxt-link>
          <nuxt-link class="btn btn-primary" :to="`/produtos/${row.item.id}/edit`">Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger"
            @click.prevent="deleteProduto(row.item.id)"
          >Delete</button>
        </template>
      </b-table>
      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-container>&emsp;
  </div>
</template>
<script>
import Vue from "vue";
import JsonCSV from "vue-json-csv";

Vue.component("downloadCsv", JsonCSV);
export default {
  data() {
    return {
      fields: ["id", "descricao", "tipo", "valorBase", "actions"],
      produtos: [],
      produtosCSV: [],
      perPage: 5,
      currentPage: 1
    };
  },
  methods: {
    deleteProduto(id) {
      this.$axios({
        method: "delete",
        url: `/api/produtos/${id}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success("Deleted Produto " + id + " successfully!");
          this.getProdutos();
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    getProdutos() {
      this.$axios
        .$get("/api/produtos")
        .then(produtos => {
          this.produtos = produtos;
          this.produtosCSV = produtos;
          //tirar a lista de pagamentos empty
          this.produtosCSV.forEach(function(v) {
            delete v.pagamentos;
          });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  computed: {
    rows() {
      return this.produtos.length;
    }
  },
  created() {
    this.getProdutos();
  }
};
</script>
<style>
</style>
