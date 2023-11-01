<script setup>
import { ref } from 'vue';

import { Form, Field, ErrorMessage } from 'vee-validate';
import { validateEmail, checkPasswordLength } from '../assets/utils.js';

import { firebaseAuthentication, signInWithEmailAndPassword } from '@/firebase/database';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import { useRouter } from 'vue-router';

const loginResponse = ref(null);

const router = useRouter();

function login(values) {
  signInWithEmailAndPassword(firebaseAuthentication, values.email, values.password).then(
    (userCredential) => {
      router.push({
        name: 'GeneralMessage',
        params: { message: 'Successfully logged in. Redirecting to home page.' }
      });
      setTimeout(home, 1500);
    },
    (error) => {
      loginResponse.value = error.message;
    }
  );
}

function resetPassword() {
  router.push('/resetpassword');
}

function home() {
  router.push('/');
}

function loginGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((currentUser) => {
      router.push({
        name: 'GeneralMessage',
        params: { message: 'Successfully logged in using google. Redirecting to home page.' }
      });
      setTimeout(home, 1500);
    })
    .catch((error) => {
      loginResponse.value = error;
    });
}
</script>

<template>
  <main>
    <div v-if="!firebaseAuthentication.currentUser">
      <Form label-width="50px" class="form-signin" @submit="login">
        <h2 class="h3 mb-3 fw-normal">Login</h2>

        <div class="form-floating">
          <Field
            class="form-control"
            type="email"
            placeholder="email"
            autocomplete="off"
            name="email"
            :rules="validateEmail"
          />
          <ErrorMessage name="email" />
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
          <Field
            class="form-control"
            type="password"
            placeholder="password"
            autocomplete="off"
            name="password"
            :rules="checkPasswordLength"
          />
          <ErrorMessage name="password" />
          <label for="floatingInput">Password</label>
        </div>
        <div v-if="loginResponse">
          <p>{{ loginResponse }}</p>
        </div>

        <a @click="resetPassword">Reset Password</a>

        <button class="w-100 btn btn-lg btn-primary" style="margin: auto; margin-bottom: 1px">
          Login
        </button>
        <button class="w-100 btn btn-lg btn-primary" style="margin: auto" @click="loginGoogle">
          Sign in with Google
        </button>
      </Form>
    </div>

    <div v-else>
      <h1>You are already logged in.</h1>
    </div>
  </main>
</template>

<style>
html,
body {
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
label {
  color: darkslategrey;
}
</style>
