<template>
  <form @submit.prevent="create">
    <h1>Create Admin</h1>
    <div>
      username:
      <input v-model="username" type="text" />
    </div>
    <div>
      password:
      <input v-model="password" type="password" />
    </div>
    <div>
      name:
      <input v-model="name" type="text" />
    </div>
    <div>
      email:
      <input v-model="email" type="email" />
    </div>
    <nuxt-link to="/administrators">Return</nuxt-link>
    <button type="reset">RESET</button>
    <button @click.prevent="create">CREATE</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      name: null,
      email: null
    };
  },
  methods: {
    create() {
      this.$axios
        .$post("/api/administradores", {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email
        })
        .then(() => {
          this.$router.push("/administrators");
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
};
</script>
