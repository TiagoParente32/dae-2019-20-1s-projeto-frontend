<template>
  <b-container>
    <h4>Atleta Details</h4>
    <p>Username: {{ atleta.username }}</p>
    <p>Name: {{ atleta.name }}</p>
    <p>Email: {{ atleta.email }}</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      atleta: {},
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
      return this.atleta.subjects || [];
    },
    documents() {
      return this.atleta.documents || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/atletas/${this.username}`)
      .then(atleta => (this.atleta = atleta || {}));
  }
};
</script>
