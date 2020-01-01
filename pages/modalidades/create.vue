<template>
  <form @submit.prevent="create">
    <h1>Create Modalidade</h1>
    <label for="id">Id:</label>
    <b-form-input id="id" v-model="id"></b-form-input>

    <label for="nome">Nome:</label>
    <b-form-input id="nome" v-model="nome"></b-form-input>
    <hr />
    <nuxt-link to="/modalidades">Return</nuxt-link>
    <b-button class="btn-warning" type="reset">RESET</b-button>
    <b-button class="btn-success" @click.prevent="create">CREATE</b-button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      nome: null
    };
  },
  methods: {
    create() {
      this.$axios
        .$post("/api/modalidades", {
          id: this.id,
          nome: this.nome
        })
        .then(() => {
          this.$router.push("/modalidades");
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
};
</script>
