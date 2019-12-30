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
    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No uploaded horarios.</p>
    <hr />
    <div>
      <h4>Add Atleta</h4>
      <div>
        <label for="username">Username:</label>
        <select class="form-control" id="category_id" name="category" v-model="newAtletaUsername">
          <!-- <option value="-1">NA</option>  FALTA VER SE QUISER TIRAR CATEGORIA-->
          <option
            v-for="atleta in AllAtletas"
            :key="atleta.username"
            v-bind:value="atleta.username"
          >{{ atleta.username }}</option>
        </select>
        <!-- <b-form-input id="username" v-model="newAtletaUsername" type="text" /> -->
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
        <label for="username">Username:</label>
        <select
          class="form-control"
          id="category_id"
          name="category"
          v-model="newTreinadorUsername"
        >
          <!-- <option value="-1">NA</option>  FALTA VER SE QUISER TIRAR CATEGORIA-->
          <option
            v-for="treinador in AllTreinadores"
            :key="treinador.username"
            v-bind:value="treinador.username"
          >{{ treinador.username }}</option>
        </select>
        <!-- <b-form-input id="username" v-model="newTreinadorUsername" type="text" /> -->
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
      modalidade: {},
      AllAtletas: {},
      AllTreinadores: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      userFields: ["username", "name", "email", "actions"]
    };
  },
  methods: {
    updateModalidade(id) {
      this.$axios
        .$put(`/api/modalidades/${id}`, {
          nome: this.modalidade.nome
        })
        .then(modalidades => {
          this.$toast.success("Modalidade " + id + " updated Sucessfully");
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    enrollAtleta() {
      this.$axios
        .$put(
          `/api/atletas/${this.newAtletaUsername}/modalidades/enroll/${this.modalidade.id}`
        )
        .then(modalidades => {
          this.$toast.success(
            "Atleta " +
              this.newAtletaUsername +
              " adicionado á modalidade " +
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
    unrollAtleta(username) {
      this.$axios
        .$put(
          `/api/atletas/${username}/modalidades/unroll/${this.modalidade.id}`
        )
        .then(modalidades => {
          this.$toast.success(
            "Atleta " +
              username +
              " removido da modalidade " +
              this.modalidade.id +
              " Sucessfully"
          );
          this.getModalidade();
        })
        .catch(function(error) {
          console.log(error);
          this.$toast.success(error);
        });
    },
    enrollTreinador() {
      this.$axios
        .$put(
          `/api/treinadores/${this.newTreinadorUsername}/modalidades/enroll/${this.modalidade.id}`
        )
        .then(modalidades => {
          this.$toast.success(
            "Treinador " +
              this.newTreinadorUsername +
              " adicionado á modalidade " +
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
    unrollTreinador(username) {
      this.$axios
        .$put(
          `/api/treinadores/${username}/modalidades/unroll/${this.modalidade.id}`
        )
        .then(modalidades => {
          this.$toast.success(
            "Treinador " +
              username +
              " removido da modalidade " +
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
    getModalidade() {
      this.$axios
        .$get(`/api/modalidades/${this.id}`)
        .then(modalidade => (this.modalidade = modalidade || {}));
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
      return this.modalidade.horarios || [];
    },
    atletas() {
      return this.modalidade.atletas || [];
    },
    treinadores() {
      return this.modalidade.treinadores || [];
    }
  },
  created() {
    this.getTreinadores();
    this.getAtletas();
    this.getModalidade();
  }
};
</script>
