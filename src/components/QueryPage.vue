<script setup>
import { ref, reactive } from 'vue';
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  limit,
  getFirestore
} from 'firebase/firestore';
import { firebaseFireStore } from '@/firebase/database';

import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net-bs5';
import 'datatables.net-select-bs5';

DataTable.use(DataTablesLib);

const numberOptions = [
  'LEDV',
  'LESV',
  'LSV',
  'LVEF',
  'LVMASS',
  'REDV',
  'RESV',
  'RSV',
  'RVEF',
  'AGEATMRI'
];
const booleanOptions = [
  'SCAR',
  'GENDER',
  'APICALHCM',
  'SUDDENCARDIACDEATH',
  'DIABETES',
  'MYECTOMY',
  'hypertension',
  'MYH7',
  'MYBPC3',
  'TNNT2',
  'ACTC',
  'TPM1',
  'TNNCI',
  'TNNI3',
  'MYL2',
  'TTN'
];

let limitCount = ref(0);

function limitOrCountChange(e) {
  var limitOrCount = document.getElementsByClassName('limitOrCount');
  for (var i = 0; i < limitOrCount.length; i++) {
    limitOrCount[i].checked = false;
  }
  e.checked = true;
}

let orderClimb = ref('asc');

const whereCompare = ['==', '!=', '<=', '>=', '<', '>'];
const whereValue = ref('LEDV');
const whereNumber = ref(null);

const whereChecked = ref(false);
const orderByChecked = ref(false);
const limitChecked = ref(false);

const results = ref([]);

