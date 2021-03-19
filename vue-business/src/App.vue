<template>
<div>
  <!-- The navigation -->
  <div id='nav'>
  <router-link :to="{ name:'Login' }">Login</router-link>
  <router-link :to="{ name: 'Employees'}">Employees</router-link>
  <router-link :to="{ name: 'Employees_Form'}">New Employee</router-link>
  </div>
  <router-view />
</div>
</template>

<script>



export default {
  name: 'App'
}
</script>

<style>
*{
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #000000;
  margin: 5px
}

#nav a.router-link-exact-active {
  color: #fff;
  text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5,
   -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5,
   -2px 0px 0 #4074b5, 0px -2px 0 #4074b5, -3px 3px 2px rgba(206,89,55,0);
}
</style>
