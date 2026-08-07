
const proyectos = [
    {
        id: 1,
        titulo: "Sistema de Inventario",
        categoria: "sistemas",
        tech: "HTML, CSS, JS",
        desc: "CRUD básico con LocalStorage",
        link: "https://github.com"
    },
    {
        id: 2,
        titulo: "Clon de Calculadora",
        categoria: "sistemas",
        tech: "JavaScript puro",
        desc: "Operaciones matemáticas con eval seguro",
        link: "https://github.com"
    },
    {
        id: 3,
        titulo: "Dashboard de Clima",
        categoria: "sistemas",
        tech: "Fetch API + OpenWeather",
        desc: "Consume API REST pública",
        link: "https://github.com"
    },
    {
        id: 4,
        titulo: "Sistema integrado para restaurante Kaypi",
        categoria: "web",
        tech: "PHP, Laravel Framework, Blade Engine, HTML5, Tailwind CSS, FontAwesome 6, Alpine.js, JavaScript Nativo (ES6+) / Fetch API, W3C Validator, SonarQube",
        desc: "Herramienta visual interactiva para simular algoritmos del sistema operativo como FCFS, SJF y Round Robin.",
        link: "https://https://github.com/FrancoFernandezValencia1/restaurante-kaypi-v2.com"
    }
];

// 2. RENDERIZADO DINÁMICO DE PROYECTOS

function renderizarProyectos(listaProyectos) {
    const contenedor = document.getElementById('grid-proyectos');
    contenedor.innerHTML = ''; // Limpiar contenedor

    if (listaProyectos.length === 0) {
        contenedor.innerHTML = '<p>No hay proyectos en esta categoría.</p>';
        return;
    }

    listaProyectos.forEach(proyecto => {
        const card = document.createElement('article');
        card.className = 'card-proyecto';
        
        card.innerHTML = `
            <div>
                <h3>${proyecto.titulo}</h3>
                <span class="tech-badge">${proyecto.tech}</span>
                <p>${proyecto.desc}</p>
            </div>
            <a href="${proyecto.link}" target="_blank" rel="noopener" class="card-link">Ver en GitHub →</a>
        `;
        
        contenedor.appendChild(card);
    });
}

// 3. FILTRO DE PROYECTOS

function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll('.filter-btn');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Remover clase active de todos los botones
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            const categoria = boton.getAttribute('data-filter');

            if (categoria === 'todos') {
                renderizarProyectos(proyectos);
            } else {
                const proyectosFiltrados = proyectos.filter(p => p.categoria === categoria);
                renderizarProyectos(proyectosFiltrados);
            }
        });
    });
}

// 4. CAMBIO DE TEMA 

function inicializarTema() {
    const themeBtn = document.getElementById('theme-toggle');
    const temaGuardado = localStorage.getItem('theme');

    // Aplicar tema previo si existe
    if (temaGuardado === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = 'Claro';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const esOscuro = document.body.classList.contains('dark-mode');
        
        themeBtn.textContent = esOscuro ? 'Claro' : 'Oscuro';
        localStorage.setItem('theme', esOscuro ? 'dark' : 'light');
    });
}

// 5. MENÚ RESPONSIVO

function inicializarMenuMobile() {
    const menuBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cargar clic en enlaces para cerrar menú móvil automáticamente
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// 6. VALIDACIÓN DE FORMULARIO DE CONTACTO

function inicializarFormulario() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let esValido = true;

        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');

        // Limpiar errores previos
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

        // Validar Nombre
        if (nombre.value.trim() === '') {
            mostrarError(nombre, 'El nombre es obligatorio.');
            esValido = false;
        }

        // Validar Email con Expresión Regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            mostrarError(email, 'Ingresa un correo electrónico válido.');
            esValido = false;
        }

        // Validar Mensaje
        if (mensaje.value.trim().length < 10) {
            mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
            esValido = false;
        }

        if (esValido) {
            feedback.className = 'form-feedback success';
            feedback.textContent = '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.';
            form.reset();

            setTimeout(() => {
                feedback.className = 'form-feedback';
                feedback.textContent = '';
            }, 5000);
        }
    });
}

function mostrarError(inputElement, mensaje) {
    const errorSmall = inputElement.nextElementSibling;
    if (errorSmall && errorSmall.classList.contains('error-msg')) {
        errorSmall.textContent = mensaje;
    }
}

// INICIALIZACIÓN GENERAL

document.addEventListener('DOMContentLoaded', () => {
    renderizarProyectos(proyectos);
    inicializarFiltros();
    inicializarTema();
    inicializarMenuMobile();
    inicializarFormulario();
});