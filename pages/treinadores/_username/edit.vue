<template>
  <b-container>
    <h1>Treinador {{treinador.username}} Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="treinador.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="treinador.name"></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="treinador.email"></b-form-input>
    <label for="newPasswd">New Password:</label>
    <b-form-input id="newPasswd" v-model="newPasswd" type="password"></b-form-input>
    <label for="newPasswdC">New Password Confirmation:</label>
    <b-form-input id="newPasswdC" v-model="newPasswdC" type="password"></b-form-input>
    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updateTreinador(treinador.username)"
    >Submit</button>
    <hr />
    <h1>Modalidades</h1>
    <b-table v-if="modalidades.length" over :items="modalidades" :fields="modalidadesFields"></b-table>
    <p v-else>No Modalidades Found.</p>
    <hr />
    <h1>Escaloes</h1>
    <b-table v-if="escaloes.length" striped over :items="escaloes" :fields="escaloesFields"></b-table>
    <p v-else>No Escalões Found.</p>
    <hr />
    <h1>Horários</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No Horários Found.</p>
    <hr />
    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="fields"></b-table>
    <p v-else>No Atletas Found.</p>
  </b-container>
</template>

<script>
export default {
  middleware: "adminOnly",

  data() {
    return {
      treinador: {},
      newPasswd: null,
      newPasswdC: null,
      modalidadesFields: ["id", "nome"],
      escaloesFields: ["id", "nome", "modalidadeID"],

      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      fields: ["username", "name", "email"]
    };
  },
  methods: {
    updateTreinador(username) {
      if (this.newPasswd != null && this.newPasswdC != null) {
        if (this.newPasswd != this.newPasswdC) {
          this.$toast.error("Password And Password Confirmation don't match");
          return;
        }
        this.treinador.password = this.newPasswd;
      } else {
        this.treinador.password = null;
      }

      this.$axios
        .$put(`/api/treinadores/${username}`, {
          username: this.treinador.username,
          password: this.treinador.password,
          name: this.treinador.name,
          email: this.treinador.email
        })
        .then(modalidades => {
          this.$toast.success("Treinador " + username + " updated Sucessfully");
          this.$router.push(`/treinadores/${username}`);
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    }
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    modalidades() {
      return this.treinador.modalidades || [];
    },
    atletas() {
      return this.treinador.atletas || [];
    },
    horarios() {
      return this.treinador.horarios || [];
    },
    escaloes() {
      return this.treinador.escaloes || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/treinadores/${this.username}`)
      .then(treinador => (this.treinador = treinador || {}));
  }
};
</script>

<style>
</style>
