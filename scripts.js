
// Datos de proyectos (simulando una "base de datos" local) 
const proyectos = [ 
    { 
    titulo: "Sistema de Inventario", 
    tech: "HTML, CSS, JS", 
    desc: "CRUD básico con LocalStorage" 
}, 
{ 
    titulo: "Clon de Calculadora", 
    tech: "JavaScript puro", 
    desc: "Operaciones matemáticas con eval seguro" 
}, 
{ 
    titulo: "Dashboard de Clima", 
    tech: "Fetch API + OpenWeather", 
    desc: "Consume API REST pública" 
} 
]; // Función para renderizar proyectos en el DOM function renderizarProyectos() 

{ 
    const contenedor = document.querySelector('.grid-proyectos'); 
    proyectos.forEach(proyecto => { const card = document.createElement('article'); card.className = 'card-proyecto'; card.innerHTML = `<h3>${proyecto.titulo}</h3><span class="tech">${proyecto.tech}</span><p>${proyecto.desc}</p>`; contenedor.appendChild(card); }); } // Evento: scroll suave al hacer clic en navegación document.querySelectorAll('nav a').forEach(enlace => { enlace.addEventListener('click', (e) => { e.preventDefault(); const destino = document.querySelector(enlace.getAttribute('href')); destino.scrollIntoView({ behavior: 'smooth' }); }); }); // Inicialización document.addEventListener('DOMContentLoaded', renderizarProyectos);