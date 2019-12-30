<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="administrators" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/administrators/${row.item.username}`">Details</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteAdmin(row.item.username)"
          >Delete</button>
        </template>
      </b-table>
    </b-container>&emsp;
    <nuxt-link to="/administrators/create" class="btn btn link btn-primary">Create an Administrator</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index.vue";
export default {
  data() {
    return {
      fields: ["username", "name", "email", "actions"],
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
          console.log("Deleted Administrator " + username + " successfully!");
          this.getAdmins();
        })
        .catch(function(error) {
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
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
