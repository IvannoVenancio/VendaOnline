document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const body = document.body;

    menuToggle.addEventListener("click", function () {
        body.classList.toggle("menu-active");
    });
});
