1. Introducción
•	Nombre del Proyecto: TriNotes
•	Descripción breve: Aplicación web para crear, editar, organizar y gestionar notas personales.
•	Tecnologías utilizadas:
•	Vue 3 + Vite
•	Pinia (Estado entre componentes)
•	Supabase (backend como servicio)
•	SweetAlert (alertas personalizadas)
•	CSS + Flexbox + Media Queries
•	LocalStorage (si aplica)


________________________________________
🗂️ 2. Estructura del Proyecto
•	Carpeta /components: Componentes reutilizables (navbar, footer, notas, login).
•	Carpeta /views: Vistas de rutas específicas (login, profile, notes).
•	Carpeta /stores: Módulos de Pinia para manejo del estado global.
•	Carpeta /supabase: Conexión a Supabase para autenticación y base de datos.
•	Archivo principal: App.vue – Estructura general de la app (navbar + router-view + footer).
________________________________________




🧩 3. Componentes principales
🧭 GlobalNavbar.vue
•	Menú tipo hamburguesa para móviles.
•	Animación de apertura (3 barras → "X").
•	Condición de sesión activa para mostrar “Sign Out”.
•	Responsive con media queries.



🔄 Drag and Drop (Arrastrar y soltar)
js
CopiarEditar
startDrag(e, task, areaRef) {
  this.dragging = { task, areaRef };
  const areaRect = this.$refs[areaRef].getBoundingClientRect();
  const elRect = e.currentTarget.getBoundingClientRect();
  this.offset = {
    x: e.clientX - elRect.left,
    y: e.clientY - elRect.top,
  };
  document.addEventListener("mousemove", this.onDrag);
  document.addEventListener("mouseup", this.stopDrag);
},

onDrag(e) {
  if (!this.dragging) return;
  const { task, areaRef } = this.dragging;
  const areaRect = this.$refs[areaRef].getBoundingClientRect();
  task.x = e.clientX - areaRect.left - this.offset.x;
  task.y = e.clientY - areaRect.top - this.offset.y;
},

stopDrag(e) {
  // Detecta en qué zona se soltó la tarea y actualiza el estado
  // Guarda las nuevas posiciones
  document.removeEventListener("mousemove", this.onDrag);
  document.removeEventListener("mouseup", this.stopDrag);
  this.dragging = null;
}
________________________________________
🔁 Gestión dinámica de estados
js
CopiarEditar
cycleStatus(task) {
  const idx = this.ListStore.statuses.indexOf(task.is_complete);
  const next = this.ListStore.statuses[(idx + 1) % 3];
  this.ListStore.changeStatusById(task.id, next);
  task.is_complete = next;
}
•	Uso: Permite alternar entre Pendiente, En Progreso y Terminada haciendo clic en el estado de la tarjeta.
________________________________________


📦 Zonas droppables (HTML + estilo de área)
html
CopiarEditar
<!-- Zona de tareas Pendientes -->
<div class="drop-area pending-area" ref="pendingArea">
  <h3>Pendientes</h3>
  <div
    v-for="task in pendingTasks"
    :key="task.id"
    class="task-card pending"
    @mousedown="startDrag($event, task, 'pendingArea')"
    :style="getStyle(task, 'pendingArea')"
  >
    <!-- contenido de la tarjeta -->
  </div>
</div>
css
CopiarEditar
.pending-area {
  grid-area: pendiente;
  background-color: rgba(248, 215, 218, 0.4);
  backdrop-filter: blur(6px);
}
Cada zona (pendingArea, inprogressArea, doneArea) actúa como un "contenedor de caída", permitiendo cambiar el estado al soltar una tarea dentro de ellas.

📒 NotesApp.vue
•	Área de notas con:
o	Creación y edición de notas.
o	Cambio de estado (ej. completada, pendiente).
o	Funcionalidad drag & drop.
o	Transparencia visual en tarjetas.
👤 ProfileLog.vue
•	Vista de perfil del usuario autenticado.
•	Información del usuario desde Supabase.
🔐 AuthLogIn.vue / SignUp.vue
•	Componentes de autenticación con Supabase (email y password).
•	Manejo de sesiones y redirecciones con router.
📦 store.js, Login.js
•	Estado centralizado con Pinia.
•	Estado de usuario, autenticación, flags de UI.
________________________________________
🔌 4. Integraciones técnicas
🔐 Supabase
•	Autenticación: Inicio de sesión, cierre de sesión.
•	Persistencia de sesión: onAuthStateChange() integrado tanto en App.vue como en Navbar.
📦 Pinia
•	Manejo de estado de sesión (store.user).
•	Reactividad global para mostrar cambios en tiempo real.
🎨 Estilo y UX
•	Estilos limpios y adaptativos.
•	CSS personalizado + transiciones para UX moderno.
•	Footer con íconos sociales (usando FontAwesome).
________________________________________
📱 5. Diseño Responsivo
•	Navbar adaptado con menú hamburguesa.
•	Layout principal responsivo para escritorio y móviles.
•	Scroll habilitado en menús móviles sin bloquear el body.
________________________________________
🧪  Demostración 
•	Registrar / iniciar sesión.
•	Crear nota, moverla, editarla.
•	Cerrar sesión.
________________________________________
✅ 7. Conclusión y mejoras futuras
•	Proyecto funcional, con backend en la nube y frontend responsivo.
•	Futuras mejoras:
o	Guardado de notas en Supabase.
o	Filtros por fecha, prioridad o estado.
o	Tema oscuro.
o	Notificaciones push (ej. recordatorios).
________________________________________



https://68380d9b9de8620009a70602--trinotes.netlify.app/