<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <h1>Pagamentos</h1>
      <nuxt-link to="/pagamentos/create" class="btn btn-primary">Create a Pagamento</nuxt-link>
      <download-csv class="btn btn-primary" :data="pagamentos" name="pagamentos.csv">Export CSV</download-csv>

      <hr />
      <b-table
        id="my-table"
        striped
        over
        :items="pagamentos"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(actions)="row">
          <nuxt-link class="btn btn-primary btn-sm" :to="`/pagamentos/${row.item.id}`">Details</nuxt-link>
          <nuxt-link class="btn btn-primary btn-sm" :to="`/pagamentos/${row.item.id}/edit`">Edit</nuxt-link>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click.prevent="deletePagamento(row.item.id)"
          >Delete</button>
          <b-form-checkbox @change="check(row.item)" v-if="row.item.estado === 'PAGO'">Generate PDF</b-form-checkbox>
        </template>
      </b-table>
      <b-button
        v-if="this.pagamentosToPDF.length"
        v-on:click.prevent="generatePDF"
      >Generate PDF With Selected Pagamentos</b-button>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-container>&emsp;
  </div>
</template>
<script>
//<input type="checkbox" class="custom-control-input" id="checkbox" @click="check(row.item)" v-if="row.item.estado == 'PAGO'">
//<label class="custom-control-label" v-if="row.item.estado == 'PAGO'" for="checkbox">Generate PDF</label>
import jsPDF from "jspdf";
import "jspdf-autotable";

import Vue from "vue";
import JsonCSV from "vue-json-csv";

Vue.component("downloadCsv", JsonCSV);
export default {
  middleware: "adminOnly",

  data() {
    return {
      fields: [
        { key: "id", sortable: true },
        { key: "estado", sortable: true },
        { key: "username", sortable: true },
        { key: "produtoID", sortable: true },
        { key: "precoFinal", sortable: true },
        { key: "quantidade", sortable: true },
        { key: "dataLancamento", sortable: true },
        { key: "actions", sortable: false }
      ],
      pagamentos: [],
      pagamentosToPDF: [],
      perPage: 5,
      currentPage: 1
    };
  },
  methods: {
    deletePagamento(id) {
      this.$axios({
        method: "delete",
        url: `/api/pagamentos/${id}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          this.$toast.success(
            "Deleted Pagamento with ID " + id + " successfully!"
          );
          this.getPagamentos();
        })
        .catch(function(error) {
          this.$toast.error(error);
        });
    },
    getPagamentos() {
      this.$axios
        .$get("/api/pagamentos")
        .then(pagamentos => {
          this.pagamentos = pagamentos;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    check(pagamento) {
      if (this.pagamentosToPDF.includes(pagamento)) {
        for (let i = 0; i < this.pagamentosToPDF.length; i++) {
          if (this.pagamentosToPDF[i] === pagamento) {
            this.pagamentosToPDF.splice(i, 1);
          }
        }
      } else {
        this.pagamentosToPDF.push(pagamento);
      }
    },
    generatePDF() {
      if (this.pagamentosToPDF.length) {
        var doc = new jsPDF();
        doc.text("Recibos", 10, 10);

        doc.autoTable({
          foot: [
            [
              "Data Lançamento",
              "Estado",
              "ID",
              "Preço Final",
              "ID Produto",
              "Quantidade",
              "Username"
            ]
          ],
          body: this.pagamentosToPDF
        });

        doc.save("recibos.pdf");
      }
    }
  },
  computed: {
    rows() {
      return this.pagamentos.length;
    }
  },
  created() {
    this.getPagamentos();
  }
};
</script>
<style>
</style>
