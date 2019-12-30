<template>
  <form @submit.prevent="create">
    <h1>Create Produto</h1>
    <div>
      id:
      <input v-model="id" type="text" />
    </div>
    <div>
      tipo:
      <select id="type" name="type" v-model="tipo">
        <option
          v-for="option in optionsTipo"
          :key="option.value"
          v-bind:value="option.value"
        >{{ option.text }}</option>
      </select>
    </div>
    <div>
      valor Base:
      <input v-model="valorBase" type="number" />
    </div>
    <div>
      Descricao:
      <input v-model="descricao" type="text" />
    </div>

    <nuxt-link to="/produtos">Return</nuxt-link>
    <button type="reset">RESET</button>
    <button @click.prevent="create">CREATE</button>
  </form>
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
