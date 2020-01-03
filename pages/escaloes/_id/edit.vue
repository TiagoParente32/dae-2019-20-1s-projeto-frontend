<template>
  <b-container>
    <h1>Edit Escalão</h1>
    <p>Id: {{ escalao.id }}</p>
    <label for="nome">Nome:</label>
    <b-form-input id="nome" v-model="escalao.nome"></b-form-input>

    <label for="username">Modalidade:</label>
    <select
      class="form-control"
      id="modalidade_id"
      name="modalidade"
      v-model="escalao.modalidadeID"
    >
      <option
        v-for="modalidade in AllModalidades"
        :key="modalidade.nome"
        v-bind:value="modalidade.id"
      >{{ modalidade.nome }}</option>
    </select>
    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updateEscalao(escalao.id)"
    >Submit</button>
    <nuxt-link :to="`${this.id}/../presencas`" class="btn btn-primary btn-sm">Presenças</nuxt-link>

    <hr />
    <div>
      <b-button v-b-toggle.collapse-1 variant="primary">Add Horario</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <h4>Add Horario</h4>
        <label for="id">id:</label>
        <b-form-input id="id" v-model="newHorario.id"></b-form-input>
        <label for="type">Dia da Semana:</label>

        <select class="form-control" id="type" name="type" v-model="newHorario.dia">
          <option
            v-for="option in optionsDia"
            :key="option.value"
            v-bind:value="option.value"
          >{{ option.text }}</option>
        </select>
        <label for="horaInicio">Hora Inicio:</label>
        <b-form-input id="horaInicio" v-model="newHorario.horaInicio"></b-form-input>
        <label for="duracao">Duração:</label>
        <b-form-input id="duracao" v-model="newHorario.duracao"></b-form-input>
        <br />
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click.prevent="addHorario()"
        >Create Horario</button>
      </b-collapse>
    </div>
    <h1>Horarios</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields">
      <template v-slot:cell(actions)="row">
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="removeHorario(row.item.id)"
        >Delete</button>
      </template>
    </b-table>
    <p v-else>No uploaded horarios.</p>
    <hr />
    <div>
      <h4>Add Atleta</h4>

      <label for="username">Username:</label>
      <select class="form-control" id="username" name="username" v-model="newAtletaUsername">
        <option
          v-for="atleta in AllAtletas"
          :key="atleta.username"
          v-bind:value="atleta.username"
        >{{ atleta.username }}</option>
      </select>

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
        <nuxt-link class="btn btn-primary btn-sm" :to="`/atletas/${row.item.username}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/atletas/${row.item.username}/edit`">Edit</nuxt-link>
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="unrollAtleta(row.item.username)"
        >Remove</button>
      </template>
    </b-table>
    <p v-else>No Atletas Found.</p>
    <hr />
    <div>
      <h4>Add Treinador</h4>
      <div>
        <div class="row">
          <div class="col">
            <label for="username">Username:</label>
            <select
              class="form-control"
              id="treinador_id"
              name="treinador"
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
        <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}`">Details</nuxt-link>
        <nuxt-link
          class="btn btn-primary btn-sm"
          :to="`/treinadores/${row.item.username}/edit`"
        >Edit</nuxt-link>
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="unrollTreinador(row.item.username)"
        >Remove</button>
      </template>
    </b-table>
    <p v-else>No Treinadores Found.</p>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      newAtletaUsername: null,
      newTreinadorUsername: null,
      escalaoToEnrollOn: null,
      newHorario: {},
      escalao: {},
      AllAtletas: {},
      AllTreinadores: {},
      AllModalidades: {},
      horariosFields: ["id", "dia", "duracao", "horaInicio", "actions"],
      userFields: ["username", "name", "email", "actions"],
      escaloesFields: ["id", "nome", "actions"],
      optionsDia: [
        { text: "Segunda-Feira", value: "MONDAY" },
        { text: "Terça-Feira", value: "TUESDAY" },
        { text: "Quarta-Feira", value: "WEDNESDAY" },
        { text: "Quinta-Feira", value: "THURSDAY" },
        { text: "Sexta-Feira", value: "FRIDAY" },
        { text: "Sabado", value: "SATURDAY" },
        { text: "Domingo", value: "SUNDAY" }
      ]
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
          this.$toast.success("Escalão with id " + id + " updated Sucessfully");
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    removeHorario() {
      this.$axios
        .$put(`/api/escaloes/${this.id}/horarios/unroll/${this.newHorario.id}`)
        .then(horarios => {
          this.$axios({
            method: "delete",
            url: `/api/horarios/${this.newHorario.id}`,
            data: null,
            headers: { "Content-Type": "application/json" }
          })
            .then(response => {
              this.$toast.success(
                "Deleted Horario " + this.newHorario.id + " successfully!"
              );
              this.getEscalao();
            })
            .catch(function(error) {
              this.$toast.error(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addHorario() {
      this.$axios
        .$post(`/api/horarios`, this.newHorario)
        .then(horarios => {
          this.$toast.success(
            "Horario " + this.newHorario.id + " created Sucessfully"
          );
          this.$axios
            .$put(
              `/api/escaloes/${this.id}/horarios/enroll/${this.newHorario.id}`
            )
            .then(escalao => {
              this.$toast.success(
                "Horario " +
                  this.newHorario.id +
                  " added to Escalao " +
                  this.id +
                  " Sucessfully"
              );
              this.getEscalao();
            })
            .catch(function(error) {
              this.$toast.error(error);
            });
        })
        .catch(function(error) {
          console.log(error);
          //this.$toast.success(error);
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
              " adicionado ao escalão " +
              this.escalao.escalaoID +
              " e ao escalão " +
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
              " removido do escalão " +
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
              " adicionado ao escalão " +
              this.escalao.id +
              " no escalão com id " +
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
              " removido do escalão " +
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
