<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { firebaseAuthentication, signInWithEmailAndPassword } from '@/firebase/database';
import { deleteUser } from 'firebase/auth';

import { useRouter } from 'vue-router';

let props = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
});

let emit = defineEmits(['resetuser']);

const passwordResponse = ref(null);
const router = useRouter();

function checkPasswordValid(values) {
  signInWithEmailAndPassword(firebaseAuthentication, props.user.email, values.currentPassword).then(
    (userCredential) => {
      deleteUserProfile();
    },
    (error) => {
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        passwordResponse.value = 'The current password you entered is incorrect.';
      }
    }
  );
}
function deleteUserProfile() {
  deleteUser(firebaseAuthentication.currentUser)
    .then(() => {
      router.push({
        name: 'GeneralMessage',
        params: { message: 'User account deleted. Redirecting to homepage shortly...' }
      });
      emit('resetuser');
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

      <h2>Delete Account</h2>
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

      <div v-if="passwordResponse">
        {{ passwordResponse }}
      </div>

      <button class="w-100 btn btn-lg btn-primary" style="margin: auto">Delete Account</button>
    </Form>
  </div>
  <div v-else>
    <h1>You are not logged in.</h1>
  </div>
</template>

<style></style>
