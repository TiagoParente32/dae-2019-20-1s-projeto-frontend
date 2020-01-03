<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <h1>Modalidades</h1>
      <b-table striped over :items="modalidades" :fields="fields">
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-primary btn-sm" :to="`/modalidades/${row.item.id}`">Details</nuxt-link>
          <nuxt-link class="btn btn-primary btn-sm" :to="`/modalidades/${row.item.id}/edit`">Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deleteModalidade(row.item.id)"
          >Delete</button>
        </template>
      </b-table>
      <nuxt-link to="/modalidades/create" class="btn btn-primary">Create a Modalidade</nuxt-link>
    </b-container>&emsp;
  </div>
</template>
<script>
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
          this.$toast.success("Deleted Modalidade " + id + " successfully!");
          this.getModalidades();
        })
        .catch(function(error) {
          this.$toast.error(error);
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
  }
};
</script>
<style>
</style>
