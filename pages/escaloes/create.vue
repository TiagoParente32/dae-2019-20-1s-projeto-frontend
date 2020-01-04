<template>
  <form @submit.prevent="create">
    <h1>Create Escalão</h1>
    <label for="id">Id:</label>
    <b-form-input id="id" v-model="id"></b-form-input>

    <label for="nome">Nome:</label>
    <b-form-input id="nome" v-model="nome"></b-form-input>
    <label for="username">Modalidade:</label>
    <select class="form-control" id="category_id" name="category" v-model="modalidadeID">
      <option
        v-for="modalidade in AllModalidades"
        :key="modalidade.nome"
        v-bind:value="modalidade.id"
      >{{ modalidade.nome }}</option>
    </select>
    <hr />
    <nuxt-link class="btn btn-primary" to="/escaloes">Return</nuxt-link>
    <b-button class="btn-warning" type="reset">RESET</b-button>
    <b-button class="btn-success" @click.prevent="create">CREATE</b-button>
  </form>
</template>
<script>
export default {
  middleware: "adminOnly",

  data() {
    return {
      id: null,
      nome: null,
      modalidadeID: null,
      AllModalidades: null
    };
  },
  methods: {
    create() {
      this.$axios
        .$post("/api/escaloes", {
          id: this.id,
          nome: this.nome,
          modalidadeID: this.modalidadeID
        })
        .then(() => {
          this.$router.push("/escaloes");
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    getModalidades() {
      console.log("elo");
      this.$axios
        .$get(`/api/modalidades`)
        .then(modalidades => (this.AllModalidades = modalidades || {}));
    }
  },
  created() {
    this.getModalidades();
  }
};
</script>
