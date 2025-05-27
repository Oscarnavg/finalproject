<template>
  <div class="principal">
    <div class="todo-container">
      <div class="todo-card">
        <div class="card-body">
          <div class="header">
            <img src="/src/assets/logocheckme.png" alt="Check" class="logo" />
            <h2 class="title">Task List</h2>
          </div>

          <!-- Task input -->
          <div class="task-inputs">
            <input
              v-model="ListStore.task"
              type="text"
              placeholder="Ingrese tarea"
              class="input input-task"
            />
            <input
              v-model="ListStore.description"
              type="text"
              placeholder="Ingrese descripción"
              class="input input-desc"
            />
          </div>
          <div class="task-button-wrapper">
            <button @click="ListStore.submitTask" class="submit-button">
              Aceptar
            </button>
          </div>

          <!-- Tasks -->
          <div class="task-list drag-area">
            <div
              v-for="(task, index) in ListStore.tasksList"
              :key="index"
              class="task-card"
              :class="{
                pending: task.is_complete === 'Pendiente',
                inprogress: task.is_complete === 'En Progreso',
                done: task.is_complete === 'Terminada'
              }"
              :style="getStyle(task)"
              @mousedown="startDrag($event, index)"
            >
              <div class="task-actions">
                <span @click.stop="ListStore.editTask(index)" class="edit">✎</span>
                <span @click.stop="ListStore.deleteTask(index)" class="delete">🗑️</span>
              </div>

              <h5 class="task-title">{{ task.title }}</h5>
              <h6
                @click="ListStore.changeStatus(index)"
                class="task-status"
                :class="{ finished: task.is_complete === 'Terminada' }"
              >
                {{ task.is_complete }}
              </h6>
              <hr />
              <p>{{ task.description }}</p>
            </div>
          </div>
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
      draggingIndex: null,
      offset: { x: 0, y: 0 },
    };
  },
  computed: {
    ...mapStores(useListStore),
  },
  methods: {
    startDrag(e, index) {
      this.draggingIndex = index;
      const task = this.ListStore.tasksList[index];
      if (!task.x) task.x = 0;
      if (!task.y) task.y = 0;
      this.offset = {
        x: e.clientX - task.x,
        y: e.clientY - task.y,
      };
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
    },
    onDrag(e) {
      if (this.draggingIndex === null) return;
      const x = e.clientX - this.offset.x;
      const y = e.clientY - this.offset.y;
      const task = this.ListStore.tasksList[this.draggingIndex];
      task.x = x;
      task.y = y;
      this.savePositions();
    },
    stopDrag() {
      this.draggingIndex = null;
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    getStyle(task) {
      return {
        position: "absolute",
        left: (task.x || 0) + "px",
        top: (task.y || 0) + "px",
        zIndex: this.draggingIndex !== null ? 999 : 10,
        cursor: "grab",
      };
    },
    savePositions() {
      localStorage.setItem("taskPositions", JSON.stringify(this.ListStore.tasksList));
    },
    loadPositions() {
      const saved = localStorage.getItem("taskPositions");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.forEach((p, i) => {
          if (this.ListStore.tasksList[i]) {
            this.ListStore.tasksList[i].x = p.x || 0;
            this.ListStore.tasksList[i].y = p.y || 0;
          }
        });
      }
    },
  },
  mounted() {
    this.ListStore.CallData().then(() => {
      this.loadPositions();
    });
  },
};
</script>

<style scoped>
.principal {
  background-color: #212529;
  padding: 3rem 1rem;
  min-height: 100vh;
  color: #fff;
  position: relative;
}

.todo-container {
  max-width: 1100px;
  margin: 0 auto;
}

.todo-card {
  background-image: url("https://img.freepik.com/foto-gratis/textura-madera-pino_1194-5372.jpg?w=996&t=st=1665239508~exp=1665240108~hmac=01e3b3673af429c47ba8181ecf8a725fb7e18ce3d3f6d8a5c9a6006094760b05");
  background-size: auto 100%;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
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
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Task Inputs */
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

/* Task area */
.task-list {
  position: relative;
  width: 100%;
  height: 800px;
}

.task-card {
  width: 210px;
  height: 210px;
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

.task-card:active {
  cursor: grabbing;
  z-index: 999;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

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

/* Task colors by status */
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
  .task-inputs {
    flex-direction: column;
  }

  .task-button-wrapper {
    justify-content: center;
  }
}
</style>
