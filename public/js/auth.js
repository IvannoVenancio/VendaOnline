async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Login bem-sucedido');
        window.location.href = '/paginaProtegina';
      } else {
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      alert('Erro ao conectar: ' + error.message);
    }
  }
  
  async function logout() {
    await fetch('/logout', { method: 'POST' });
    alert('Logout realizado com sucesso');
    window.location.href = '/login';
  }
  