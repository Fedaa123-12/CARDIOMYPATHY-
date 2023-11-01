<script setup>
import getGeneMutDataHPO from '../composables/getGeneMutDataHPO';
import { ref } from 'vue';

const { createURl, genes_list, error, populateCoinsList } = getGeneMutDataHPO();

let emit = defineEmits(['search-extra-data']);
const searchData = ref('');

function search() {
  createURl(searchData.value);
  populateCoinsList();
}
</script>

<template>
  <!-- <div style="padding-left: 300px; padding-top: 100px;"> -->
  <div class="onPage">
    <div v-if="error">{{ error }}</div>
    <div v-if="!genes_list.genes">
      <h1>Search for a Gene:</h1>
      <span style="color: darkgrey"
        >(Search HPO (Human Phenotype Ontology) database of all genes)</span
      >
      <div class="input-group" style="width: 60%">
        <input
          type="text"
          class="form-control"
          placeholder="Try 'myh7' or 'actc'"
          v-model="searchData"
          id="apiSearchBar"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="search">Search</button>
        </div>
      </div>
    </div>
    <div v-else-if="genes_list.genes && genes_list.genes.length > 0">
      <h1>Gene Results</h1>
      <table
        class="table table-hover table-bordered border-danger table-danger table-striped table-sm"
        style="width: 50%"
      >
        <thead>
          <tr>
            <th>Gene ID</th>
            <th>Gene Symbol</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="geneMut in genes_list.genes" :key="geneMut.geneId">
            <td>
              <router-link :to="{ name: 'geneIdDataInfo', params: { entrezId: geneMut.geneId } }">{{
                geneMut.geneId
              }}</router-link>
            </td>
            <td>
              <router-link :to="{ name: 'geneIdDataInfo', params: { entrezId: geneMut.geneId } }">{{
                geneMut.geneSymbol
              }}</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <h1>No Results</h1>
      <p>Your search for gene: {{ searchData }}, yeilded no result.</p>
      <p>
        Prehaps check the spelling of the gene. It is possible this gene is not contained within
        HPO's gene database.
      </p>
    </div>

    <!-- <div v-if="genes_list.genes">
			<div v-for="geneMut in genes_list.genes" :key="geneMut.geneId">
				<router-link :to="{ name: 'geneIdDataInfo', params: { entrezId: geneMut.geneId } }">
					<div class="geneCard">
						<div class="header">
							<span>{{ geneMut.geneId }}</span>
						</div>
						<div>
							<span>{{ geneMut.geneSymbol }}</span>
						</div>
					</div>
				</router-link>
			</div>
		</div> -->
  </div>
</template>

<style>
.geneCard {
  border: 2px solid blACK;
  margin: 10px;
  text-align: center;
}
</style>
