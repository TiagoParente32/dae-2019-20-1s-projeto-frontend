<template>
  <b-container>
    <div>
      <h1>Create Pagamento</h1>
      <b-tabs content-class="mt-3" justified>
        <b-tab title="Create Pagamento" active>
          <form @submit.prevent="create">
            <label for="id">Id:</label>
            <b-form-input id="id" v-model="id"></b-form-input>
            <div>
              <label for="username">Username:</label>
              <select class="form-control" id="username" name="username" v-model="username">
                <option
                  v-for="socio in AllSocios"
                  :key="socio.username"
                  v-bind:value="socio.username"
                >{{ socio.username }}</option>
              </select>
            </div>
            <div>
              <label for="produtoID">Produto ID:</label>
              <select class="form-control" id="produtoID" name="produtoID" v-model="produtoID">
                <option
                  v-for="produto in AllProdutos"
                  :key="produto.id"
                  v-bind:value="produto.id"
                >{{ produto.id }}</option>
              </select>
            </div>

            <label for="quantidade">Quantidade:</label>
            <b-form-input id="quantidade" v-model="quantidade" type="number"></b-form-input>
            <label for="precoFinal">Preço Final:</label>
            <b-form-input id="precoFinal" v-model="precoFinal" type="number" step="0.01"></b-form-input>

            <div>
              <label for="type">Estado:</label>

              <select class="form-control" id="type" name="type" v-model="estado">
                <option
                  v-for="option in optionsEstado"
                  :key="option.value"
                  v-bind:value="option.value"
                >{{ option.text }}</option>
              </select>
            </div>

            <hr />
            <nuxt-link class="btn btn-primary" to="/pagamentos">Return</nuxt-link>
            <b-button class="btn-warning" type="reset">RESET</b-button>
            <b-button class="btn-success" @click.prevent="create">CREATE</b-button>
          </form>
        </b-tab>
        <b-tab title="Import From CSV">
          <vue-csv-import
            v-model="parseCsv"
            :map-fields="{id: 'Id', username: 'Username', produtoID: 'Produto ID ', quantidade: 'Quantidade',precoFinal:'Preço Final',estado:'Estado'}"
          ></vue-csv-import>

          <div v-if="this.parseCsv != null">
            <b-button class="btn-success" @click.prevent="createFromCsv">SUBMIT</b-button>
            <hr />
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>
<script>
import VueCsvImport from "vue-csv-import";

export default {
  middleware: "adminOnly",

  data() {
    return {
      AllSocios: {},
      AllProdutos: {},
      parseCsv: null,
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
    },
    createFromCsv() {
      for (let csv of this.parseCsv) {
        this.$axios
          .$post("/api/pagamentos", {
            id: csv.id,
            username: csv.username,
            produtoID: csv.produtoID,
            quantidade: csv.quantidade,
            precoFinal: csv.precoFinal,
            estado: csv.estado
          })
          .then(() => {
            console.log("pagamento " + id + " criado");
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
      }
      this.$router.push("/pagamentos");
    },
    getSocios() {
      this.$axios
        .$get("/api/socios")
        .then(socios => {
          this.AllSocios = socios;
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
          this.AllProdutos = produtos;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },

  created() {
    this.getSocios();
    this.getProdutos();
  },
  components: { VueCsvImport }
};
</script>
