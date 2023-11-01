<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { serverTimestamp } from '@/firebase/database';
let emit = defineEmits(['add-data']);

const data = ref({
  LEDV: '',
  LESV: '',
  LSV: '',
  LVEF: '',
  LVMASS: '',
  REDV: '',
  RESV: '',
  RSV: '',
  RVEF: '',
  SCAR: '',
  GENDER: '',
  AGEATMRI: '',
  APICALHCM: '',
  SUDDENCARDIACDEATH: '',
  DIABETES: '',
  MYECTOMY: '',
  hypertension: '',
  MYH7: '',
  MYBPC3: '',
  TNNT2: '',
  ACTC: '',
  TPM1: '',
  TNNCI: '',
  TNNI3: '',
  MYL2: '',
  TTN: '',
  createdAt: serverTimestamp()
});
const notNullObj = {};
const router = useRouter();

function addPost() {
  for (const [key, value] of Object.entries(data.value)) {
    if (value === '' || value === null) {
      notNullObj[key] = String('');
    } else if (value === 'true' || value === true) {
      notNullObj[key] = Boolean(value);
    } else if (value == 'false' || value === false) {
      notNullObj[key] = Boolean(false);
    } else if (key === 'createdAt') {
      notNullObj[key] = Date(value);
    } else {
      notNullObj[key] = Number(value);
    }
  }
  emit('add-data', notNullObj);
  router.push('/userpage');
}
</script>

<template>
  <form label-width="120px" class="addData">
    <div style="margin: auto; text-align: center">
      <h2>Add Post</h2>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LEDV" placeholder="LEDV" type="number" />
      <label for="floatingInput">LEDV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LESV" placeholder="LESV" type="number" />
      <label for="floatingInput">LESV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LSV" placeholder="LSV" type="number" />
      <label for="floatingInput">LSV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LVEF" placeholder="LVEF" type="number" />
      <label for="floatingInput">LVEF</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LVMASS" placeholder="LVMASS" type="number" />
      <label for="floatingInput">LVMASS</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.REDV" placeholder="REDV" type="number" />
      <label for="floatingInput">REDV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.RESV" placeholder="RESV" type="number" />
      <label for="floatingInput">RESV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.RSV" placeholder="RSV" type="number" />
      <label for="floatingInput">RSV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.RVEF" placeholder="RVEF" type="number" />
      <label for="floatingInput">RVEF</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.AGEATMRI" placeholder="AGEATMRI" type="number" />
      <label for="floatingInput">AGEATMRI</label>
    </div>
    <div class="form-floating">
      <select class="form-control" v-model="data.SCAR">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">SCAR</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.GENDER">
        <option value="false">Male</option>
        <option value="true">Female</option>
      </select>
      <label for="floatingInput">GENDER</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.APICALHCM">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">APICALHCM</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.SUDDENCARDIACDEATH">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">SUDDENCARDIACDEATH</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.DIABETES">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">DIABETES</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.MYECTOMY">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">MYECTOMY</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.hypertension">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">hypertension</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.MYH7">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">MYH7</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.MYBPC3">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">MYBPC3</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.TNNT2">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">TNNT2</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.ACTC">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">ACTC</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.TPM1">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">TPM1</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.TNNCI">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">TNNCI</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.TNNI3">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">TNNI3</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.MYL2">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">MYL2</label>
    </div>

    <div class="form-floating">
      <select class="form-control" v-model="data.TTN">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">TTN</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" style="margin: auto" @click="addPost">
      Add Data
    </button>
  </form>
</template>

<style>
.addData {
  padding: 100px;
  margin-left: 100px;
}
</style>
