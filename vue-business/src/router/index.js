import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/Login.vue'
import EmployeeForm from '../views/EmployeeForm.vue'
import EmployeeTable from '../views/EmployeeTable.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
},
 {
  path: '/employees',
  name: 'Employees',
  component: EmployeeTable,
  beforeEnter: (to, from, next) => {
    if (!store.state.user.is_logged_in) next({name: 'Login'})
    else next()
  }
},
{
  path: '/employeesform',
  name: 'Employees_Form',
  component: EmployeeForm,
  beforeEnter: (to, from, next) => {
    if (!store.state.user.is_logged_in) next({name: 'Login'})
    else next()
  }
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
