const signup_form = document.getElementById("signup-form")
const mail_error_msg = document.getElementById("mail-already-exists")
const confirmation_mail_msg = document.getElementById("mail-confirmation")
const confirmation_password_msg = document.getElementById("senha-confirmation")
const password_out_of_standarts_msg = document.getElementById("password-out-of-standarts-message")
const required_messages = document.querySelectorAll(".required-message")

const server_url = "http://localhost:3000"

const getAllUsers = async () => {
    try {
        const res = await fetch(`${server_url}/users`)
        if (!res.ok) throw new Error("Erro ao buscar usuários.")
        return await res.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

const clearFieldsErrors = () => {
    mail_error_msg.style.opacity = 0
    confirmation_mail_msg.style.opacity = 0
    confirmation_password_msg.style.opacity = 0
    password_out_of_standarts_msg.style.opacity = 0
    required_messages.forEach(msg => (msg.style.opacity = 0))
}

const createUser = async (userData) => {
    try {
        const res = await fetch(`${server_url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        if (!res.ok) throw new Error("Erro ao cadastrar usuário.")

        return await res.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

signup_form.addEventListener("submit", async (e) => {
    e.preventDefault()

    clearFieldsErrors()

    const email = signup_form.email.value
    const confirm_email = signup_form["confirm-email"].value.trim()
    const password = signup_form.senha.value
    const confirm_password = signup_form["confirma-senha"].value
    const name = signup_form.name.value
    const lastname = signup_form.lastname.value

    for (let field of signup_form.elements) {
        if (!field.value.trim() && field.type !== "submit") {
            document.getElementById(field.id + "-required").style.opacity = 1
            return
        }
    }

    if (email !== confirm_email) {
        confirmation_mail_msg.style.opacity = 1
        return
    }

    const allUsers = await getAllUsers()
    const existingEmails = allUsers.map(user => user.email)

    if (existingEmails.includes(email)) {
        mail_error_msg.style.opacity = 1
        return
    }

    if (password !== confirm_password) {
        confirmation_password_msg.style.opacity = 1
        return
    }

    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!password_regex.test(password)) {
        password_out_of_standarts_msg.style.opacity = 1
        return
    }

    try {
        await createUser({ id: ++ allUsers.length, name, lastname, email, password })
        alert("Usuário cadastrado com sucesso!")
        location.replace("./login.html")
    } catch (error) {
        alert("Ocorreu um erro ao cadastrar o usuário.")
    }
})