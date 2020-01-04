export default function (context) {
  if (!context.route.path.includes(context.store.state.auth.user.sub)) {
    context.redirect("/401")
  }
}
