<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <h1>Pagamentos</h1>
      <b-table striped over :items="pagamentos" :fields="fields">
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
      <nuxt-link to="/pagamentos/create" class="btn btn-primary">Create a Pagamento</nuxt-link>
      <b-button v-if="this.pagamentosToPDF.length" v-on:click.prevent="generatePDF">Generate PDF With Selected Pagamentos</b-button>
    </b-container>&emsp;
  </div>

</template>
<script>

  //<input type="checkbox" class="custom-control-input" id="checkbox" @click="check(row.item)" v-if="row.item.estado == 'PAGO'">
  //<label class="custom-control-label" v-if="row.item.estado == 'PAGO'" for="checkbox">Generate PDF</label>
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
export default {
  middleware: "adminOnly",

  data() {
    return {
      fields: [
        "id",
        "estado",
        "username",
        "produtoID",
        "precoFinal",
        "quantidade",
        "dataLancamento",
        "actions"
      ],
      pagamentos: [],
      pagamentosToPDF: []
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
    check(pagamento){
      if(this.pagamentosToPDF.includes(pagamento)){
        for(let i = 0; i< this.pagamentosToPDF.length; i++){
          if (this.pagamentosToPDF[i] === pagamento){
            this.pagamentosToPDF.splice(i,1);
          }
        }
      }else{
        this.pagamentosToPDF.push(pagamento);
      }
    },
    generatePDF(){
      if(this.pagamentosToPDF.length){
        var doc = new jsPDF();
        doc.text('Recibos', 10, 10);

        doc.autoTable({
          foot:[["Data Lançamento","Estado","ID","Preço Final","ID Produto","Quantidade","Username"]],
          body: this.pagamentosToPDF
        });

        doc.save('recibos.pdf');
      }
    }
  },
  created() {
    this.getPagamentos();
  }
};
</script>
<style>
</style>
