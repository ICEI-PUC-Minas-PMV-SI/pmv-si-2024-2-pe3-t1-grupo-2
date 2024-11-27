const asyncLoginText = async () => {
    const userMenuItem = document.getElementById("user-menu-item");

    const userId = localStorage.getItem("user_id");

    if (userId) {
        userMenuItem.innerHTML = '<a href="./pages/meu-usuario.html">Meu Usuário</a>';
    } else {
        userMenuItem.innerHTML = '<a href="./pages/login.html">Entrar</a>';
    }
}

asyncLoginText()
