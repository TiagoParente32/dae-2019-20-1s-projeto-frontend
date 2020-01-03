<template>
  <b-container>
    <h1>Presenças</h1>
    <p>Id: {{ presenca.id }}</p>
    <p>Nome: {{ presenca.date }}</p>

    <!-- <p>{{mapaPresencas}}</p> -->

    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="userFields">
      <template v-slot:cell(actions)="row">
        <b-form-checkbox
          v-model="mapaPresencas[row.item.username]"
          :checked="mapaPresencas.hasOwnProperty(row.item.username)  && mapaPresencas[row.item.username]==true"
        >Presente</b-form-checkbox>
      </template>
    </b-table>
    <p v-else>No Atletas Found.</p>

    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updatePresencas(escalao.id)"
    >Submit</button>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      presenca: {},
      escalao: {},
      userFields: ["username", "name", "email", "actions"]
    };
  },
  methods: {
    updatePresencas() {
      for (const [username, presente] of Object.entries(this.mapaPresencas)) {
        this.$axios
          .$put(
            `/api/presencas/${this.presenca.id}/addOrUpdate/alteta/${username}/${presente}`
          )
          .then(escalaos => {
            console.log(username, presente);
          })
          .catch(function(error) {
            console.log(error);
            this.$toast.success(error);
          });
      }
    },
    getPresencas() {
      this.$axios
        .$get(`/api/presencas/${this.presenca_id}`)
        .then(presenca => (this.presenca = presenca || {}));
    },
    getEscalao() {
      this.$axios
        .$get(`/api/escaloes/${this.id}`)
        .then(escalao => (this.escalao = escalao || {}));
    }
  },
  computed: {
    presenca_id() {
      return this.$route.params.presenca_id;
    },
    id() {
      return this.$route.params.id;
    },
    atletas() {
      return this.escalao.atletas || [];
    },
    mapaPresencas() {
      return this.presenca.mapaPresencas || [];
    }
  },
  created() {
    this.getEscalao();
    this.getPresencas();
  }
};
</script>
