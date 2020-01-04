<template>
  <div>
    <b-container>
      <h1>Administradores</h1>
      <!-- try to remove :fields=”fields” to see the magic -->
      <nuxt-link to="/administrators/create" class="btn btn-primary">Create an Administrator</nuxt-link>
      <br />
      <br />
      <b-table striped over :items="administrators" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link
            class="btn btn-primary btn-sm"
            :to="`/administrators/${row.item.username}`"
          >Details</nuxt-link>
          <nuxt-link
            class="btn btn-primary btn-sm"
            :to="`/administrators/${row.item.username}/edit`"
          >Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteAdmin(row.item.username)"
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
      administrators: []
    };
  },
  methods: {
    deleteAdmin(username) {
      this.$axios({
        method: "delete",
        url: `/api/administradores/${username}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success(
            "Deleted Administrator " + username + " successfully!"
          );
          this.getAdmins();
        })
        .catch(function(error) {
          this.$toast.error(error);
          console.log(error);
        });
    },
    getAdmins() {
      this.$axios
        .$get("/api/administradores")
        .then(administrators => {
          this.administrators = administrators;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    this.getAdmins();
  }
};
</script>
<style>
</style>
