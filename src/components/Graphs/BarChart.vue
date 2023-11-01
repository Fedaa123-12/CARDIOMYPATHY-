<script setup>
import { onMounted, ref } from 'vue';
import { collection, query, orderBy, where, getDocs, limit, and } from 'firebase/firestore';
import { firebaseFireStore } from '@/firebase/database';

let variables = defineProps({
  Xaxis: {
    type: String
  },
  Xaxis1: {
    type: String
  },
  Count: {
    type: String
  }
});

let trueCount = 0;
let falseCount = 0;
const trueData = ref([]);
const falseData = ref([]);

const title = ref('');

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
  increment.value = Math.ceil(range.value / Number(variables.Count));

  if (!isNaN(increment.value)) {
    let min = minValue.value;
    if (variables.Xaxis1 != 'No Selection') {
      while (min < maxValue.value) {
        const preQuery = await getDocs(
          query(
            collRef,
            and(
              where(variables.Xaxis, '>=', min),
              where(variables.Xaxis, '<', min + increment.value - 1)
            )
          )
        );

        preQuery.forEach((doc) => {
          if (doc.data()[variables.Xaxis1] == 'true' || doc.data()[variables.Xaxis1] === true) {
            trueCount += 1;
          } else if (
            doc.data()[variables.Xaxis1] == 'false' ||
            doc.data()[variables.Xaxis1] === false
          ) {
            falseCount += 1;
          }
        });
        labels.value.push(min + ' < x < ' + (min + increment.value - 1));
        min += increment.value;
        trueData.value.push(trueCount);
        falseData.value.push(falseCount);
        if (min >= maxValue.value) {
          break;
        }
      }
      if (variables.Xaxis1 == 'GENDER') {
        title.value = variables.Xaxis + ' Variation between Gender';
        series.value = [
          {
            name: 'Female',
            data: trueData
          },
          {
            name: 'Male',
            data: falseData
          }
        ];
      } else {
        title.value =
          variables.Xaxis + ' Variation between those with and without ' + variables.Xaxis1;
        series.value = [
          {
            name: 'With ' + variables.Xaxis1,
            data: trueData
          },
          {
            name: 'without ' + variables.Xaxis1,
            data: falseData
          }
        ];
      }
    } else {
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
        labels.value.push(min + ' < x < ' + (min + increment.value - 1));
        min += increment.value;
        trueData.value.push(count);
        if (min >= maxValue.value) {
          break;
        }
      }
      series.value = [
        {
          name: variables.Xaxis,
          data: trueData
        }
      ];
    }
  }

  loaded.value = true;
});

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    width: 500
  },
  plotOptions: {
    bar: {
      borderRadius: 4
    }
  },
  title: {
    text: title,
    align: 'left'
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: labels,
    title: {
      text: variables.Xaxis
    }
  },
  yaxis: {
    title: {
      text: 'Quantity'
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
});
</script>

<template>
  <div>
    <div v-if="loaded">
      <apexchart type="bar" height="350" width="500" :options="chartOptions" :series="series">
      </apexchart>
    </div>
    <div v-else>Loading Chart. Please wait.</div>
  </div>
</template>
