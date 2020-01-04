<template>
  <b-container>
    <h1>Sócio {{socio.username}} Details</h1>
    <label for="username">Username:</label>
    <b-form-input id="username" v-model="socio.username" readonly></b-form-input>
    <label for="name">Name:</label>
    <b-form-input id="name" v-model="socio.name"></b-form-input>
    <label for="email">E-Mail:</label>
    <b-form-input id="email" v-model="socio.email"></b-form-input>
    <label for="newPasswd">New Password:</label>
    <b-form-input id="newPasswd" v-model="newPasswd" type="password"></b-form-input>
    <label for="newPasswdC">New Password Confirmation:</label>
    <b-form-input id="newPasswdC" v-model="newPasswdC" type="password"></b-form-input>
    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updateSocio(socio.username)"
    >Submit</button>
    <hr />
    <h1>Pagamentos</h1>
    <b-table v-if="pagamentos.length" striped over :items="pagamentos" :fields="pagamentoFields">
      <template v-slot:cell(actions)="row">
        <nuxt-link class="btn btn-primary btn-sm" :to="`/pagamentos/${row.item.id}`">Details</nuxt-link>
        <nuxt-link class="btn btn-primary btn-sm" :to="`/pagamentos/${row.item.id}/edit`">Edit</nuxt-link>
      </template>
    </b-table>
    <p v-else>No Pagamentos Uploaded.</p>
  </b-container>
</template>
<script>
export default {
  middleware: "adminOnly",

  data() {
    return {
      socio: {},
      newPasswd: null,
      newPasswdC: null,
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
  methods: {
    updateSocio(username) {
      if (this.newPasswd != null && this.newPasswdC != null) {
        if (this.newPasswd != this.newPasswdC) {
          this.$toast.error("Password And Password Confirmation don't match");
          return;
        }
        this.socio.password = this.newPasswd;
      } else {
        this.socio.password = null;
      }

      this.$axios
        .$put(`/api/socios/${username}`, {
          username: this.socio.username,
          password: this.socio.password,
          name: this.socio.name,
          email: this.socio.email
        })
        .then(modalidades => {
          this.$toast.success("Sócio " + username + " updated Sucessfully");
          this.$router.push(`/socios/${username}`);
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    }
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
