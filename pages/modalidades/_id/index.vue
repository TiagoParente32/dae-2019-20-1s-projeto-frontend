<template>
  <b-container>
    <h4>Modalidade Details</h4>
    <p>Id: {{ modalidade.id }}</p>
    <p>Nome: {{ modalidade.nome }}</p>

    <h4>Horarios</h4>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No uploaded horarios.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      modalidade: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"]
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    horarios() {
      return this.modalidade.horarios || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/modalidades/${this.id}`)
      .then(modalidade => (this.modalidade = modalidade || {}));
  }
};
</script>
