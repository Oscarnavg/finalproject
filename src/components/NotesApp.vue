<template>
  <div class="principal">
    <div class="todo-container">
      <div class="todo-card">
        <div class="card-body">
          <!-- Header -->
          <div class="header">
            <img src="/src/assets/logocheckme.png" alt="Check" class="logo" />
            <h2 class="title">Master Plan</h2>
          </div>

          <!-- Nota blanca central (post-it) -->
          <div class="task-note">
            <h4 class="note-title">
              {{ isEditing ? 'Editar tarea' : 'Crear nueva tarea' }}
            </h4>
            <input
              v-model="ListStore.task"
              type="text"
              placeholder="Título de la tarea"
              class="note-input"
            />
            <textarea
              v-model="ListStore.description"
              placeholder="Descripción de la tarea"
              class="note-input note-textarea"
            ></textarea>
            <button @click="saveTask" class="action-button">
              {{ isEditing ? 'Actualizar tarea' : 'Generar Tarea' }}
            </button>
          </div>

          <!-- Áreas droppables -->
          <div class="task-list drag-area">
            <!-- Pendientes -->
            <div class="drop-area pending-area" ref="pendingArea">
              <h3>Pendientes</h3>
              <div
                v-for="task in pendingTasks"
                :key="task.id"
                class="task-card pending"
                :class="{ dragging: dragging?.task.id === task.id }"
                :style="getStyle(task, 'pendingArea')"
                @mousedown="startDrag($event, task, 'pendingArea')"
              >
                <div class="task-actions">
                  <span
                    @click.stop="ListStore.editTask(taskIndex(task))"
                    class="edit"
                    >✎</span
                  >
                  <span @click.stop="deleteTaskKeep(task.id)" class="delete"
                    >🗑️</span
                  >
                </div>
                <h5 class="task-title">{{ task.title }}</h5>
                <h6
                  class="task-status"
                  :class="{ finished: task.is_complete === 'Terminada' }"
                  @click.stop="cycleStatus(task)"
                >
                  {{ task.is_complete }}
                </h6>
                <hr />
                <p>{{ task.description }}</p>
              </div>
            </div>

            <!-- En Progreso -->
            <div class="drop-area inprogress-area" ref="inprogressArea">
              <h3>En Progreso</h3>
              <div
                v-for="task in inProgressTasks"
                :key="task.id"
                class="task-card inprogress"
                :class="{ dragging: dragging?.task.id === task.id }"
                :style="getStyle(task, 'inprogressArea')"
                @mousedown="startDrag($event, task, 'inprogressArea')"
              >
                <div class="task-actions">
                  <span
                    @click.stop="ListStore.editTask(taskIndex(task))"
                    class="edit"
                    >✎</span
                  >
                  <span @click.stop="deleteTaskKeep(task.id)" class="delete"
                    >🗑️</span
                  >
                </div>
                <h5 class="task-title">{{ task.title }}</h5>
                <h6
                  class="task-status"
                  :class="{ finished: task.is_complete === 'Terminada' }"
                  @click.stop="cycleStatus(task)"
                >
                  {{ task.is_complete }}
                </h6>
                <hr />
                <p>{{ task.description }}</p>
              </div>
            </div>

            <!-- Terminadas -->
            <div class="drop-area done-area" ref="doneArea">
              <h3>Completadas</h3>
              <div
                v-for="task in doneTasks"
                :key="task.id"
                class="task-card done"
                :class="{ dragging: dragging?.task.id === task.id }"
                :style="getStyle(task, 'doneArea')"
                @mousedown="startDrag($event, task, 'doneArea')"
              >
                <div class="task-actions">
                  <span @click.stop="deleteTaskKeep(task.id)" class="delete"
                    >🗑️</span
                  >
                </div>
                <h5 class="task-title">{{ task.title }}</h5>
                <h6 class="task-status finished">{{ task.is_complete }}</h6>
                <hr />
                <p>{{ task.description }}</p>
              </div>
            </div>
          </div>
          <!-- /Áreas droppables -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import useListStore from "../stores/List";

