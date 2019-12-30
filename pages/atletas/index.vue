<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="atletas" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/atletas/${row.item.username}`">Details</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteAtleta(row.item.username)"
          >Delete</button>
        </template>
      </b-table>
    </b-container>&emsp;
    <nuxt-link to="/atletas/create" class="btn btn link btn-primary">Create an Atleta</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index.vue";
export default {
  data() {
    return {
      fields: ["username", "name", "email", "actions"],
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
          console.log("Deleted Atleta " + username + " successfully!");
          this.getAtletas();
        })
        .catch(function(error) {
          console.log(error);
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
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
