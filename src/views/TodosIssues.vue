<template>
  <div>
    <h1>Lista de tareas</h1>
    <!-- formulario de entrada de tareas -->
    <form @submit.prevent="addTodo()">
      <el-input placeholder="todo" v-model="todo"></el-input>
    </form>
    <el-row :gutter="12">
      <!-- área de visualización de tareas pendientes -->
      <TodoItem 
        v-for="(todo, index) in todos" 
        :key="'todo-' + index" 
        :title="todo"
        :index="index"
        :type="'todo'"
        :item="todo"
        @remove="removeTodo" 
      />
    </el-row>
    <el-row :gutter="12" v-if="issues.length > 0">
      <TodoItem 
        v-for="(issue, index) in issues" 
        :key="'issue-' + index" 
        :title="issue.title"
        :index="index"
        :type="'issue'"
        :item="issue"
        @close-issue="handleCloseIssue"
      />
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from '@/components/TodoItem';

const client = axios.create({
  baseURL: process.env.VUE_APP_GITHUB_ENDPOINT,
  headers: {
    'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
});

export default {
  name: 'TodosIssues',
  components: {
    TodoItem,
  },
  data() {
    return {
      todo: '',
      todos: [],
      issues: [],
    };
  },
  methods: {
    addTodo() {
      this.todos.push(this.todo);
      this.todo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    handleCloseIssue(issue) {
      // Cerrar el issue en GitHub
      client.patch(`/issues/${issue.number}`, { state: 'closed' })
        .then(() => {
          // Emitir evento para indicar que se cerró el issue
          this.$emit('issue-closed', issue);
          // Eliminar el issue de la lista después de cerrarlo
          const index = this.issues.findIndex(i => i.number === issue.number);
          if (index !== -1) {
            this.issues.splice(index, 1);
          }
        })
        .catch((error) => {
          console.error("Error al cerrar el issue:", error);
        });
    },
    getIssues() {
      client.get('issues')
        .then((res) => {
          this.issues = res.data;
        })
        .catch((error) => {
          console.error("Error al obtener los issues:", error);
        });
    },
  },
  created() {
    this.getIssues(); // Cargar los issues al montar el componente
  },
  mounted() {
    this.getIssues(); // Cargar los issues nuevamente al montar el componente, asegurando disponibilidad inmediata
  },
};
</script>
