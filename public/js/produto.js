// function toggleCategoriaBox() {
//     const categoriaBox = document.getElementById('categoria-box');
//     if (categoriaBox.style.display === 'block') {
//       categoriaBox.style.display = 'none';
//     } else {
//       categoriaBox.style.display = 'block';
//     }
//   }
  
//   function irParaCategoria(tipoCategoriaId) {
//     // Redireciona para a página da categoria escolhida
//     window.location.href = `/produtos?categoria=${encodeURIComponent(tipoCategoriaId)}`;
//   }
  

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-categorias");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }
  