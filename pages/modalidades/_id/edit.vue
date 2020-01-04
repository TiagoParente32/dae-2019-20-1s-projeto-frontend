<template>
  <b-container>
    <h1>Edit Modalidade</h1>
    <p>Id: {{ modalidade.id }}</p>
    <label for="nome">Nome:</label>
    <b-form-input id="nome" v-model="modalidade.nome"></b-form-input>
    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updateModalidade(modalidade.id)"
    >Submit</button>
    <br />
    <br />
    <div></div>
    <h1>Escalões</h1>
    <nuxt-link class="btn btn-primary" :to="`/escaloes/create`">Add Escalão</nuxt-link>
    <br />
    <br />
    <b-table v-if="escaloes.length" striped over :items="escaloes" :fields="escaloesFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/escaloes/${row.item.id}/edit`">Edit</nuxt-link>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click.prevent="unrollEscalao(row.item.id)"
        >Remove</button>
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
        <nuxt-link
          class="btn btn-primary btn-sm"
          :to="`/treinadores/${row.item.username}/edit`"
        >Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Treinadores Found.</p>
  </b-container>
</template>
<script>
export default {
  middleware: "adminOnly",

  data() {
    return {
      newEscalao: null,
      escalaoToEnrollOn: null,
      modalidade: {},
      AllEscaloes: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      userFields: ["username", "name", "email"],
      escaloesFields: ["id", "nome", "actions"]
    };
  },
  methods: {
    getModalidade() {
      this.$axios
        .$get(`/api/modalidades/${this.id}`)
        .then(modalidade => (this.modalidade = modalidade || {}));
    },
    getEscaloes() {
      this.$axios
        .$get(`/api/escaloes`)
        .then(escaloes => (this.AllEscaloes = escaloes || {}));
    },
    enrollEscalao(escalaoID) {
      //{modalidadeId}/escaloes/enroll/{escalaoId}
      this.$axios
        .$put(
          `/api/modalidades/${this.modalidade.id}/escaloes/enroll/${escalaoID}`
        )
        .then(escalaos => {
          this.$toast.success(
            "Escalão com ID " +
              escalaoID +
              " adicionado á modalidade com ID " +
              this.modalidade.id +
              " Sucessfully"
          );
          this.getModalidade();
        })
        .catch(function(error) {
          console.log(error);
          //this.$toast.success(error);
        });
    },
    unrollEscalao(escalaoID) {
      //{modalidadeId}/escaloes/enroll/{escalaoId}
      this.$axios
        .$put(
          `/api/modalidades/${this.modalidade.id}/escaloes/unroll/${escalaoID}`
        )
        .then(escalaos => {
          this.$toast.success(
            "Escalão com ID " +
              escalaoID +
              " removido da modalidade com ID " +
              this.modalidade.id +
              " Sucessfully"
          );
          this.getModalidade();
        })
        .catch(function(error) {
          console.log(error);
          //this.$toast.success(error);
        });
    },
    updateModalidade(id) {
      this.$axios
        .$put(`/api/modalidades/${id}`, {
          nome: this.modalidade.nome
        })
        .then(modalidades => {
          this.$toast.success(
            "Modalidade com ID " + id + " updated Sucessfully"
          );
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    deleteEscalao(id) {
      this.$axios({
        method: "delete",
        url: `/api/escaloes/${id}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success(
            "Deleted Escalão com ID " + id + " successfully!"
          );
          this.getModalidade();
        })
        .catch(function(error) {
          console.log(error);
          //this.$toast.error(error);
        });
    }
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
    this.getEscaloes();
    this.getModalidade();
  }
};
</script>
