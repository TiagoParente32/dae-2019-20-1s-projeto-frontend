<template>
  <b-container>
    <h1>Create Produto</h1>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Create  Produto" active>
        <div>
          <form @submit.prevent="create">
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
        </div>
      </b-tab>
      <b-tab title="Import From CSV">
        <vue-csv-import
          v-model="parseCsv"
          :map-fields="{id: 'Id', tipo: 'Tipo', valorBase: 'Valor Base ', descricao: 'Descricao'}"
        ></vue-csv-import>

        <div v-if="this.parseCsv != null">
          <b-button class="btn-success" @click.prevent="createFromCsv">SUBMIT</b-button>
          <hr />
        </div>
      </b-tab>
    </b-tabs>

    <hr />
  </b-container>
</template>
<script>
import VueCsvImport from "vue-csv-import";
export default {
  middleware: "adminOnly",

  data() {
    return {
      id: null,
      tipo: null,
      valorBase: null,
      descricao: null,
      parseCsv: null,
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
    },
    createFromCsv() {
      for (let csv of this.parseCsv) {
        this.$axios
          .$post("/api/produtos", {
            id: csv.id,
            tipo: csv.tipo,
            valorBase: csv.valorBase,
            descricao: csv.descricao
          })
          .then(() => {
            console.log("produto " + id + " criado");
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
      }
      this.$router.push("/produtos");
    }
  },
  components: { VueCsvImport }
};
</script>
