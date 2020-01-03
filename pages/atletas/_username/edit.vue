<template>
  <b-container>
    <h1>Atleta {{atleta.username}}'s Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="atleta.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="atleta.name"></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="atleta.email"></b-form-input>
    <label for="newPasswd">New Password:</label>
    <b-form-input id="newPasswd" v-model="newPasswd" type="password"></b-form-input>
    <label for="newPasswdC">New Password Confirmation:</label>
    <b-form-input id="newPasswdC" v-model="newPasswdC" type="password"></b-form-input>
    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updateAtleta(atleta.username)"
    >Submit</button>
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
    <h1>Horários</h1>
    <b-table v-if="horarios.length" striped over :items="horarios" :fields="horariosFields"></b-table>
    <p v-else>No Horários Found</p>
    <hr />
    <h1>Treinadores</h1>
    <b-table v-if="treinadores.length" striped over :items="treinadores" :fields="fields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/treinadores/${row.item.username}`">Details</nuxt-link>
        <nuxt-link
          class="btn btn-primary btn-sm"
          :to="`/treinadores/${row.item.username}/edit`"
        >Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Treinadores Found.</p>
    <hr />
    <div>
      <b-button v-b-toggle.collapse-1 variant="primary">Add Graduacao</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <h4>Add Graduacao</h4>
        <label for="id">id:</label>
        <b-form-input id="id" v-model="newGraduacao.id"></b-form-input>
        <label for="nome">Nome:</label>
        <b-form-input id="nome" v-model="newGraduacao.nome"></b-form-input>
        <label for="descricao">Descrição:</label>
        <b-form-input id="descricao" v-model="newGraduacao.descricao"></b-form-input>
        <br />
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click.prevent="addGraduacao()"
        >Create Graduacao</button>
      </b-collapse>
    </div>
    <h1>Graduaçoes</h1>
    <b-table v-if="graduacoes.length" striped over :items="graduacoes" :fields="graduacoesFields">
      <template v-slot:cell(actions)="row">
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click.prevent="removeGraduacao(row.item.id)"
        >Delete</button>
      </template>
    </b-table>
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
      newPasswd: null,
      newPasswdC: null,
      newGraduacao: {},
      modalidadesFields: ["id", "nome", "actions"],
      escaloesFields: ["id", "nome", "modalidadeID", "actions"],
      horariosFields: ["id", "dia", "duracao", "horaInicio"],
      graduacoesFields: ["id", "nome", "descricao", "actions"],
      fields: ["username", "name", "email", "actions"],
      pagamentoFields: [
        "id",
        "estado",
        "username",
        "produtoID",
        "precoFinal",
        "quantidade",
        "dataLancamento"
      ]
    };
  },
  methods: {
    updateAtleta(username) {
      if (this.newPasswd != null && this.newPasswdC != null) {
        if (this.newPasswd != this.newPasswdC) {
          this.$toast.error("Password And Password Confirmation don't match");
          return;
        }
        this.atleta.password = this.newPasswd;
      } else {
        this.atleta.password = null;
      }

      this.$axios
        .$put(`/api/atletas/${username}`, {
          username: this.atleta.username,
          password: this.atleta.password,
          name: this.atleta.name,
          email: this.atleta.email
        })
        .then(modalidades => {
          this.$toast.success("Atleta " + username + " updated Sucessfully");
          this.$router.push(`/atletas/${username}`);
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    getAtleta() {
      this.$axios
        .$get(`/api/atletas/${this.username}`)
        .then(atleta => (this.atleta = atleta || {}));
    },
    addGraduacao(id) {
      this.$axios
        .$post(`/api/graduacoes`, this.newGraduacao)
        .then(graduacao => {
          this.$axios
            .$put(
              `/api/graduacoes/${this.newGraduacao.id}/atletas/enroll/${this.atleta.username}`
            )
            .then(escalao => {
              this.$toast.success(
                "Graduacao " +
                  this.newGraduacao.id +
                  " added to Atleta " +
                  this.atleta.username +
                  " Sucessfully"
              );
              this.getAtleta();
            })
            .catch(function(error) {
              this.$toast.error(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    removeGraduacao(id) {
      this.$axios
        .$put(`/api/graduacoes/${id}/atletas/unroll/${this.atleta.username}`)
        .then(graduacao => {
          this.$toast.success("Removed Graduacao " + id + " successfully!");
          this.getAtleta();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
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
    this.getAtleta();
  }
};
</script>
