<template>
  <div>
    <b-container>
      <h1>Socios</h1>
      <nuxt-link to="/socios/create" class="btn btn-primary">Create a Sócio</nuxt-link>
      <br />
      <br />
      <b-table striped over :items="socios" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-primary" :to="`/socios/${row.item.username}`">Details</nuxt-link>
          <nuxt-link class="btn btn-primary" :to="`/socios/${row.item.username}/edit`">Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger"
            @click.prevent="deleteSocio(row.item.username)"
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
      socios: []
    };
  },
  methods: {
    deleteSocio(username) {
      this.$axios({
        method: "delete",
        url: `/api/socios/${username}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success("Deleted Socio " + username + " successfully!");
          this.getSocios();
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    getSocios() {
      this.$axios
        .$get("/api/socios")
        .then(socios => {
          this.socios = socios;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    this.getSocios();
  }
};
</script>
<style>
</style>
