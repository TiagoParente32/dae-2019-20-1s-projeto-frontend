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
      </template>
    </b-table>
    <p v-else>No Atletas Found.</p>
    <hr />
    <h1>Treinadores</h1>
    <b-table v-if="treinadores.length" striped over :items="treinadores" :fields="userFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Treinadores Found.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      modalidade: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      userFields: ["username", "name", "email", "actions"],
      escaloesFields: ["id", "nome", "actions"]
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
  }
};
</script>
