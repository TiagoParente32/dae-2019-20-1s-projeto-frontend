<template>
  <b-container>
    <h1>Atleta Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="atleta.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="atleta.name"></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="atleta.email"></b-form-input>
    <label for="newPasswd">New Password:</label>
    <b-form-input id="newPasswd" v-model="newPasswd" type="password"></b-form-input>
    <label for="newPasswdC">New Password Confirmation:</label>
    <b-form-input id="newPasswdC" v-model="newPasswdC" type="password"></b-form-input>
    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updateAtleta(atleta.username)"
    >Submit</button>
    <hr />
    <h1>Modalidades</h1>
    <b-table
      v-if="modalidades.length"
      striped
      over
      :items="modalidades"
      :fields="modalidadesFields"
    >
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/modalidades/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary" :to="`/modalidades/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded Modalidades.</p>
    <hr />
    <h1>Escaloes</h1>
    <b-table v-if="escaloes.length" striped over :items="escaloes" :fields="escaloesFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/escaloes/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary" :to="`/escaloes/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded Escaloes.</p>
    <hr />
    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No uploaded Horarios.</p>
    <hr />
    <h1>Treinadores</h1>
    <b-table v-if="treinadores.length" striped over :items="treinadores" :fields="fields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/treinadores/${row.item.username}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary" :to="`/treinadores/${row.item.username}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded Treinadores.</p>
    <hr />
    <h1>Graduaçoes</h1>
    <b-table v-if="graduacoes.length" striped over :items="graduacoes" :fields="fields"></b-table>
    <p v-else>No uploaded Graduaçoes.</p>
    <hr />
    <h1>Pagamentos</h1>
    <b-table v-if="pagamentos.length" striped over :items="pagamentos" :fields="pagamentoFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/pagamentos/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary" :to="`/pagamentos/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded Pagamentos.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      atleta: {},
      newPasswd: null,
      newPasswdC: null,
      modalidadesFields: ["id", "nome", "actions"],
      escaloesFields: ["id", "nome", "modalidadeID", "actions"],
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      fields: ["username", "name", "email", "actions"],
      pagamentoFields: [
        "id",
        "estado",
        "username",
        "produtoID",
        "precoFinal",
        "quantidade",
        "dataLancamento"
      ]
    };
  },
  methods: {
    updateAtleta(username) {
      if (this.newPasswd != null && this.newPasswdC != null) {
        if (this.newPasswd != this.newPasswdC) {
          this.$toast.error("Password And Password Confirmation dont match");
          return;
        }
        this.atleta.password = this.newPasswd;
      } else {
        this.atleta.password = null;
      }

      this.$axios
        .$put(`/api/atletas/${username}`, {
          username: this.atleta.username,
          password: this.atleta.password,
          name: this.atleta.name,
          email: this.atleta.email
        })
        .then(modalidades => {
          this.$toast.success("Atleta " + username + " updated Sucessfully");
          this.$router.push(`/atletas/${username}`);
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
      return this.atleta.modalidades || [];
    },
    treinadores() {
      return this.atleta.treinadores || [];
    },
    horarios() {
      return this.atleta.horarios || [];
    },
    escaloes() {
      return this.atleta.escaloes || [];
    },
    pagamentos() {
      return this.atleta.pagamentos || [];
    },
    graduacoes() {
      return this.atleta.graduacoes || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/atletas/${this.username}`)
      .then(atleta => (this.atleta = atleta || {}));
  }
};
</script>
