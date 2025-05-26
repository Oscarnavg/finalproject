import { defineStore } from "pinia";
import { supabase } from '../supabase/index'

export default defineStore("List", {
  state() {
    return {
        user : supabase.auth.user(),
            tasks: [],
            task : "",
            description: "",
            statuses : ["Pendiente", "En Progreso", "Terminada"],
            tasksList : [],
            editedTask : null,
            editedDescription : null,
    };
  },
  actions: {
    async CallData() {
      this.tasks = await supabase
        .from("tasks")
        .select("title, is_complete, id, inserted_at, description")
        .eq("user_id", this.user.id);
      this.tasksList = [];
      for (let i = 0; i < this.tasks.data.length; i++) {
        this.tasksList.push(this.tasks.data[i]);
      }
    },

    async submitTask() {
      if (this.task.length < 4) return swal("", "Ingrese más de 3 caracteres en el título", "error");
      if (this.task.length > 20) return swal("", "Ingrese menos de 20 caracteres en el título", "error");
      if (this.description.length > 70) return swal("", "Ingrese menos de 60 caracteres en la descripción", "error");
      //Acá se debe ingresar una alerta para tareas vacias.
      if (this.editedTask === null || this.editedDescription === null) {
        
        await supabase
          .from("tasks")
          .insert({
            title: this.task,
            description: this.description,
            /*id: this.tasksList.length,*/ user_id: this.user.id,
          });
        this.CallData();
        /*this.tasksList.push({
                    title: this.task,
                    is_complete: 0,
                    id: newTask.data.id});*/
      } else {
        this.tasksList[this.editedTask].title = this.task;
        this.editedTask = null;

        this.tasksList[this.editedDescription].description = this.description;
        this.editedDescription = null;
        

        for (let i = 0; i < this.tasksList.length; ++i) {
          
          await supabase
            .from("tasks")
            .update({ title: this.tasksList[i].title, description: this.tasksList[i].description})
            .eq("id", this.tasksList[i].id);
       
            
        }
        
        
      }
      
      // To delete after add a new task
      this.task = "";
      this.description = "";
     
    },

    async deleteTask(index) {
    
      await supabase.from("tasks").delete().eq("id", this.tasksList[index].id);
      this.tasksList.splice(index, 1);
    },

    editTask(index) {
      this.task = this.tasksList[index].title;
      this.description = this.tasksList[index].description;
      this.editedTask = index;
      this.editedDescription = index;
    },

    async changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.tasksList[index].is_complete);
      if (++newIndex > 2) newIndex = 0;
      this.tasksList[index].is_complete = this.statuses[newIndex];
      await supabase
        .from("tasks")
        .update({ is_complete: this.statuses[newIndex] })
        .eq("id", this.tasksList[index].id);
      //this.CallData();
    },
  },
});
