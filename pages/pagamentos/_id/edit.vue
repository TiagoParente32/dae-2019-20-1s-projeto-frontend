<template>
  <b-container>
    <h1>Edit Pagamento</h1>
    <h4>Id: {{ pagamento.id }}</h4>
    <!-- <label for="username">User:</label> -->
    <div>
      <label for="username">Sócio:</label>
      <select class="form-control" id="socio_id" name="socio" v-model="pagamento.username">
        <option
          v-for="socio in socios"
          :key="socio.username"
          v-bind:value="socio.username"
        >{{ socio.username }}</option>
      </select>
    </div>

    <div>
      <label for="prod">Produto ID:</label>
      <select class="form-control" id="produto_id" name="produto" v-model="pagamento.produtoID">
        <option
          v-for="produto in produtos"
          :key="produto.id"
          v-bind:value="produto.id"
        >{{ produto.id }}</option>
      </select>
    </div>
    <label for="quantidade">Quantidade:</label>
    <b-form-input id="quantidade" v-model="pagamento.quantidade" type="number"></b-form-input>
    <label for="precoFinal">Preço Final:</label>
    <b-form-input id="precoFinal" v-model="pagamento.precoFinal" type="number" step=".01"></b-form-input>
    <label for="estado">Estado:</label>
    <select class="form-control" id="type" name="type" v-model="pagamento.estado">
      <option
        v-for="option in optionsEstado"
        :key="option.value"
        v-bind:value="option.value"
      >{{ option.text }}</option>
    </select>
    <br />
    <button
      type="button"
      class="btn btn-primary btn-sm"
      @click.prevent="updatePagamento(pagamento.id)"
    >Submit</button>
  </b-container>
</template>
<script>
export default {
  middleware: "adminOnly",

  data() {
    return {
      pagamento: {},
      socios: {},
      produtos: {},
      optionsEstado: [
        { text: "Pago", value: "PAGO" },
        { text: "Não Pago", value: "NAO_PAGO" },
        { text: "Parcial", value: "PARCIAL" }
      ]
    };
  },
  methods: {
    getSocios() {
      this.$axios
        .$get("/api/socios")
        .then(socios => {
          this.socios = socios;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    getProdutos() {
      this.$axios
        .$get("/api/produtos")
        .then(produtos => {
          this.produtos = produtos;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    getPagamento() {
      this.$axios
        .$get(`/api/pagamentos/${this.id}`)
        .then(pagamento => (this.pagamento = pagamento || {}));
    },
    updatePagamento(id) {
      this.$axios
        .$put(`/api/pagamentos/${id}`, {
          username: this.pagamento.username,
          produtoID: this.pagamento.produtoID,
          quantidade: this.pagamento.quantidade,
          precoFinal: this.pagamento.precoFinal,
          estado: this.pagamento.estado
        })
        .then(modalidades => {
          this.$toast.success(
            "Pagamento com ID " + id + " updated Sucessfully"
          );
          this.$router.push(`/pagamentos/${id}`);
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  created() {
    this.getSocios();
    this.getProdutos();
    this.getPagamento();
  }
};
</script>
