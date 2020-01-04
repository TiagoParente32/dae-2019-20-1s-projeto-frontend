<template>
  <div class="text-wrapper">
    <div class="title" data-content="404">401</div>

    <div class="subtitle">Oops, you do not that the authorization for that page!</div>

    <br />
    <br />
    <button class="btn btn-primary" @click.prevent="home">Go home Page</button>
  </div>
</template>

<script>
export default {
  methods: {
    home() {
      if (this.$auth.user.groups.includes("Administrador")) {
        this.$router.push("/");
      } else if (this.$auth.user.groups.includes("Socio")) {
        this.$router.push("/socios/" + this.$auth.user.sub);
      } else if (this.$auth.user.groups.includes("Atleta")) {
        this.$router.push("/atletas/" + this.$auth.user.sub);
      } else if (this.$auth.user.groups.includes("Treinador")) {
        this.$router.push("/treinadores/" + this.$auth.user.sub);
      }
    }
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Raleway:700);

*,
*:before,
*:after {
  box-sizing: border-box;
}
html {
  height: 100%;
}

.text-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 6em;
  font-weight: 700;
  color: #ee4b5e;
}

.subtitle {
  font-size: 40px;
  font-weight: 700;
  color: #1fa9d6;
}
</style>
