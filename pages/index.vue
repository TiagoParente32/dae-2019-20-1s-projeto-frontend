<template>
  <div>
    <!-- easy components usage, already shipped with bootstrap css-->
    <b-container>
      <!-- try to remove :fields=”fields” to see the magic -->
      <b-table striped over :items="administrators" , :fields="fields"/>
    </b-container>
    &emsp;<nuxt-link to="/create">Create a New User</nuxt-link>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                fields: ['username', 'name', 'email'],
                administrators: []
            }
        },
        created() {
            this.$axios.$get('/api/administrators')
                .then((administrators) => {
                    this.administrators = administrators
                })
        }
    }
</script>
<style>
</style>
