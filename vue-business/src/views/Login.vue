<template>
  <div 
  id='login'
  class='login'>
    <h2>LOGIN</h2>
    <form>

      <!-- Email Input -->
      <div class='input-container'>
      <label 
      for='email'
      >E-mail:</label
      >
      <input
      id= 'email' 
      type='email' 
      name='email' 
      placeholder='E-mail'
      required  
      v-model='email'
      />
      <p
      id='emailErr'
      ></p>
      </div>

      <!-- Password Input -->
      <div class='input-container'>
      <label 
      for='password'
      >Passsword:</label
      >
      <input 
      id='password'
      type='password' 
      name='password' 
      placeholder='Password'
      minlength='8'
      maxlength='64'
      title='Password must contain between 8 and 64 characters and include at least 1 capital letter, 1 lowercase letter and 1 number'
      v-model='password'
      required
      />
      <p 
      id="passwordErr"
      ></p>
      </div>

      <!--Login Button -->
      <button
      class='btnLogin'
      @click.prevent='loginUser()'
      >Login</button
      >
    </form>
  </div>
</template>

<script>
import UserDataService from '../service/usersDataService';

export default {
  name: 'Login',
  data(){
    return {
      email: 'admin@mail.com',
      password: 'sTr0nGpA55'
    }
  },
  methods: {

      // Checks the email and password inputs, if valid they are sent to the axios post method for a user.
      // If the server responds with 'Correct password' the user is redirected to the Employee's Table page
      loginUser(){
      const passRegEx = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d).{8,64}$/;
      const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      const emailErr = document.getElementById('emailErr');
      const passwordErr = document.getElementById('passwordErr');

       
      if (!emailRegEx.test(this.email)) {
          emailErr.innerHTML = 'Invalid e-mail address';
          return;
      };

      if (!passRegEx.test(this.password)) {
          passwordErr.innerHTML = 'Invalid password';
          return;       
      };
        
      UserDataService.Login({
            user_email: this.email,
            user_password: this.password
          })
          .then(res => {
            if (res.data === 'Correct password'){
                this.$store.dispatch('loginUser');
                this.$router.push({ name: 'Employees'})
            } else {
              console.log(res.data);
            }
          })
          .catch(err=>{
            console.log(err);
          })
    }
     
  }
}
</script>

<style>
.login {
  width: 250px;
  height: 350px;
  margin: auto;
  border: 5px solid #24308b;
  border-radius: 25px;
  background-color: #4f99af;
}

h2 {
  color: #fff;
}

label {
 display: block;
 padding-bottom: 10px;
 font-weight:bold;
 color: #fff;
 text-shadow: 2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
    -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,
    -2px 0px 0 #000000, 0px -2px 0 #000000, -3px 3px 2px rgba(206,89,55,0);
}

.input-container {
  margin-bottom: 20px;
}

button {
  display: block;
  margin: 25px auto;
  border-radius: 25px;
  background-color: #24308b;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  padding: 10px;
}

.btnLogin {
  text-align: center;
  width: 100px;
}
</style>
