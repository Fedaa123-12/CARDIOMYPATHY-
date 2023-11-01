<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import {
  firebaseAuthentication,
  updatePassword,
  signInWithEmailAndPassword
} from '@/firebase/database';
import { useRouter } from 'vue-router';

let props = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
});

const passwordResponse = ref(null);
const router = useRouter();

function checkPasswordValid(values) {
  signInWithEmailAndPassword(firebaseAuthentication, props.user.email, values.currentPassword).then(
    (userCredential) => {
      changePassword(values);
    },
    (error) => {
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        passwordResponse.value = 'The current password you entered is incorrect.';
      }
    }
  );
}
function changePassword(values) {
  updatePassword(firebaseAuthentication.currentUser, values.password)
    .then(() => {
      router.push({
        name: 'GeneralMessage',
        params: { message: 'Password successfully updated. Redirecting to home page.' }
      });
      setTimeout(home, 1500);
    })

    .catch((error) => {
      if (
        error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'
      ) {
        passwordResponse.value = 'Password must be at least 6 characters';
      }
    });
}

function home() {
  router.push('/');
}
</script>

<template>
  <div v-if="user">
    <Form label-width="95px" class="demo-ruleForm form-signin" @submit="checkPasswordValid">
      <h1>Your Details</h1>
      <p>
        <strong>Email: </strong>{{ props.user.email }}<br />
        <strong>Display Name: </strong>{{ props.user.displayName }}<br />
        <strong>Email Verified: </strong>{{ props.user.emailVerified }}<br />
      </p>

      <h2>Update Password</h2>
      <div class="form-floating">
        <Field
          class="form-control"
          type="password"
          placeholder="password"
          autocomplete="off"
          name="currentPassword"
          rules="required"
        />
        <ErrorMessage name="currentPassword" />
        <label for="floatingInput">Current Password</label>
      </div>

      <div class="form-floating">
        <Field
          class="form-control"
          type="password"
          placeholder="password"
          required
          autocomplete="off"
          name="password"
          rules="required"
        />
        <ErrorMessage name="password" />
        <label for="floatingInput">New Password</label>
      </div>

      <div class="form-floating">
        <Field
          class="form-control"
          type="password"
          placeholder="password"
          autocomplete="off"
          name="confirmation"
          rules="required|confirmed:password"
        />
        <ErrorMessage name="confirmation" />
        <label for="floatingInput">Confirm New Password</label>
      </div>

      <div v-if="passwordResponse">
        {{ passwordResponse }}
      </div>

      <button class="w-100 btn btn-lg btn-primary" style="margin: auto">Update Password</button>
    </Form>
  </div>

  <div v-else>
    <h1>You are not logged in.</h1>
  </div>
</template>

<style></style>
