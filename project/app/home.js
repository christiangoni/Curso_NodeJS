extends. / layout.pug
block contenido
form(action = "/sessions", method = "POST")
div(class = "form-group")
label(
    for = "email") Email
input(type = "text", name = "email", placeholder = "Email", id = "email"
    class = "form-control")
div
label(
    for = "password") Password
input(type = "password", name = "password", id = "password"
    class = "form-control", placeholder = "password")
div
input(type = "submit"
    value = "Iniciar sesion"
    class = "btn btn-info")