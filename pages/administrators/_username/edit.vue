<template>
  <b-container>
    <h1>Administrador Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="administrador.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="administrador.name"></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="administrador.email"></b-form-input>
    <label for="newPasswd">New Password:</label>
    <b-form-input id="newPasswd" v-model="newPasswd" type="password"></b-form-input>
    <label for="newPasswdC">New Password Confirmation:</label>
    <b-form-input id="newPasswdC" v-model="newPasswdC" type="password"></b-form-input>
    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updateAdministrator(administrador.username)"
    >Submit</button>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      administrador: {},
      newPasswd: null,
      newPasswdC: null
    };
  },
  methods: {
    updateAdministrator(username) {
      if (this.newPasswd != null && this.newPasswdC != null) {
        if (this.newPasswd != this.newPasswdC) {
          this.$toast.error("Password And Password Confirmation dont match");
          return;
        }
        this.administrador.password = this.newPasswd;
      } else {
        this.administrador.password = null;
      }

      this.$axios
        .$put(`/api/administradores/${username}`, {
          username: this.administrador.username,
          password: this.administrador.password,
          name: this.administrador.name,
          email: this.administrador.email
        })
        .then(modalidades => {
          this.$toast.success(
            "administrador " + username + " updated Sucessfully"
          );
          this.$router.push(`/administrators/${username}`);
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    }
  },
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  created() {
    this.$axios
      .$get(`/api/administradores/${this.username}`)
      .then(administrador => (this.administrador = administrador || {}));
  }
};
</script>

<style>
</style>
