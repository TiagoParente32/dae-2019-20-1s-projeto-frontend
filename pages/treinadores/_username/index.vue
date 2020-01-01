<template>
  <b-container>
    <h1>Treinador Details</h1>
    <h4>{{ treinador.username }}</h4>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="treinador.name" readonly></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="treinador.email" readonly></b-form-input>
    <hr />
    <h1>Modalidades</h1>
    <b-table
      v-if="modalidades.length"
      striped
      over
      :items="modalidades"
      :fields="modalidadesFields"
    ></b-table>
    <p v-else>No uploaded Modalidades.</p>
    <hr />
    <h1>Escaloes</h1>
    <b-table v-if="escaloes.length" striped over :items="escaloes" :fields="modalidadesFields"></b-table>
    <p v-else>No uploaded Escaloes.</p>
    <hr />
    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No uploaded Horarios.</p>
    <hr />
    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="fields"></b-table>
    <p v-else>No uploaded Atletas.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      treinador: {},
      modalidadesFields: ["id", "nome"],
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      fields: ["username", "name", "email"]
    };
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    modalidades() {
      return this.treinador.modalidades || [];
    },
    atletas() {
      return this.treinador.atletas || [];
    },
    horarios() {
      return this.treinador.horarios || [];
    },
    escaloes() {
      return this.treinador.escaloes || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/treinadores/${this.username}`)
      .then(treinador => (this.treinador = treinador || {}));
  }
};
</script>
