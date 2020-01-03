<template>
  <b-container>
    <h1>Edit Escalao</h1>
    <p>Id: {{ escalao.id }}</p>
    <label for="nome">Nome:</label>
    <b-form-input id="nome" v-model="escalao.nome"></b-form-input>

    <label for="username">Modalidade:</label>
    <select class="form-control" id="category_id" name="category" v-model="escalao.modalidadeID">
      <option
        v-for="modalidade in AllModalidades"
        :key="modalidade.nome"
        v-bind:value="modalidade.id"
      >{{ modalidade.nome }}</option>
    </select>
    <br />
    <button type="button" class="btn btn-primary" @click.prevent="updateEscalao(escalao.id)">Submit</button>
    <nuxt-link :to="`${this.id}/../presencas`" class="btn link btn-primary">Presencas</nuxt-link>

    <br />
    <br />
    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No uploaded horarios.</p>
    <hr />
    <div>
      <h4>Add Atleta</h4>
      <div class="row">
        <div class="col">
          <label for="username">Username:</label>
          <select class="form-control" id="username" name="username" v-model="newAtletaUsername">
            <option
              v-for="atleta in AllAtletas"
              :key="atleta.username"
              v-bind:value="atleta.username"
            >{{ atleta.username }}</option>
          </select>
        </div>
      </div>

      <br />
      <button
        type="button"
        class="btn btn-primary btn-sm"
        @click.prevent="enrollAtleta()"
      >Add Atleta</button>
      <br />
      <br />
    </div>

    <h1>Atletas</h1>
    <b-table v-if="atletas.length" striped over :items="atletas" :fields="userFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/atletas/${row.item.username}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary" :to="`/atletas/${row.item.username}/edit`">Edit</nuxt-link>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click.prevent="unrollAtleta(row.item.username)"
        >Remove</button>
      </template>
    </b-table>
    <p v-else>No uploaded atletas.</p>
    <hr />
    <div>
      <h4>Add Treinador</h4>
      <div>
        <div class="row">
          <div class="col">
            <label for="username">Username:</label>
            <select
              class="form-control"
              id="category_id"
              name="category"
              v-model="newTreinadorUsername"
            >
              <option
                v-for="treinador in AllTreinadores"
                :key="treinador.username"
                v-bind:value="treinador.username"
              >{{ treinador.username }}</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <button
        type="button"
        class="btn btn-primary btn-sm"
        @click.prevent="enrollTreinador()"
      >Add Treinador</button>
      <br />
      <br />
    </div>

    <h1>Treinadores</h1>
    <b-table v-if="treinadores.length" striped over :items="treinadores" :fields="userFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-link" :to="`/treinadores/${row.item.username}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary" :to="`/treinadores/${row.item.username}/edit`">Edit</nuxt-link>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click.prevent="unrollTreinador(row.item.username)"
        >Remove</button>
      </template>
    </b-table>
    <p v-else>No uploaded treinadores.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      newAtletaUsername: null,
      newTreinadorUsername: null,
      escalaoToEnrollOn: null,
      escalao: {},
      AllAtletas: {},
      AllTreinadores: {},
      AllModalidades: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      userFields: ["username", "name", "email", "actions"],
      escaloesFields: ["id", "nome", "actions"]
    };
  },
  methods: {
    updateEscalao(id) {
      this.$axios
        .$put(`/api/escaloes/${id}`, {
          nome: this.escalao.nome,
          modalidadeID: this.escalao.modalidadeID
        })
        .then(escalao => {
          this.$toast.success("Escalao " + id + " updated Sucessfully");
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    enrollAtleta() {
      this.$axios
        .$put(
          `/api/atletas/${this.newAtletaUsername}/modalidades/enroll/${this.escalao.modalidadeID}/escalao/${this.escalao.id}`
        )
        .then(escalaos => {
          this.$toast.success(
            "Atleta " +
              this.newAtletaUsername +
              " adicionado á escalao " +
              this.escalao.escalaoID +
              " e ao escalao " +
              this.escalao.id +
              " Sucessfully"
          );
          this.getEscalao();
        })
        .catch(function(error) {
          console.log(error);
          //this.$toast.success(error);
        });
    },
    unrollAtleta(username) {
      this.$axios
        .$put(
          `/api/atletas/${username}/modalidades/unroll/${this.escalao.modalidadeID}/escalao/${this.escalao.id}`
        )
        .then(escalaos => {
          this.$toast.success(
            "Atleta " +
              username +
              " removido da escalao " +
              this.escalao.id +
              " Sucessfully"
          );
          this.getEscalao();
        })
        .catch(function(error) {
          console.log(error);
          this.$toast.success(error);
        });
    },
    enrollTreinador() {
      this.$axios
        .$put(
          `/api/treinadores/${this.newTreinadorUsername}/modalidades/enroll/${this.escalao.modalidadeID}/escalao/${this.escalao.id}`
        )
        .then(escalaos => {
          this.$toast.success(
            "Treinador " +
              this.newTreinadorUsername +
              " adicionado á escalao " +
              this.escalao.id +
              " no escalao com id " +
              this.escalaoToEnrollOn +
              " Sucessfully"
          );
          this.getEscalao();
        })
        .catch(function(error) {
          console.log(error);
          //this.$toast.success(error);
        });
    },
    unrollTreinador(username) {
      this.$axios
        .$put(
          `/api/treinadores/${username}/modalidades/unroll/${this.escalao.modalidadeID}/escalao/${this.escalao.id}`
        )
        .then(escaloes => {
          this.$toast.success(
            "Treinador " +
              username +
              " removido da escalao " +
              this.escalao.id +
              " Sucessfully"
          );
          this.getEscalao();
        })
        .catch(function(error) {
          console.log(error);
          //this.$toast.success(error);
        });
    },
    getEscalao() {
      this.$axios
        .$get(`/api/escaloes/${this.id}`)
        .then(escalao => (this.escalao = escalao || {}));
    },
    getModalidades() {
      this.$axios
        .$get(`/api/modalidades`)
        .then(modalidades => (this.AllModalidades = modalidades || {}));
    },
    getAtletas() {
      this.$axios
        .$get(`/api/atletas`)
        .then(atletas => (this.AllAtletas = atletas || {}));
    },

    getTreinadores() {
      this.$axios
        .$get(`/api/treinadores`)
        .then(treinadores => (this.AllTreinadores = treinadores || {}));
    }
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
    },
    escaloes() {
      return this.escalao.escaloes || [];
    }
  },
  created() {
    this.getModalidades();
    this.getTreinadores();
    this.getAtletas();
    this.getEscalao();
  }
};
</script>
