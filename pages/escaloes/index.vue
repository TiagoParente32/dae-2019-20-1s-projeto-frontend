<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <h1>Escaloes</h1>
      <b-table striped over :items="escaloes" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/escaloes/${row.item.id}`">Details</nuxt-link>
          <nuxt-link class="btn btn-primary" :to="`/escaloes/${row.item.id}/edit`">Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteEscalao(row.item.id)"
          >Delete</button>
        </template>
      </b-table>
      <nuxt-link to="/escaloes/create" class="btn btn link btn-primary">Create a Escalao</nuxt-link>
    </b-container>&emsp;
  </div>
</template>
<script>
import StartPage from "../index";
export default {
  data() {
    return {
      fields: ["id", "nome", "modalidadeID", "actions"],
      escaloes: []
    };
  },
  methods: {
    deleteEscalao(id) {
      this.$axios({
        method: "delete",
        url: `/api/escaloes/${id}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success("Deleted Modalidade " + id + " successfully!");
          this.getEscaloes();
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    getEscaloes() {
      this.$axios
        .$get("/api/escaloes")
        .then(escaloes => {
          this.escaloes = escaloes;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    this.getEscaloes();
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
