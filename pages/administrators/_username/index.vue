<template>
  <b-container>
    <h1>Administrador {{administrador.username}}'s Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="administrador.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="administrador.name" readonly></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="administrador.email" readonly></b-form-input>
    <br />
    <nuxt-link :to="`${this.username}/edit`" class="btn btn-primary">Edit</nuxt-link>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      administrador: {}
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
