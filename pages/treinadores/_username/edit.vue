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
    <!-- <h1>Modalidades</h1>
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
    <p v-else>No Atletas Found.</p>-->
    <h1>Modalidades</h1>
    <b-table v-if="modalidades.length" over :items="modalidades" :fields="modalidadesFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/modalidades/${row.item.id}`">Details</nuxt-link>

        <nuxt-link
          v-if="$auth.user.groups.includes('Administrador')"
          class="btn btn-primary btn-sm"
          :to="`/modalidades/${row.item.id}/edit`"
        >Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Modalidades Found.</p>
    <hr />
    <h1>Escalões</h1>
    <b-table v-if="escaloes.length" striped over :items="escaloes" :fields="escaloesFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}`">Details</nuxt-link>
        <nuxt-link
          v-if="$auth.user.groups.includes('Administrador')"
          class="btn btn-primary btn-sm"
          :to="`/escaloes/${row.item.id}/edit`"
        >Edit</nuxt-link>
        <nuxt-link
          :to="`/escaloes/${row.item.id}/presencas`"
          class="btn btn-primary btn-sm"
        >Presenças</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Escalões Found.</p>
    <hr />
    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No Horários Found.</p>
    <hr />
    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="fields">
      <template v-slot:cell(actions)="row">
        <nuxt-link
          v-if="$auth.user.groups.includes('Administrador')"
          class="btn btn-link"
          :to="`/escaloes/${row.item.username}`"
        >Details</nuxt-link>
        <nuxt-link
          v-if="$auth.user.groups.includes('Administrador')"
          class="btn btn-primary"
          :to="`/escaloes/${row.item.username}/edit`"
        >Edit</nuxt-link>
        <input type="checkbox" id="checkbox" @click="check(row.item.username)" />
        <label for="checkbox">Send Email</label>
      </template>
    </b-table>
    <p v-else>No Atletas Found.</p>
    <div v-if="this.emailsToSend.length">
      <h1>Send an E-mail to Selected Atletas</h1>
      <form @submit.prevent="send">
        <div>
          <label for="subject">Subject:</label>
          <b-form-input id="subject" v-model="subject"></b-form-input>
        </div>
        <div>
          <label for="message">Message:</label>
          <br />
          <b-form-textarea rows="6" id="message" v-model="message" placeholder="add multiple lines"></b-form-textarea>
        </div>
        <hr />
        <button class="btn btn-primary btn-sm" @click.prevent="send">SEND</button>
      </form>
    </div>
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
      emailsToSend: [],
      subject: null,
      message: null,
      modalidadesFields: ["id", "nome", "actions"],
      escaloesFields: ["id", "nome", "modalidadeID", "actions"],
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      fields: ["username", "name", "email", "actions"]
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
    },
    check(username) {
      if (this.emailsToSend.includes(username)) {
        for (let i = 0; i < this.emailsToSend.length; i++) {
          if (this.emailsToSend[i] === username) {
            this.emailsToSend.splice(i, 1);
          }
        }
      } else {
        this.emailsToSend.push(username);
      }
    },
    send() {
      console.log(this.subject + this.message);
      for (let i = 0; i < this.emailsToSend.length; i++) {
        this.$axios
          .$post(`/api/atletas/${this.emailsToSend[i]}/email/send`, {
            subject: this.subject,
            message: this.message
          })
          .then(msg => {
            this.$toast.success(msg);
          })
          .catch(error => {
            this.$toast.error("Error sending the e-mail");
          });
      }
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
