<template>
  <b-container>
    <h1>Modalidade Details</h1>
    <p>Id: {{ modalidade.id }}</p>
    <p>Nome: {{ modalidade.nome }}</p>

    <nuxt-link :to="`${this.id}/edit`" class="btn btn link btn-primary">Edit</nuxt-link>

    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No uploaded horarios.</p>

    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="userFields"></b-table>
    <p v-else>No uploaded atletas.</p>

    <h1>Treinadores</h1>
    <b-table v-if="treinadores.length" striped over :items="treinadores" :fields="userFields"></b-table>
    <p v-else>No uploaded treinadores.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      modalidade: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      userFields: ["username", "name", "email"]
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    horarios() {
      return this.modalidade.horarios || [];
    },
    atletas() {
      return this.modalidade.atletas || [];
    },
    treinadores() {
      return this.modalidade.treinadores || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/modalidades/${this.id}`)
      .then(modalidade => (this.modalidade = modalidade || {}));
  }
};
</script>
