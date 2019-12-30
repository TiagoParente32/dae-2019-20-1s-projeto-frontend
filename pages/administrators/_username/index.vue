<template>
  <b-container>
    <h4>Administrador Details</h4>
    <p>Username: {{ administrador.username }}</p>
    <p>Name: {{ administrador.name }}</p>
    <p>Email: {{ administrador.email }}</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      administrador: {},
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
      return this.administrador.subjects || [];
    },
    documents() {
      return this.administrador.documents || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/administradores/${this.username}`)
      .then(administrador => (this.administrador = administrador || {}));
  }
};
</script>
