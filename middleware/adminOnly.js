export default function ({ store, redirect }) {

  if (!store.state.auth.user.groups.includes("Administrador")) {

    redirect("/401")

  }
}
