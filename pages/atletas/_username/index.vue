<template>
  <b-container>
    <h1>Atleta {{atleta.username}}'s Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="atleta.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="atleta.name" readonly></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="atleta.email" readonly></b-form-input>
    <br />
    <nuxt-link :to="`${this.username}/edit`" class="btn btn link btn-primary">Edit</nuxt-link>
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
        <nuxt-link class="btn btn-primary btn-sm" :to="`/modalidades/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/modalidades/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Modalidades Found.</p>
    <hr />
    <h1>Escalões</h1>
    <b-table v-if="escaloes.length" striped over :items="escaloes" :fields="escaloesFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Escalões Found.</p>
    <hr />
    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields">
      <!-- <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/horarios/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-link" :to="`/horarios/${row.item.id}/edit`">Edit</nuxt-link>
      </template>-->
    </b-table>
    <p v-else>No Horários Found.</p>
    <hr />
    <h1>Treinadores</h1>
    <b-table v-if="treinadores.length" striped over :items="treinadores" :fields="fields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded Treinadores.</p>
    <hr />
    <h1>Graduações</h1>
    <b-table v-if="graduacoes.length" striped over :items="graduacoes" :fields="fields"></b-table>
    <p v-else>No Graduações Found.</p>
    <hr />
    <h1>Pagamentos</h1>
    <b-table v-if="pagamentos.length" striped over :items="pagamentos" :fields="pagamentoFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/pagamentos/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/pagamentos/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Pagamentos Found.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      atleta: {},
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
        "dataLancamento",
        "actions"
      ]
    };
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
