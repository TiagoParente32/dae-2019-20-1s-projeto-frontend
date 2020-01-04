<template>
  <div>
    <b-container>
      <h1>Atletas</h1>
      <nuxt-link to="/atletas/create" class="btn btn link btn-primary">Create an Atleta</nuxt-link>
      <br />
      <br />
      <b-table striped over :items="atletas" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-primary btn-sm" :to="`/atletas/${row.item.username}`">Details</nuxt-link>
          <nuxt-link class="btn btn-primary btn-sm" :to="`/atletas/${row.item.username}/edit`">Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteAtleta(row.item.username)"
          >Delete</button>
        </template>
      </b-table>
    </b-container>&emsp;
  </div>
</template>
<script>
export default {
  middleware: "adminOnly",

  data() {
    return {
      fields: [
        { key: "username", sortable: true },
        { key: "name", sortable: true },
        { key: "email", sortable: true },
        { key: "actions", sortable: false }
      ],
      atletas: []
    };
  },
  methods: {
    deleteAtleta(username) {
      this.$axios({
        method: "delete",
        url: `/api/atletas/${username}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success("Deleted Atleta " + username + " successfully!");
          this.getAtletas();
        })
        .catch(function(error) {
          this.$toast.success(error);
          //console.log(error);
        });
    },
    getAtletas() {
      this.$axios
        .$get("/api/atletas")
        .then(atletas => {
          this.atletas = atletas;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    this.getAtletas();
  }
};
</script>
<style>
</style>
