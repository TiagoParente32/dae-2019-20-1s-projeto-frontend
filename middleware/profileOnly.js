export default function (context) {
  if (!context.route.path.includes(context.store.state.auth.user.sub) && !context.store.state.auth.user.groups.includes("Administrador")) {
    context.redirect("/401")
  }
}
