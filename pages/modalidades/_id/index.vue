<template>
  <b-container>
    <h1>Modalidade {{modalidade.nome}} Details</h1>
    <p>Id: {{ modalidade.id }}</p>
    <p>Nome: {{ modalidade.nome }}</p>

    <nuxt-link :to="`${this.id}/edit`" class="btn btn-primary">Edit</nuxt-link>

    <h1>Escalões</h1>
    <b-table v-if="escaloes.length" striped over :items="escaloes" :fields="escaloesFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Escalões Found.</p>
    <hr />
    <h1>Horários</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No Horários Found.</p>
    <hr />
    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="userFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/atletas/${row.item.username}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/atletas/${row.item.username}/edit`">Edit</nuxt-link>
        <input type="checkbox" id="checkboxAtletas" @click="checkAtleta(row.item.username)" />
        <label for="checkboxAtletas">Send Email</label>
      </template>
    </b-table>
    <p v-else>No Atletas Found.</p>
    <hr />
    <h1>Treinadores</h1>
    <b-table v-if="treinadores.length" striped over :items="treinadores" :fields="userFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}`">Details</nuxt-link>
        <nuxt-link
          class="btn btn-primary btn-sm"
          :to="`/treinadores/${row.item.username}/edit`"
        >Edit</nuxt-link>
        <input type="checkbox" id="checkboxTreinadores" @click="checkTreinador(row.item.username)" />
        <label for="checkboxTreinadores">Send Email</label>
      </template>
    </b-table>
    <p v-else>No Treinadores Found.</p>
    <div v-if="this.emailsToSendAtletas.length || this.emailsToSendTreinadores.length">
      <h1>Send an E-mail to Selected Users</h1>
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
  middleware: "treinadorOnly",

  data() {
    return {
      modalidade: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      userFields: ["username", "name", "email", "actions"],
      escaloesFields: ["id", "nome", "actions"],
      emailsToSendAtletas: [],
      emailsToSendTreinadores: [],
      subject: null,
      message: null
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    horarios() {
      return this.modalidade.horarios || [];
    },
    atletas() {
      return this.modalidade.atletas || [];
    },
    treinadores() {
      return this.modalidade.treinadores || [];
    },
    escaloes() {
      return this.modalidade.escaloes || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/modalidades/${this.id}`)
      .then(modalidade => (this.modalidade = modalidade || {}));
  },
  methods: {
    checkTreinador(username) {
      if (this.emailsToSendTreinadores.includes(username)) {
        for (let i = 0; i < this.emailsToSendTreinadores.length; i++) {
          if (this.emailsToSendTreinadores[i] === username) {
            this.emailsToSendTreinadores.splice(i, 1);
          }
        }
      } else {
        this.emailsToSendTreinadores.push(username);
      }
    },
    checkAtleta(username) {
      if (this.emailsToSendAtletas.includes(username)) {
        for (let i = 0; i < this.emailsToSendAtletas.length; i++) {
          if (this.emailsToSendAtletas[i] === username) {
            this.emailsToSendAtletas.splice(i, 1);
          }
        }
      } else {
        this.emailsToSendAtletas.push(username);
      }
    },
    send() {
      for (let i = 0; i < this.emailsToSendAtletas.length; i++) {
        this.$axios
          .$post(`/api/atletas/${this.emailsToSendAtletas[i]}/email/send`, {
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
      for (let i = 0; i < this.emailsToSendTreinadores.length; i++) {
        this.$axios
          .$post(
            `/api/treinadores/${this.emailsToSendTreinadores[i]}/email/send`,
            {
              subject: this.subject,
              message: this.message
            }
          )
          .then(msg => {
            this.$toast.success(msg);
          })
          .catch(error => {
            this.$toast.error("Error sending the e-mail");
          });
      }
    }
  }
};
</script>
