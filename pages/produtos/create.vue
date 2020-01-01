<template>
  <b-container>
    <form @submit.prevent="create">
      <h1>Create Produto</h1>
      <label for="id">Id:</label>
      <b-form-input id="id" v-model="id"></b-form-input>

      <label for="type">Tipo:</label>
      <select class="form-control" id="type" name="type" v-model="tipo">
        <option
          v-for="option in optionsTipo"
          :key="option.value"
          v-bind:value="option.value"
        >{{ option.text }}</option>
      </select>

      <label for="valorBase">valor Base:</label>
      <b-form-input id="valorBase" v-model="valorBase" type="number"></b-form-input>

      <label for="descricao">Descricao:</label>
      <b-form-input id="descricao" v-model="descricao" type="text"></b-form-input>

      <hr />
      <nuxt-link to="/produtos">Return</nuxt-link>
      <b-button class="btn-warning" type="reset">RESET</b-button>
      <b-button class="btn-success" @click.prevent="create">CREATE</b-button>
    </form>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      tipo: null,
      valorBase: null,
      descricao: null,
      optionsTipo: [
        { text: "Artigo Desportivo", value: "ARTIGO_DESPORTIVO" },
        { text: "Seguro", value: "SEGURO" },
        { text: "Graduação", value: "GRADUACAO" },
        { text: "Inscrição", value: "INSCRICAO" },
        { text: "Quota", value: "QUOTA" },
        { text: "Aula", value: "AULA" },
        { text: "Estagio", value: "ESTAGIO" },
        { text: "Outro", value: "OUTRO" }
      ]
    };
  },
  methods: {
    create() {
      this.$axios
        .$post("/api/produtos", {
          id: this.id,
          tipo: this.tipo,
          valorBase: this.valorBase,
          descricao: this.descricao
        })
        .then(() => {
          this.$router.push("/produtos");
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
};
</script>
