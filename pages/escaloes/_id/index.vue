<template>
  <b-container>
    <h1>Escalão {{escalao.nome}} Details</h1>
    <p>Id: {{ escalao.id }}</p>
    <p>Nome: {{ escalao.nome }}</p>

    <nuxt-link :to="`${this.id}/edit`" class="btn btn link btn-primary">Edit</nuxt-link>
    <nuxt-link :to="`${this.id}/presencas`" class="btn btn link btn-primary">Presenças</nuxt-link>

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
      escalao: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      userFields: ["username", "name", "email", "actions"],
      escaloesFields: ["id", "nome"]
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    horarios() {
      return this.escalao.horarios || [];
    },
    atletas() {
      return this.escalao.atletas || [];
    },
    treinadores() {
      return this.escalao.treinadores || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/escaloes/${this.id}`)
      .then(escalao => (this.escalao = escalao || {}));
  }
};
</script>
