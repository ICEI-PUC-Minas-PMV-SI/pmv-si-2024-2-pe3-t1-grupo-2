          // Função para carregar as informações do usuário
          async function loadUserInfo() {
            const userId = localStorage.getItem("user_id")
            const userDetailsContainer = document.getElementById("user-details")

            if (!userId) {
              userDetailsContainer.innerHTML = "<p>Usuário não encontrado.</p>"
              return
            }

            try {
              const response = await fetch(`http://localhost:3000/users/${userId}`)
              if (!response.ok) throw new Error("Usuário não encontrado.")

              const user = await response.json()
              userDetailsContainer.innerHTML = `
                <p><strong>Nome completo:</strong> ${user.name} ${user.lastname}</p>
                <p><strong>Email:</strong> ${user.email}</p>
              `
            } catch (error) {
              userDetailsContainer.innerHTML = "<p>Erro ao carregar informações do usuário.</p>"
              console.error(error)
            }
          }

          // Carregar as informações do usuário ao carregar a página
          loadUserInfo()

          // Ativar botão hambúrguer
          document.getElementById("hamburger").addEventListener("click", function () {
            document.getElementById("navMenu").classList.toggle("active")
          })
loadUserInfo()