<template>
  <b-container>
    <h4>Treinador Details</h4>
    <p>Username: {{ treinador.username }}</p>
    <p>Name: {{ treinador.name }}</p>
    <p>Email: {{ treinador.email }}</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      treinador: {},
      subjectFields: [
        "code",
        "name",
        "courseCode",
        " courseYear",
        "scholarYear"
      ],
      documentsFields: ["fileName", "actions"]
    };
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    subjects() {
      return this.treinador.subjects || [];
    },
    documents() {
      return this.treinador.documents || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/treinadores/${this.username}`)
      .then(treinador => (this.treinador = treinador || {}));
  }
};
</script>
