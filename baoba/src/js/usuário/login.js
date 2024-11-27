const loginForm = document.getElementById("login-form")
const mailErrorMsg = document.getElementById("mail-error-msg")
const passwordErrorMsg = document.getElementById("password-error-msg")

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

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    passwordErrorMsg.style.opacity = 0
    mailErrorMsg.style.opacity = 0

    const userMail = loginForm.email.value
    const password = loginForm.senha.value

    const allUsers = await getAllUsers()
    console.log(allUsers)
    const foundUser = allUsers.find(account => account.email === userMail)

    if (!foundUser) {
        mailErrorMsg.style.opacity = 1
        loginForm.email.classList.add("input-error")
    } else if (foundUser.password !== password) {
        passwordErrorMsg.style.opacity = 1
        loginForm.senha.classList.add("input-error")
    } else {
        localStorage.setItem("user_id", foundUser.id)
        location.replace('../index.html')
    }
})
