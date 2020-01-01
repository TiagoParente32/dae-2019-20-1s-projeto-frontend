<template>
  <b-container>
    <h1>escalao Details</h1>
    <p>Id: {{ escalao.id }}</p>
    <p>Nome: {{ escalao.nome }}</p>

    <nuxt-link :to="`${this.id}/edit`" class="btn btn link btn-primary">Edit</nuxt-link>

    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No uploaded horarios.</p>
    <hr />
    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="userFields"></b-table>
    <p v-else>No uploaded atletas.</p>
    <hr />
    <h1>Treinadores</h1>
    <b-table v-if="treinadores.length" striped over :items="treinadores" :fields="userFields"></b-table>
    <p v-else>No uploaded treinadores.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      escalao: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      userFields: ["username", "name", "email"],
      escaloesFields: ["id", "nome"]
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    horarios() {
      return this.escalao.horarios || [];
    },
    atletas() {
      return this.escalao.atletas || [];
    },
    treinadores() {
      return this.escalao.treinadores || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/escaloes/${this.id}`)
      .then(escalao => (this.escalao = escalao || {}));
  }
};
</script>
