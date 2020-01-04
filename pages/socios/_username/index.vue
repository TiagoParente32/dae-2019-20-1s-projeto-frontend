<template>
  <b-container>
    <h1>Sócio {{socio.username}} Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="socio.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="socio.name" readonly></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="socio.email" readonly></b-form-input>
    <br />
    <nuxt-link :to="`${this.username}/edit`" class="btn btn-primary">Edit</nuxt-link>
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
  middleware: ["profileOnly", "socioOnly"],

  data() {
    return {
      socio: {},

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
    pagamentos() {
      return this.socio.pagamentos || [];
    }
  },
  created() {
    this.$axios
      .$get(`/api/socios/${this.username}`)
      .then(socio => (this.socio = socio || {}));
  }
};
</script>
