<template>
  <div>
    <b-container>
      <h1>Escalões</h1>
      <b-table striped over :items="escaloes" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}`">Details</nuxt-link>
          <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}/edit`">Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteEscalao(row.item.id)"
          >Delete</button>
        </template>
      </b-table>
      <nuxt-link to="/escaloes/create" class="btn btn-primary btn-sm">Create a Escalão</nuxt-link>
    </b-container>&emsp;
  </div>
</template>
<script>
export default {
  middleware: "adminOnly",

  data() {
    return {
      fields: [
        { key: "id", sortable: true },
        { key: "nome", sortable: true },
        { key: "modalidadeID", sortable: true },
        { key: "actions", sortable: false }
      ],
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
          this.$toast.success(
            "Deleted Escalão with id " + id + " successfully!"
          );
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
  }
};
</script>
<style>
</style>
