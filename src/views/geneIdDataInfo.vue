<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import getGeneMutDataInfoHPO from '../composables/getGeneMutGeneInfoHPO';

const { createURl, genes_list, error, populateGeneInfoByID } = getGeneMutDataInfoHPO();
const route = useRoute();

const id = computed(() => {
  const entrezId = route.params.entrezId;
  return entrezId;
});
createURl(id.value);
populateGeneInfoByID();
</script>

<template>
  <div class="onPage">
    <div v-if="error">{{ error }}</div>

    <div v-if="genes_list.diseaseAssoc">
      <h1>{{ genes_list.gene.geneSymbol }}</h1>
      <h2>({{ genes_list.gene.geneId }})</h2>
      <hr />

      <h3>Diseases Associated with Mutation</h3>
      <table
        class="table table-hover border-danger table-danger table-bordered table-striped table-sm geneTable"
      >
        <thead>
          <tr>
            <th>Diseases Name</th>
            <th>Origin Database</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="diseaseAssoc in genes_list.diseaseAssoc" :key="id">
            <td>{{ diseaseAssoc.diseaseName }}</td>
            <td>{{ diseaseAssoc.db }}</td>
            <td>{{ diseaseAssoc.dbId }} ({{ diseaseAssoc.diseaseId }})</td>
          </tr>
        </tbody>
      </table>

      <h3>Terminology Link to Mutation</h3>
      <table
        class="table table-hover border-danger table-danger table-bordered table-striped table-sm geneTable"
      >
        <thead>
          <tr>
            <th>Ontology ID</th>
            <th>Terminology</th>
            <th>Definition</th>
            <!-- <th>Disease ID</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="termAssoc in genes_list.termAssoc" :key="id">
            <td>{{ termAssoc.ontologyId }}</td>
            <td>{{ termAssoc.name }}</td>
            <td>{{ termAssoc.definition }}</td>
            <!-- <td>{{ diseaseAssoc.diseaseId }}</td> -->
          </tr>
        </tbody>
      </table>

      <!-- <h1>Terms Associated</h1>
		<div style="border:2px solid black" v-for="termAssoc in genes_list.termAssoc" :key="id">
			<span>{{ termAssoc.name }}</span>
		</div> -->
    </div>
  </div>
</template>

<style>
.geneTable {
  width: 90%;
}
</style>
