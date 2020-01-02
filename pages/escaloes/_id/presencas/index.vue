<template>
  <b-container>
    <h1>Create Presenças</h1>
    <label for="id">Id:</label>
    <b-form-input id="id" v-model="newPresenca.id"></b-form-input>

    <label for="date">date:</label>
    <b-form-input id="date" v-model="newPresenca.date" type="date"></b-form-input>
    <hr />
    <nuxt-link :to="`/escaloes/${id}`">Return</nuxt-link>
    <b-button class="btn-warning" type="reset">RESET</b-button>
    <b-button class="btn-success" @click.prevent="create">CREATE</b-button>
    <hr />
    <b-table v-if="presencas.length" striped over :items="presencas" :fields="fields">
      <template v-slot:cell(actions)="row">
        <!-- <nuxt-link class="btn btn-link" :to="`/escaloes/${id}/presencas/${row.item.id}`">Details</nuxt-link> -->
        <nuxt-link
          class="btn btn-primary"
          :to="`/escaloes/${id}/presencas/${row.item.id}/edit`"
        >Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No uploaded presencas.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      escalao: {},
      newPresenca: {
        id: null,
        date: null,
        escalaoID: null
      },
      fields: ["id", "date", "mapaPresencas", "actions"]
    };
  },
  methods: {
    getEscalao() {
      this.$axios
        .$get(`/api/escaloes/${this.id}`)
        .then(escalao => (this.escalao = escalao || {}));
    },
    create() {
      this.newPresenca.escalaoID = this.id;

      this.$axios
        .$post("/api/presencas", {
          id: this.newPresenca.id,
          date: this.newPresenca.date,
          escalaoID: this.newPresenca.escalaoID
        })
        .then(() => {
          this.$toast.success("Presença created sucessfully!");
          this.getEscalao();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    presencas() {
      return this.escalao.presencas || [];
    }
  },
  created() {
    this.getEscalao();
  }
};
</script>
