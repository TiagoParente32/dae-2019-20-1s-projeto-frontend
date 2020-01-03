<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <a class="navbar-brand" href="/">Sports Management</a>
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
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')" :to="`/administrators/${$auth.user.sub}`" class="nav-link active">{{$auth.user.sub}}'s Profile</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Treinador')" :to="`/treinadores/${$auth.user.sub}`" class="nav-link active">{{$auth.user.sub}}'s Profile</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Socio')" :to="`/socios/${$auth.user.sub}`" class="nav-link active">{{$auth.user.sub}}'s Profile</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Atleta')" :to="`/atletas/${$auth.user.sub}`" class="nav-link active">{{$auth.user.sub}}'s Profile</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')"
            to="/administrators"
            class="nav-link active"
          >Administradores</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')" to="/treinadores" class="nav-link active">Treinadores</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')" to="/socios" class="nav-link active">Sócios</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')" to="/atletas" class="nav-link active">Atletas</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')" to="/modalidades" class="nav-link active">Modalidades</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')" to="/produtos" class="nav-link active">Produtos</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')" to="/pagamentos" class="nav-link active">Pagamentos</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$auth.loggedIn && $auth.user.groups.includes('Administrador')" to="/escaloes" class="nav-link active">Escalões</nuxt-link>
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
      this.$toast.success("Logout Sucessfull");

      this.$router.push("/auth/login");
      //window.location.reload(true);
    }
  }
};
</script>

<style>
</style>
