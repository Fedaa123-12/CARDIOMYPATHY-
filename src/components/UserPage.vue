<script setup>
import showUserData from './showUserData.vue';

defineProps({
  allData: {
    type: Array,
    default: () => []
  },
  user: {
    type: Object,
    default: () => {}
  }
});

let emit = defineEmits(['delete-data']);

function deleteData(id) {
  emit('delete-data', id);
}
</script>

<template>
  <div v-if="user" class="userPageClass">
    <h1>User Data:</h1>
    <showUserData
      v-for="Data in allData"
      :id="Data.id"
      :LEDV="Data.LEDV"
      :LESV="Data.LESV"
      :LSV="Data.LSV"
      :LVEF="Data.LVEF"
      :LVMASS="Data.LVMASS"
      :REDV="Data.REDV"
      :RESV="Data.RESV"
      :RSV="Data.RSV"
      :RVEF="Data.RVEF"
      :SCAR="Data.SCAR"
      :GENDER="Data.GENDER"
      :AGEATMRI="Data.AGEATMRI"
      :APICALHCM="Data.APICALHCM"
      :SUDDENCARDIACDEATH="Data.SUDDENCARDIACDEATH"
      :DIABETES="Data.DIABETES"
      :MYECTOMY="Data.MYECTOMY"
      :hypertension="Data.hypertension"
      :MYH7="Data.MYH7"
      :MYBPC3="Data.MYBPC3"
      :TNNT2="Data.TNNT2"
      :ACTC="Data.ACTC"
      :TPM1="Data.TPM1"
      :TNNCI="Data.TNNCI"
      :TNNI3="Data.TNNI3"
      :MYL2="Data.MYL2"
      :TTN="Data.TTN"
      @delete-data="deleteData"
    />
  </div>
</template>

<style>
.userPageClass {
  padding-left: 200px;
  padding-top: 100px;
}
</style>
