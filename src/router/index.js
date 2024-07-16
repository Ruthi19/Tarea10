import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// Importar componentes
import TodoList from '../views/TodoList.vue'
import IssueList from '../views/IssueList.vue';
import TodosIssues from '../views/TodosIssues.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Se ha añadido la ruta '/todos'.
  {
    path: '/todo-list',
    name: 'TodoList',
    component: TodoList
  },
  
  {
    path: '/issue-list',
    name: 'IssueList',
    component: IssueList
  },
  {
    path: '/todos-issues',
    name: 'Todosissues',
    component: TodosIssues
  }

  // Definición en Acerca de borrado.
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
