<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="produtos" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/produtos/${row.item.id}`">Details</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteProduto(row.item.id)"
          >Delete</button>
        </template>
      </b-table>
    </b-container>&emsp;
    <nuxt-link to="/produtos/create" class="btn btn link btn-primary">Create a Produto</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index";

export default {
  data() {
    return {
      fields: ["id", "descricao", "tipo", "valorBase", "actions"],
      produtos: []
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
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    this.getProdutos();
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