export default {
  name: "ToDoList",
  data() {
    return {
      dragging: null,
      offset: { x: 0, y: 0 },
    };
  },
  computed: {
    ...mapStores(useListStore),
    pendingTasks() {
      return this.ListStore.tasksList.filter(
        (t) => t.is_complete === "Pendiente"
      );
    },
    inProgressTasks() {
      return this.ListStore.tasksList.filter(
        (t) => t.is_complete === "En Progreso"
      );
    },
    doneTasks() {
      return this.ListStore.tasksList.filter(
        (t) => t.is_complete === "Terminada"
      );
    },
    isEditing() {
      return this.ListStore.editedTask !== null;
    },
  },
  methods: {
    taskIndex(task) {
      return this.ListStore.tasksList.findIndex((t) => t.id === task.id);
    },
    async saveTask() {
      await this.ListStore.submitTask();
      this.loadPositions();
    },
    async deleteTaskKeep(id) {
      await this.ListStore.deleteTask(id);
      this.loadPositions();
    },
    startDrag(e, task, areaRef) {
      this.dragging = { task, areaRef };
      const areaRect = this.$refs[areaRef].getBoundingClientRect();
      const elRect = e.currentTarget.getBoundingClientRect();
      if (task.x == null || task.y == null) {
        task.x = elRect.left - areaRect.left;
        task.y = elRect.top - areaRect.top;
      }
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
    async stopDrag(e) {
      if (!this.dragging) return;
      const { task } = this.dragging;
      const zones = {
        Pendiente: this.$refs.pendingArea.getBoundingClientRect(),
        "En Progreso": this.$refs.inprogressArea.getBoundingClientRect(),
        Terminada: this.$refs.doneArea.getBoundingClientRect(),
      };
      for (let status in zones) {
        const r = zones[status];
        if (
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom
        ) {
          if (task.is_complete !== status) {
            await this.ListStore.changeStatusById(task.id, status);
            task.is_complete = status;
          }
          task.x = e.clientX - r.left - this.offset.x;
          task.y = e.clientY - r.top - this.offset.y;
        }
      }
      localStorage.setItem(
        "taskPositions",
        JSON.stringify(
          this.ListStore.tasksList.map((t) => ({
            id: t.id,
            x: t.x,
            y: t.y,
          }))
        )
      );
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);
      this.dragging = null;
    },
    getStyle(task, areaRef) {
      if (task.x == null || task.y == null) return {};
      return {
        position: "absolute",
        left: task.x + "px",
        top: task.y + "px",
        cursor: "grab",
        zIndex: this.dragging?.task.id === task.id ? 1000 : 10,
      };
    },
    async cycleStatus(task) {
      const idx = this.ListStore.statuses.indexOf(task.is_complete);
      const next = this.ListStore.statuses[(idx + 1) % 3];
      await this.ListStore.changeStatusById(task.id, next);
      task.is_complete = next;
    },
    loadPositions() {
      const saved = localStorage.getItem("taskPositions");
      if (!saved) return;
      JSON.parse(saved).forEach(({ id, x, y }) => {
        const t = this.ListStore.tasksList.find((t) => t.id === id);
        if (t) {
          t.x = x;
          t.y = y;
        }
      });
    },
  },
  async mounted() {
    await this.ListStore.CallData();
    this.loadPositions();
  },
};
</script>

<style scoped>
.principal {
  background-color: #212529;
  padding: 3rem 1rem;
  min-height: 100vh;
  color: #fff;
}
.todo-container {
  max-width: 1100px;
  margin: 0 auto;
}
.todo-card {
  background-image: url(..//assets/Background-notes.png);
  background-size: cover;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  overflow: visible;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}
.logo {
  width: 80px;
  margin-bottom: 1rem;
}
.title {
  font-size: 2.3rem;
  margin-bottom: 1rem;
  color: rgb(100, 96, 96);
}

/* Mantengo tus estilos anteriores de inputs y botón (por si hay otra parte que los use) */
.task-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}
.input-task,
.input-desc {
  flex: 1 1 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  min-width: 220px;
}
.task-button-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.submit-button {
  background-color: #ffc107;
  color: #212529;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.submit-button:hover {
  background-color: #e0a800;
}


/* Nota blanca estilo post-it */
.task-note {
  background: rgb(124, 141, 149);
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
}
.note-title {
  margin: 0 0 0.75rem;
  font-size: 1.6rem;
  color: rgb(229, 239, 240);
  text-align: center;
}
.note-input {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}
.note-textarea {
  resize: vertical;
  min-height: 80px;
}
.action-button {
  display: block;              /* Hacer que ocupe toda la línea */
  margin: 0.5rem auto 0;
  background-color: #a4c2c7;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 0.5rem;
}
.action-button:hover {
  opacity: 0.85;
}

/* Zonas droppables */
.drag-area {
  display: grid;
  grid-template-areas:
    "pendiente inprogress"
    "done done";
  grid-gap: 1rem;
  min-height: 600px;
  margin-top: 2rem;
}
.drop-area {
  position: relative;
  padding: 0.5rem;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  overflow: visible;
}
.pending-area {
  grid-area: pendiente;
  background-color: rgba(248, 215, 218, 0.4); /* rosa claro con transparencia */
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px); /* para compatibilidad con Safari */
}

.inprogress-area {
  grid-area: inprogress;
  background-color: rgba(255, 243, 205, 0.4); /* amarillo claro con transparencia */
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

h3 {
  color: rgb(110, 102, 102);
}

.done-area {
  grid-area: done;
  background-color: rgba(212, 237, 218, 0.4); /* verde claro con transparencia */
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}


/* Tarjetas */
.task-card {
  width: 210px;
  padding: 1rem;
  background: white;
  color: black;
  border-radius: 1rem;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  text-align: center;
  transform: rotate(-6deg);
  user-select: none;
  transition: box-shadow 0.2s ease;
}
.task-card.dragging {
  cursor: grabbing;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

/* Botones de tarjeta */
.task-actions {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  display: flex;
  gap: 0.5rem;
}
.edit,
.delete {
  cursor: pointer;
  font-size: 1.2rem;
}

/* Colores según status */
.pending {
  background-color: #dc3545;
  color: white;
}
.inprogress {
  background-color: #ffc107;
  color: white;
}
.done {
  background-color: #28a745;
  color: white;
}

.task-status {
  margin-top: 0.5rem;
  font-weight: bold;
  cursor: pointer;
}
.finished {
  text-decoration: line-through;
}

/* Responsive */
@media (max-width: 768px) {
  .task-note {
    max-width: 100%;
  }
  .drag-area {
    grid-template-areas:
      "pendiente"
      "inprogress"
      "done";
  }
}
</style>