<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Sports Management</a>
    <button
      class="navbar-toggler d-lg-none"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavId"
      aria-controls="collapsibleNavId"
      aria-expanded="false"
      aria-label="Toggle navigation"
    ></button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <nuxt-link
            v-if="$auth.loggedIn"
            to="/administrators"
            class="nav-link active"
          >Administradores</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn" to="/treinadores" class="nav-link active">Treinadores</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn" to="/socios" class="nav-link active">Sócios</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn" to="/atletas" class="nav-link active">Atletas</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn" to="/modalidades" class="nav-link active">Modalidades</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn" to="/produtos" class="nav-link active">Produtos</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn" to="/pagamentos" class="nav-link active">Pagamentos</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn" to="/escaloes" class="nav-link active">Escaloes</nuxt-link>
        </li>
      </ul>
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item">
          <button class="btn btn-primary" @click.prevent="logout" v-if="$auth.loggedIn">Logout</button>
          <!-- <nuxt-link v-if="$auth.loggedIn" to="/escaloes" class="nav-link active">Logout</nuxt-link> -->
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout("local");
      this.$toast.success("logout sucessfull");

      this.$router.push("/auth/login");
      //window.location.reload(true);
    }
  }
};
</script>

<style>
</style>
