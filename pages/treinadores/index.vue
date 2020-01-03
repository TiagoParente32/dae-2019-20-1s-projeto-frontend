<template>
  <div>
    <b-container>
      <h1>Treinadores</h1>
      <b-table striped over :items="treinadores" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}`">Details</nuxt-link>
          <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}/edit`">Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteTreinador(row.item.username)"
          >Delete</button>
        </template>
      </b-table>
      <nuxt-link to="/treinadores/create" class="btn btn-primary">Create a Treinador</nuxt-link>
    </b-container>&emsp;
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: ["username", "name", "email", "actions"],
      treinadores: []
    };
  },
  methods: {
    deleteTreinador(username) {
      this.$axios({
        method: "delete",
        url: `/api/treinadores/${username}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success(
            "Deleted Treinador " + username + " successfully!"
          );
          this.getTreinadores();
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    getTreinadores() {
      this.$axios
        .$get("/api/treinadores")
        .then(treinadores => {
          this.treinadores = treinadores;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    this.getTreinadores();
  }
};
</script>
<style>
</style>
