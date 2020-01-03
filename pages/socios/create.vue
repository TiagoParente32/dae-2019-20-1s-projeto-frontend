<template>
  <form @submit.prevent="create">
    <h1>Create Sócio</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="username"></b-form-input>

    <label for="password">Password:</label>
    <b-form-input id="password" v-model="password"></b-form-input>

    <label for="name">Name:</label>
    <b-form-input id="name" v-model="name"></b-form-input>

    <label for="email">E-mail:</label>
    <b-form-input id="email" v-model="email"></b-form-input>
    <hr />
    <nuxt-link class="btn-primary" to="/socios">Return</nuxt-link>
    <b-button class="btn-warning" type="reset">RESET</b-button>
    <b-button class="btn-success" @click.prevent="create">CREATE</b-button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      name: null,
      email: null
    };
  },
  methods: {
    create() {
      this.$axios
        .$post("/api/socios", {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email
        })
        .then(() => {
          this.$router.push("/socios");
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
};
</script>
