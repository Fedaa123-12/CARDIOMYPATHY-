<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { serverTimestamp } from '@/firebase/database';
const props = defineProps({
  allData: {
    type: Array,
    default: () => []
  }
});

const route = useRoute();

let emit = defineEmits(['update-data']);

const id = computed(() => {
  const postID = route.params.postID;
  return props.allData.find((p) => p.id === postID);
});

const postID = computed(() => {
  return id.value && id.value.id;
});
const data = ref({
  LEDV: id.value.LEDV,
  LESV: id.value.LESV,
  LSV: id.value.LSV,
  LVEF: id.value.LVEF,
  LVMASS: id.value.LVMASS,
  REDV: id.value.REDV,
  RESV: id.value.RESV,
  RSV: id.value.RSV,
  RVEF: id.value.RVEF,
  SCAR: id.value.SCAR,
  GENDER: id.value.GENDER,
  AGEATMRI: id.value.AGEATMRI,
  APICALHCM: id.value.APICALHCM,
  SUDDENCARDIACDEATH: id.value.SUDDENCARDIACDEATH,
  DIABETES: id.value.DIABETES,
  MYECTOMY: id.value.MYECTOMY,
  hypertension: id.value.hypertension,
  MYH7: id.value.MYH7,
  MYBPC3: id.value.MYBPC3,
  TNNT2: id.value.TNNT2,
  ACTC: id.value.ACTC,
  TPM1: id.value.TPM1,
  TNNCI: id.value.TNNCI,
  TNNI3: id.value.TNNI3,
  MYL2: id.value.MYL2,
  TTN: id.value.TTN,
  updatedAt: serverTimestamp()
});

const router = useRouter();
const notNullObj = {};

function UpdatePost() {
  for (const [key, value] of Object.entries(data.value)) {
    if (value === '' || value === null || value === undefined) {
      notNullObj[key] = String('');
    } else if (value === 'true' || value === true) {
      notNullObj[key] = Boolean(value);
    } else if (value === 'false' || value === false) {
      notNullObj[key] = Boolean(false);
    } else if (key === 'updatedAt') {
      notNullObj[key] = Date(value);
    } else {
      notNullObj[key] = Number(value);
    }
  }
  emit('update-data', postID.value, notNullObj);
  router.push('/userpage');
}
</script>

<template>
  <div class="updateData">
    <div class="form-floating">
      <input class="form-control" v-model="data.LEDV" placeholder="LEDV" required />
      <label for="floatingInput">LEDV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LESV" placeholder="LESV" required />
      <label for="floatingInput">LESV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LSV" placeholder="LSV" />
      <label for="floatingInput">LSV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LVEF" placeholder="LVEF" />
      <label for="floatingInput">LVEF</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.LVMASS" placeholder="LVMASS" />
      <label for="floatingInput">LVMASS</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.REDV" placeholder="REDV" />
      <label for="floatingInput">REDV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.RESV" placeholder="RESV" />
      <label for="floatingInput">RESV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.RSV" placeholder="RSV" />
      <label for="floatingInput">RSV</label>
    </div>
    <div class="form-floating">
      <input class="form-control" v-model="data.RVEF" placeholder="RVEF" />
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
      <select class="form-control" v-model="data.hypertension">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <label for="floatingInput">hypertension</label>
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
    <button class="w-100 btn btn-lg btn-primary" style="margin: auto" @click="UpdatePost">
      Update Data
    </button>
  </div>
</template>

<style>
.updateData {
  padding: 100px;
  margin-left: 100px;
}
</style>
