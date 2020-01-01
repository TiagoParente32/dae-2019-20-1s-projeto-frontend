<template>
  <form @submit.prevent="create">
    <h1>Create Escalao</h1>
    <div>
      id:
      <input v-model="id" type="text" />
    </div>
    <div>
      nome:
      <input v-model="nome" type="text" />
    </div>
    <label for="username">Modalidade:</label>
    <select class="form-control" id="category_id" name="category" v-model="modalidadeID">
      <option
        v-for="modalidade in AllModalidades"
        :key="modalidade.nome"
        v-bind:value="modalidade.id"
      >{{ modalidade.nome }}</option>
    </select>
    <nuxt-link to="/escaloes">Return</nuxt-link>
    <button type="reset">RESET</button>
    <button @click.prevent="create">CREATE</button>
  </form>
</template>
<script>
export default {
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
