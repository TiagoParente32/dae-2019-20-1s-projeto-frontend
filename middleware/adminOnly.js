export default function (context) {

  if (!context.store.state.auth.user.groups.includes("Administrador")) {

    context.redirect("/401")

  }
}
