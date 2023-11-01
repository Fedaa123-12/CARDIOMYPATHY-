<script setup>
import { ref, onMounted } from 'vue';
import BarChart from './BarChart.vue';
import PieChart from './PieChart.vue';

const chartOptions = ['bar', 'pie'];
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

// LEFT CHART FUNCTIONS AND VAIRABLES
let LType = ref('bar-default');
let LXaxis = ref('LEDV');
let LXaxis1 = ref('No Selection');
let LCount = ref('5');

function updateLChart(e) {
  let temp = '';
  if (e.target.id === 'chartsL') {
    temp = e.target.value;
  } else {
    temp = LType.value;
  }
  LType.value = '';
  setTimeout(
    function (temp) {
      LType.value = temp;
    },
    0,
    temp
  );
}

// RIGHT CHART FUNCTIONS AND VARIABLES
let RType = ref('bar-default');
let RXaxis = ref('LVEF');
let RXaxis1 = ref('SCAR');
let RCount = ref('7');

function updateRChart(e) {
  let temp = '';
  if (e.target.id === 'chartsR') {
    temp = e.target.value;
  } else {
    temp = RType.value;
  }
  RType.value = '';
  setTimeout(
    function (temp) {
      RType.value = temp;
    },
    0,
    temp
  );
}
</script>

<template>
  <div class="container">
    <!-- Left Graph and Options -->
    <div class="row">
      <div class="col left">
        <div v-if="LType === 'bar' || LType == 'bar-default'">
          <BarChart :Xaxis="LXaxis" :Xaxis1="LXaxis1" :Count="LCount" />
        </div>
        <div v-else-if="LType === 'pie'">
          <PieChart :Xaxis="LXaxis" :Count="RCount" />
        </div>
      </div>

      <div class="row">
        <div class="col left-options">
          <label for="Charts">Chart Type:</label>
          <select
            id="chartsL"
            name="chartsL"
            size="2"
            class="form-select mb-3"
            @change="updateLChart($event)"
          >
            <option v-for="option in chartOptions" :value="option">
              {{ option.charAt(0).toUpperCase() + option.slice(1) }}
            </option>
          </select>

          <label>Primary X-axis Data <span style="color: darkgrey">(Numeric Values)</span>:</label>
          <select
            class="form-select mb-3"
            size="2"
            id="LXaxis"
            v-model="LXaxis"
            @change="updateLChart($event)"
          >
            <option v-for="option in numberOptions" :value="option">
              {{ option.charAt(0).toUpperCase() + option.slice(1) }}
            </option>
          </select>
        </div>

        <div class="col right-options">
          <label>Category Count:</label>
          <select
            class="form-select mb-3"
            size="2"
            id="LCount"
            v-model="LCount"
            @change="updateLChart($event)"
          >
            <option v-for="index in 6" :value="index + 4">{{ index + 4 }}</option>
          </select>

          <div v-if="LType != 'pie'">
            <label
              >Secondary X-axis Data <span style="color: darkgrey">(Boolean Values)</span>:</label
            >
            <select
              class="form-select mb-3"
              size="2"
              id="LXaxis1"
              v-model="LXaxis1"
              @change="updateLChart($event)"
            >
              <option value="No Selection">No Selection</option>
              <option v-for="option in booleanOptions" :value="option">
                {{ option.charAt(0).toUpperCase() + option.slice(1) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col right">
        <div v-if="RType === 'bar' || RType == 'bar-default'">
          <BarChart :Xaxis="RXaxis" :Xaxis1="RXaxis1" :Count="RCount" />
        </div>
        <div v-else-if="RType === 'pie'">
          <PieChart :Xaxis="RXaxis" :Count="RCount" />
        </div>
      </div>

      <div class="row">
        <div class="col left-options">
          <label for="Charts">Chart Type:</label>
          <select
            id="chartsR"
            name="chartsR"
            size="2"
            class="form-select mb-3"
            @change="updateRChart($event)"
          >
            <option v-for="option in chartOptions" :value="option">
              {{ option.charAt(0).toUpperCase() + option.slice(1) }}
            </option>
          </select>

          <label>Primary X-axis Data <span style="color: darkgrey">(Numeric Values)</span>:</label>
          <select
            class="form-select mb-3"
            size="2"
            id="RXaxis"
            v-model="RXaxis"
            @change="updateRChart($event)"
          >
            <option v-for="option in numberOptions" :value="option">
              {{ option.charAt(0).toUpperCase() + option.slice(1) }}
            </option>
          </select>
        </div>

        <div class="col right-options">
          <label>Category Count:</label>
          <select
            class="form-select mb-3"
            size="2"
            id="RCount"
            v-model="RCount"
            @change="updateRChart($event)"
          >
            <option v-for="index in 6" :value="index + 4">{{ index + 4 }}</option>
          </select>

          <div v-if="RType != 'pie'">
            <label
              >Secondary X-axis Data <span style="color: darkgrey">(Boolean Values)</span>:</label
            >
            <select
              class="form-select mb-3"
              size="2"
              id="RXaxis1"
              v-model="RXaxis1"
              @change="updateRChart($event)"
            >
              <option value="No Selection">No Selection</option>
              <option v-for="option in booleanOptions" :value="option">
                {{ option.charAt(0).toUpperCase() + option.slice(1) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  padding-top: 60px;
  padding-left: 180px;
}

/* Chart layout */
.left {
  padding-right: 50px;
}

/* Chart options */
.form-select {
  width: 180px;
}

.left-options {
  margin-left: 40px;
}
</style>
