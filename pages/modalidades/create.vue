<template>
  <form @submit.prevent="create">
    <h1>Create Modalidade</h1>
    <div>
      id:
      <input v-model="id" type="text" />
    </div>
    <div>
      nome:
      <input v-model="nome" type="text" />
    </div>

    <nuxt-link to="/modalidades">Return</nuxt-link>
    <button type="reset">RESET</button>
    <button @click.prevent="create">CREATE</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      nome: null
    };
  },
  methods: {
    create() {
      this.$axios
        .$post("/api/modalidades", {
          id: this.id,
          nome: this.nome
        })
        .then(() => {
          this.$router.push("/modalidades");
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
};
</script>
