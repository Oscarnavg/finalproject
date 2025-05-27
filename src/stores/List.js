import { defineStore } from "pinia";
import { supabase } from '../supabase/index'

export default defineStore("List", {
  state() {
    return {
      user: supabase.auth.user(),
      tasksList: [],
      task: "",
      description: "",
      statuses: ["Pendiente", "En Progreso", "Terminada"],
      editedTask: null,
    };
  },
  actions: {
    async CallData() {
      const { data } = await supabase
        .from("tasks")
        .select("title, is_complete, id, inserted_at, description")
        .eq("user_id", this.user.id)
        .order('inserted_at', { ascending: true });
      this.tasksList = data;
    },

    async submitTask() {
      if (this.task.length < 4)
        return swal("", "Ingrese más de 3 caracteres en el título", "error");
      if (this.task.length > 20)
        return swal("", "Ingrese menos de 20 caracteres en el título", "error");
      if (this.description.length > 70)
        return swal("", "Ingrese menos de 60 caracteres en la descripción", "error");

      if (this.editedTask === null) {
        // nueva tarea, siempre nace 'Pendiente'
        await supabase.from("tasks").insert({
          title: this.task,
          description: this.description,
          is_complete: "Pendiente",
          user_id: this.user.id,
        });
      } else {
        // edición de título/descripción
        const t = this.tasksList[this.editedTask];
        await supabase
          .from("tasks")
          .update({
            title: this.task,
            description: this.description,
          })
          .eq("id", t.id);
        this.editedTask = null;
      }

      this.task = "";
      this.description = "";
      await this.CallData();
    },

    async deleteTask(id) {
      await supabase.from("tasks").delete().eq("id", id);
      await this.CallData();
    },

    editTask(index) {
      this.task = this.tasksList[index].title;
      this.description = this.tasksList[index].description;
      this.editedTask = index;
    },

    /** Actualiza estado en Supabase y en memoria */
    async changeStatusById(id, newStatus) {
      await supabase
        .from("tasks")
        .update({ is_complete: newStatus })
        .eq("id", id);
      const t = this.tasksList.find((t) => t.id === id);
      if (t) t.is_complete = newStatus;
    },
  },
});