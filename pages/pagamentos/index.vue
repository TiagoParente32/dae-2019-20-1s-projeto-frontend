<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="pagamentos" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/pagamentos/${row.item.id}`">Details</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deletePagamento(row.item.id)"
          >Delete</button>
        </template>
      </b-table>
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
        "dataLancamento",
        "actions"
      ],
      pagamentos: []
    };
  },
  methods: {
    deletePagamento(id) {
      this.$axios({
        method: "delete",
        url: `/api/pagamentos/${id}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success("Deleted Pagamento " + id + " successfully!");
          this.getPagamentos();
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    getPagamentos() {
      this.$axios
        .$get("/api/pagamentos")
        .then(pagamentos => {
          this.pagamentos = pagamentos;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    this.getPagamentos();
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
