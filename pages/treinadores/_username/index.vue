<template>
  <b-container>
    <h1>Treinador Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="treinador.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="treinador.name" readonly></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="treinador.email" readonly></b-form-input>
    <br />
    <nuxt-link :to="`${this.username}/edit`" class="btn btn link btn-primary">Edit</nuxt-link>
    <hr />
    <h1>Modalidades</h1>
    <b-table v-if="modalidades.length" over :items="modalidades" :fields="modalidadesFields">
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
        <nuxt-link
          :to="`/escaloes/${row.item.id}/presencas`"
          class="btn btn link btn-primary"
        >Presenças</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded Escaloes.</p>
    <hr />
    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No uploaded Horarios.</p>
    <hr />
    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="fields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/escaloes/${row.item.username}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary" :to="`/escaloes/${row.item.username}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded Atletas.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      treinador: {},
      modalidadesFields: ["id", "nome", "actions"],
      escaloesFields: ["id", "nome", "modalidadeID", "actions"],

      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      fields: ["username", "name", "email", "actions"]
    };
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
