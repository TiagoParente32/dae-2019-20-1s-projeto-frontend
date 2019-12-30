<template>
  <form @submit.prevent="create">
    <h1>Create Pagamento</h1>
    <div>
      id:
      <input v-model="id" type="text" />
    </div>
    <div>
      username:
      <input v-model="username" type="text" />
    </div>
    <div>
      produtoID:
      <input v-model="produtoID" type="number" />
    </div>
    <div>
      quantidade:
      <input v-model="quantidade" type="number" />
    </div>
    <div>
      precoFinal:
      <input v-model="precoFinal" type="number" step="0.01" />
    </div>

    <div>
      estado:
      <select id="type" name="type" v-model="estado">
        <option
          v-for="option in optionsEstado"
          :key="option.value"
          v-bind:value="option.value"
        >{{ option.text }}</option>
      </select>
    </div>

    <nuxt-link to="/pagamentos">Return</nuxt-link>
    <button type="reset">RESET</button>
    <button @click.prevent="create">CREATE</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      username: null,
      produtoID: null,
      quantidade: null,
      precoFinal: null,
      estado: null,
      optionsEstado: [
        { text: "Pago", value: "PAGO" },
        { text: "Não Pago", value: "NAO_PAGO" },
        { text: "Parcial", value: "PARCIAL" }
      ]
    };
  },
  methods: {
    create() {
      this.$axios
        .$post("/api/pagamentos", {
          id: this.id,
          username: this.username,
          produtoID: this.produtoID,
          quantidade: this.quantidade,
          precoFinal: this.precoFinal,
          estado: this.estado
        })
        .then(() => {
          this.$router.push("/pagamentos");
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
};
</script>
