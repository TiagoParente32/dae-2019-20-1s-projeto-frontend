<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="modalidades" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-link" :to="`/modalidades/${row.item.id}`">Details</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteModalidade(row.item.id)"
          >Delete</button>
        </template>
      </b-table>
    </b-container>&emsp;
    <nuxt-link to="/modalidades/create" class="btn btn link btn-primary">Create a Modalidade</nuxt-link>
  </div>
</template>
<script>
import StartPage from "../index";
export default {
  data() {
    return {
      fields: ["id", "nome", "actions"],
      modalidades: []
    };
  },
  methods: {
    deleteModalidade(id) {
      this.$axios({
        method: "delete",
        url: `/api/modalidades/${id}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          console.log("Deleted Modalidade " + id + " successfully!");
          this.getModalidades();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getModalidades() {
      this.$axios
        .$get("/api/modalidades")
        .then(modalidades => {
          this.modalidades = modalidades;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    this.getModalidades();
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