async function setUpQuery() {
  results.value = [];
  let finalQuery = query(collection(firebaseFireStore, 'HCM_DATA'));
  //WHERE checks
  if (whereChecked.value) {
    if (whereNumber.value === 'true' || whereNumber.value === true) {
      whereNumber.value = Boolean(true);
    } else if (whereNumber.value == 'false' || whereNumber.value === false) {
      whereNumber.value = Boolean(false);
    }

    finalQuery = query(
      collection(firebaseFireStore, 'HCM_DATA'),
      where(
        `${whereValue.value}`,
        `${document.getElementById('whereCompare').value}`,
        whereNumber.value
      )
    );
  } else if (limitChecked.value) {
    finalQuery = query(collection(firebaseFireStore, 'HCM_DATA'), limit(limitCount.value));
  } else if (orderByChecked.value) {
    finalQuery = query(
      collection(firebaseFireStore, 'HCM_DATA'),
      orderBy(whereValue.value, orderClimb.value)
    );
  }

  let queryResults = await getDocs(finalQuery);
  queryResults.forEach((doc) => results.value.push(doc.data()));
  if (orderByChecked.value) {
    results.value.sort((a, b) => {
      if (a[whereValue.value] < b[whereValue.value]) {
        return orderClimb.value === 'asc' ? -1 : 1;
      }
      if (a[whereValue.value] > b[whereValue.value]) {
        return orderClimb.value === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  if (limitChecked.value) {
    results.value.splice(limitCount.value, results.value.length - limitCount.value);
  } else if (document.getElementById('countCheck').checked) {
  }
}

let data = results;

const columns = [
  { data: 'LEDV' },
  { data: 'LESV' },
  { data: 'LSV' },
  { data: 'LVEF' },
  { data: 'LVMASS' },
  { data: 'REDV' },
  { data: 'RESV' },
  { data: 'RSV' },
  { data: 'RVEF' },
  { data: 'AGEATMRI' },
  { data: 'SCAR' },
  { data: 'GENDER' },
  { data: 'APICALHCM' },
  { data: 'SUDDENCARDIACDEATH' },
  { data: 'DIABETES' },
  { data: 'MYECTOMY' },
  { data: 'hypertension' },
  { data: 'MYH7' },
  { data: 'MYBPC3' },
  { data: 'TNNT2' },
  { data: 'ACTC' },
  { data: 'TPM1' },
  { data: 'TNNCI' },
  { data: 'TNNI3' },
  { data: 'MYL2' },
  { data: 'TTN' }
];
</script>

<template>
  <div class="onPage">
    <span>
      <button class="btn btn-primary" style="margin-right: 10px" @click="setUpQuery()">
        Execute Query
      </button>
    </span>

    <div class="input-group" style="padding-top: 15px">
      <span class="input-group-text">Don't Count or Limit Records</span>
      <span class="input-group-text">
        <input
          class="form-check-input mt-0 limitOrCount"
          id="CoLCheck"
          type="checkbox"
          @change="limitOrCountChange($event.target)"
          checked
      /></span>
    </div>

    <div class="input-group" style="padding-top: 15px">
      <span class="input-group-text">Count Records </span>
      <span class="input-group-text">
        <input
          class="form-check-input mt-0 limitOrCount"
          id="countCheck"
          type="checkbox"
          @change="limitOrCountChange($event.target)"
      /></span>
    </div>
    <br />
    <div class="input-group" style="width: 30%">
      <span class="input-group-text">Limit to</span>
      <input type="number" class="form-control" v-model="limitCount" />
      <span class="input-group-text">Record(s)</span>
      <span class="input-group-text">
        <input
          class="form-check-input mt-0 limitOrCount"
          id="limitCheck"
          type="checkbox"
          @change="limitOrCountChange($event.target)"
          v-model="limitChecked"
      /></span>
    </div>
    <br />
    <div class="input-group" style="width: 40%">
      <span class="input-group-text">Order By</span>
      <select class="form-select" v-model="whereValue">
        <option v-for="option in numberOptions" :value="option">{{ option }}</option>
        <option v-for="option in booleanOptions" :value="option">{{ option }}</option>
      </select>
      <select class="form-select" v-model="orderClimb">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <span class="input-group-text"
        ><input
          class="form-check-input mt-0"
          type="checkbox"
          id="orderByCheck"
          v-model="orderByChecked"
      /></span>
    </div>
    <br />
    <div class="input-group" style="width: 70%">
      <span class="input-group-text">Where</span>

      <select class="form-select" v-model="whereValue" style="width: 10%">
        <option v-for="option in numberOptions" :value="option">{{ option }}</option>
        <option v-for="option in booleanOptions" :value="option">{{ option }}</option>
      </select>

      <select class="form-select" id="whereCompare" style="width: 10%">
        <option
          v-if="numberOptions.includes(whereValue)"
          v-for="option in whereCompare"
          :value="option"
        >
          {{ option }}
        </option>
        <option v-if="booleanOptions.includes(whereValue)" value="==">
          {{ whereCompare[0] }}
        </option>
      </select>

      <input
        v-if="!booleanOptions.includes(whereValue)"
        type="number"
        class="form-control"
        v-model="whereNumber"
      />
      <select
        v-else-if="booleanOptions.includes(whereValue) && whereValue != 'GENDER'"
        class="form-select"
        id="whereValue"
        v-model="whereNumber"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <select
        v-else-if="whereValue == 'GENDER'"
        class="form-select"
        id="whereValue"
        v-model="whereNumber"
      >
        <option value="true">Female</option>
        <option value="false">Male</option>
      </select>
      <span class="input-group-text"
        ><input
          class="form-check-input mt-0"
          type="checkbox"
          id="whereCheck"
          v-model="whereChecked"
      /></span>
    </div>
    (Field context is shared between order and where queries, as per firestore contraints)
    <br />Gender is stored as true for female and false for male.

    <div v-if="results.length">
      <DataTable class="display" style="background-color: #f8d7da" :data="data" :columns="columns">
        <thead>
          <tr>
            <th v-for="header in numberOptions">
              {{ header }}
            </th>
            <th v-for="header in booleanOptions">
              {{ header }}
            </th>
          </tr>
        </thead>
      </DataTable>
    </div>
  </div>
</template>

<style>
@import 'datatables.net-dt';
</style>
