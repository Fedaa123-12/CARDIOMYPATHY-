<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Form, Field, ErrorMessage } from 'vee-validate';
import { validateEmail } from '../assets/utils.js';

import {
  firebaseAuthentication,
  createUserWithEmailAndPassword,
  updateProfile
} from '@/firebase/database';
defineEmits(['register-clicked']);

const registerResponse = ref('');

const router = useRouter();

function register(values) {
  createUserWithEmailAndPassword(firebaseAuthentication, values.email, values.password)
    .then((userCredentials) => {
      userCredentials.firstName = values.firstName;
      userCredentials.surname = values.surname;
      userCredentials.displayName = values.displayName;
    })
    .then(() =>
      updateProfile(firebaseAuthentication.currentUser, {
        displayName: values.displayName,
        firstName: values.firstName,
        surname: values.surname
      }).then(() => {
        router.push({
          name: 'GeneralMessage',
          params: {
            message:
              'Successfully registered and automatically logged in. Redirecting to home page.'
          }
        });
        setTimeout(home, 1500);
      })
    )
    .catch((error) => {
      registerResponse.value = error.message;
    });
}

function home() {
  router.push('/');
}
</script>

<template>
  <div v-if="!firebaseAuthentication.currentUser">
    <Form label-width="95px" class="demo-ruleForm form-signin" @submit="register">
      <h2>Register</h2>

      <div class="form-floating">
        <Field
          class="form-control"
          placeholder="First Name"
          autocomplete="off"
          name="firstName"
          rules="required"
        />
        <ErrorMessage name="firstName" />
        <label for="floatingInput">First Name</label>
      </div>
      <div class="form-floating">
        <Field
          class="form-control"
          placeholder="Surname"
          autocomplete="off"
          name="surname"
          rules="required"
        />
        <ErrorMessage name="surname" />
        <label for="floatingInput">Surname</label>
      </div>

      <div class="form-floating">
        <Field
          class="form-control"
          placeholder="Display Name"
          autocomplete="off"
          name="displayName"
          rules="required"
        />
        <ErrorMessage name="displayName" />
        <label for="floatingInput">Display Name</label>
      </div>

      <div class="form-floating">
        <Field
          class="form-control"
          placeholder="Email"
          autocomplete="off"
          :rules="validateEmail"
          name="email"
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
          show-password
          name="password"
          rules="required"
        />
        <ErrorMessage name="password" />
        <label for="floatingInput">Password</label>
      </div>

      <div class="form-floating">
        <Field
          class="form-control"
          type="password"
          placeholder="password"
          autocomplete="off"
          show-password
          name="confirmation"
          rules="required|confirmed:password"
        />
        <ErrorMessage name="confirmation" />
        <label for="floatingInput">Confirm Password</label>
      </div>

      <div v-if="registerResponse">
        <p>{{ registerResponse }}</p>
      </div>

      <button class="w-100 btn btn-lg btn-primary" style="margin: auto">Register</button>
    </Form>
  </div>

  <div v-else>
    <h1>You are already logged in.</h1>
  </div>
</template>

<style></style>
