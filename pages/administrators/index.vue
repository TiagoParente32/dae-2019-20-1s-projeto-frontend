<template>
  <div>
    <startup-page></startup-page>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="administrators" :fields="fields" />
    </b-container>&emsp;
    <nuxt-link to="/administrators/create" class="btn btn link btn-primary">Create an Administrator</nuxt-link>
  </div>
</template>
<script>
  import StartPage from "../index.vue";
export default {
  data() {
    return {
      fields: ["username", "name", "email"],
      administrators: []
    };
  },
  created() {
    this.$axios
      .$get("/api/administradores")
      .then(administrators => {
        this.administrators = administrators;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
  components: {
    "startup-page": StartPage
  }
};
</script>
<style>
</style>
