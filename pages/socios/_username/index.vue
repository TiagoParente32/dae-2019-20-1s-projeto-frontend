<template>
  <b-container>
    <h4>Socio Details</h4>
    <p>Username: {{ socio.username }}</p>
    <p>Name: {{ socio.name }}</p>
    <p>Email: {{ socio.email }}</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      socio: {},
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
      return this.socio.subjects || [];
    },
    documents() {
      return this.socio.documents || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/socios/${this.username}`)
      .then(socio => (this.socio = socio || {}));
  }
};
</script>
