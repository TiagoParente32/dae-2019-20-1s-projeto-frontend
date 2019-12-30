<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="socios" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/socios/${row.item.username}`">Details</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteSocio(row.item.username)"
          >Delete</button>
        </template>
      </b-table>
    </b-container>&emsp;
    <nuxt-link to="/socios/create" class="btn btn link btn-primary">Create a Sócio</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index";

export default {
  data() {
    return {
      fields: ["username", "name", "email", "actions"],
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
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
