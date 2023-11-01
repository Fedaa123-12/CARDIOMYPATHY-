<script setup>
const props = defineProps({
  id: {
    type: String
  },
  LEDV: {
    type: String
  },
  LESV: {
    type: String
  },
  LSV: {
    type: String
  },
  LVEF: {
    type: String
  },
  LVMASS: {
    type: String
  },
  REDV: {
    type: String
  },
  RESV: {
    type: String
  },
  RSV: {
    type: String
  },
  RVEF: {
    type: String
  },
  SCAR: {
    type: String
  },
  GENDER: {
    type: String
  },
  AGEATMRI: {
    type: String
  },
  APICALHCM: {
    type: String
  },
  SUDDENCARDIACDEATH: {
    type: String
  },
  DIABETES: {
    type: String
  },
  MYECTOMY: {
    type: String
  },
  hypertension: {
    type: String
  },
  MYH7: {
    type: String
  },
  MYBPC3: {
    type: String
  },
  TNNT2: {
    type: String
  },
  ACTC: {
    type: String
  },
  TPM1: {
    type: String
  },
  TNNCI: {
    type: String
  },
  TNNI3: {
    type: String
  },
  MYL2: {
    type: String
  },
  TTN: {
    type: String
  }
});

let emit = defineEmits(['delete-data']);

function deleteData() {
  emit('delete-data', props.id);
}
</script>

<template>
  <div class="onPage"></div>
  Gender is stored as true for female and false for male.
  <table
    class="table table-hover table-bordered border-danger table-danger table-striped table-sm geneTable"
  >
    <thead>
      <tr>
        <th>Attribute</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>LEDV</td>
        <td>{{ LEDV }}</td>
      </tr>
      <tr>
        <td>LESV</td>
        <td>{{ LESV }}</td>
      </tr>
      <tr>
        <td>LSV</td>
        <td>{{ LSV }}</td>
      </tr>
      <tr>
        <td>LVEF</td>
        <td>{{ LVEF }}</td>
      </tr>
      <tr>
        <td>LVMASS</td>
        <td>{{ LVMASS }}</td>
      </tr>
      <tr>
        <td>REDV</td>
        <td>{{ REDV }}</td>
      </tr>
      <tr>
        <td>RESV</td>
        <td>{{ RESV }}</td>
      </tr>
      <tr>
        <td>RSV</td>
        <td>{{ RSV }}</td>
      </tr>
      <tr>
        <td>RVEF</td>
        <td>{{ RVEF }}</td>
      </tr>
      <tr>
        <td>SCAR</td>
        <td>{{ SCAR }}</td>
      </tr>
      <tr>
        <td>GENDER</td>
        <td>{{ GENDER }}</td>
      </tr>
      <tr>
        <td>AGEATMRI</td>
        <td>{{ AGEATMRI }}</td>
      </tr>
      <tr>
        <td>APICALHCM</td>
        <td>{{ APICALHCM }}</td>
      </tr>
      <tr>
        <td>SUDDENCARDIACDEATH</td>
        <td>{{ SUDDENCARDIACDEATH }}</td>
      </tr>
      <tr>
        <td>DIABETES</td>
        <td>{{ DIABETES }}</td>
      </tr>
      <tr>
        <td>MYECTOMY</td>
        <td>{{ MYECTOMY }}</td>
      </tr>
      <tr>
        <td>HYPERTENSION</td>
        <td>{{ hypertension }}</td>
      </tr>
      <tr>
        <td>MYH7</td>
        <td>{{ MYH7 }}</td>
      </tr>
      <tr>
        <td>MYBPC3</td>
        <td>{{ MYBPC3 }}</td>
      </tr>
      <tr>
        <td>TNNT2</td>
        <td>{{ TNNT2 }}</td>
      </tr>
      <tr>
        <td>ACTC</td>
        <td>{{ ACTC }}</td>
      </tr>
      <tr>
        <td>TPM1</td>
        <td>{{ TPM1 }}</td>
      </tr>
      <tr>
        <td>TNNCI</td>
        <td>{{ TNNCI }}</td>
      </tr>
      <tr>
        <td>TNNI3</td>
        <td>{{ TNNI3 }}</td>
      </tr>
      <tr>
        <td>MYL2</td>
        <td>{{ MYL2 }}</td>
      </tr>
      <tr>
        <td>TTN</td>
        <td>{{ TTN }}</td>
      </tr>
    </tbody>
  </table>

  <template class="d-flex justify-content-center" style="margin-bottom: 20px">
    <router-link :to="{ name: 'UpdateData', params: { postID: id } }">
      <button class="btn btn-danger">Update</button>
    </router-link>
    <button class="btn btn-danger" style="margin-left: 10px" @click="deleteData">Delete</button>
  </template>
</template>
