export default function (context) {

  if (!context.store.state.auth.user.groups.includes("Administrador") && !context.store.state.auth.user.groups.includes("Socio")) {

    context.redirect("/401")

  }
}
