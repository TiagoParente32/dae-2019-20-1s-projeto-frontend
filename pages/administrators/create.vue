<template>
  <b-container>
    <form @submit.prevent="create">
      <h1>Create Administrator</h1>
      <label for="username">Username:</label>
      <b-form-input id="username" v-model="username"></b-form-input>

      <label for="password">Password:</label>
      <b-form-input id="password" v-model="password"></b-form-input>

      <label for="name">Name:</label>
      <b-form-input id="name" v-model="name"></b-form-input>

      <label for="email">E-mail:</label>
      <b-form-input id="email" v-model="email"></b-form-input>
      <hr />
      <nuxt-link class="btn btn-primary btn-sm" to="/administrators">Return</nuxt-link>
      <b-button class="btn-warning btn-sm" type="reset">RESET</b-button>
      <b-button class="btn-success btn-sm" @click.prevent="create">CREATE</b-button>
    </form>
  </b-container>
</template>
<script>
export default {
  middleware: "adminOnly",

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
        .$post("/api/administradores", {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email
        })
        .then(() => {
          this.$toast.success("Administrator created Sucessfully");

          this.$router.push("/administrators");
        })
        .catch(error => {
          // handle error
          this.$toast.error(error);
          console.log(error);
        });
    }
  }
};
</script>
