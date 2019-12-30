<template>
  <b-container>
    <h4>Modalidade Details</h4>
    <p>Id: {{ modalidade.id }}</p>
    <p>Nome: {{ modalidade.nome }}</p>
    <p>Horarios: {{ modalidade.horarios }}</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      modalidade: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    subjects() {
      return this.modalidade.subjects || [];
    },
    documents() {
      return this.modalidade.documents || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/modalidades/${this.id}`)
      .then(modalidade => (this.modalidade = modalidade || {}));
  }
};
</script>
