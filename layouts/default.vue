<template>
  <div>
    <NavBar></NavBar>
    <b-container fluid>
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/components/navbar";
export default {
  components: {
    NavBar
  },
  methods: {
    logout() {
      this.$auth.logout("local");
      this.$toast.success("Logout Sucessfull");
    }
  }
};
</script>
