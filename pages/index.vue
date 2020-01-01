<template>
  <b-container>
    <b-jumbotron fluid>
      <template v-slot:header>Sports Management</template>

      <template v-slot:lead>Welcome to the Sports Management Club Website</template>

      <hr class="my-4" />

      <p>Please Visit Our Pages...</p>

      <nuxt-link to="/administrators" class="btn btn link btn-primary">Administradores</nuxt-link>
      <nuxt-link to="/treinadores" class="btn btn link btn-primary">Treinadores</nuxt-link>
      <nuxt-link to="/socios" class="btn btn link btn-primary">Sócios</nuxt-link>
      <nuxt-link to="/atletas" class="btn btn link btn-primary">Atletas</nuxt-link>
      <nuxt-link to="/modalidades" class="btn btn link btn-primary">Modalidades</nuxt-link>
      <nuxt-link to="/produtos" class="btn btn link btn-primary">Produtos</nuxt-link>
      <nuxt-link to="/pagamentos" class="btn btn link btn-primary">Pagamentos</nuxt-link>
      <nuxt-link to="/escaloes" class="btn btn link btn-primary">Escaloes</nuxt-link>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {};
</script>
