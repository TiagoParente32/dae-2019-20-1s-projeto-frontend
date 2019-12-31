<template>
  <b-container>
    <h3>Login into SportsClub</h3>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group label="Username" description="Enter your username">
        <b-input name="username" placeholder="Your username" v-model.trim="username" required />
      </b-form-group>
      <b-form-group label="Password" description="Enter your password">
        <b-input
          name="password"
          type="password"
          placeholder="Your password"
          v-model="password"
          required
        />
      </b-form-group>
      <b-button type="reset" class="btn-warning">Reset</b-button>
      <b-button type="Submit" class="btn-success">Submit</b-button>
    </b-form>
  </b-container>
</template>
<script>
  export default {
    auth: false,
    data() {
      return {
        username: null,
        password: null
      };
    },
    methods: {
      onSubmit() {
        console.log(this.username + " " + this.password);
        let promise = this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password
          }
        });
        promise.then(() => {
          this.$toast.success("You are logged in!");
          // check if the user $auth.user object is set
          console.log(this.$auth.user);

          if (this.$auth.user.groups.includes('Administrador')) {
            this.$router.push('/')
            window.location.reload(true)
          } else if (this.$auth.user.groups.includes('Socio')) {
            this.$router.push('/socios/' + this.username)
            window.location.reload(true)
          }else if(this.$auth.user.groups.includes('Atleta')){
            this.$router.push('/atletas/' + this.username)
            window.location.reload(true)
          }else if(this.$auth.user.groups.includes('Treinador')){
            this.$router.push('/treinadores/' + this.username)
            window.location.reload(true)
          }
        });
        promise.catch(() => {
          this.$toast.error(
            "Sorry, you cant login. Ensure your credentials are correct"
          );
        });
      },
      onReset() {
        this.username = null;
        this.password = null;
      }
    }
  };
</script>
