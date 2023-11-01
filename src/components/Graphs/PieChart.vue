<script setup>
import { onMounted, ref } from 'vue';
import { collection, query, orderBy, where, getDocs, limit, and } from 'firebase/firestore';
import { firebaseFireStore } from '@/firebase/database';

let variables = defineProps({
  Xaxis: {
    type: String
  },
  Count: {
    type: String
  }
});

const series = ref([]);
const labels = ref([]);
const range = ref(0);
const increment = ref(0);
const maxValue = ref(0);
const minValue = ref(0);
let loaded = ref(false);

onMounted(async () => {
  const collRef = collection(firebaseFireStore, 'HCM_DATA');
  const maxQuery = query(collRef, orderBy(variables.Xaxis, 'desc'), limit(1));
  const minQuery = query(
    collRef,
    orderBy(variables.Xaxis, 'asc'),
    where(variables.Xaxis, '>', 0),
    limit(1)
  );
  maxValue.value = Math.ceil((await getDocs(maxQuery)).docs[0].data()[variables.Xaxis]);
  minValue.value = Math.floor((await getDocs(minQuery)).docs[0].data()[variables.Xaxis]);
  range.value = maxValue.value - minValue.value;
  increment.value = Math.ceil(range.value / variables.Count);

  let min = minValue.value;
  while (min < maxValue.value) {
    const getQuery = query(
      collRef,
      orderBy(variables.Xaxis),
      and(
        where(variables.Xaxis, '>=', min),
        where(variables.Xaxis, '<=', min + increment.value - 1)
      )
    );
    const countQuery = await getDocs(getQuery);
    const count = countQuery.docs.length;
    series.value.push(count);
    labels.value.push(min + ' < x < ' + (min + increment.value - 1));
    min += increment.value;
    if (min >= maxValue.value) {
      break;
    }
  }
  loaded.value = true;
});

const chartOptions = ref({
  chart: {
    type: 'pie',
    width: 500,
    height: 350
  },
  title: {
    text: 'Distribustions of ' + variables.Xaxis,
    style: {
      fontSize: '12px'
    }
  },
  labels: labels,
  dataLabels: {
    enabled: true
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          type: 'pie',
          width: 500,
          height: 350
        },
        legend: {
          position: 'bottom',
          show: false
        }
      }
    }
  ]
});
</script>

<template>
  <div>
    <div v-if="loaded">
      <apexchart type="pie" height="350" width="500" :options="chartOptions" :series="series">
      </apexchart>
    </div>
    <div v-else>Loading Chart. Please wait.</div>
  </div>
</template>

<style></style>
