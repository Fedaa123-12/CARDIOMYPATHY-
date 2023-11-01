import { ref } from 'vue';

function getGeneMutDataInfoHPO() {
  const HPO_base_url = 'https://hpo.jax.org/api/hpo/gene/';

  let genes_list = ref([]);
  const error = ref(null);

  let genes_list_url = '';

  function createURl(entrezId) {
    genes_list_url = HPO_base_url + entrezId;
  }

  async function populateGeneInfoByID() {
    try {
      let genes_data = await fetch(genes_list_url);
      if (!genes_data.ok) {
        throw Error('Unable to get list of coins from Coin Gecko');
      }

      genes_list.value = await genes_data.json();
    } catch (genes_list_error) {
      error.value = genes_list_error.message;
    }
  }

  // console.log('list.js' + JSON.stringify(genes_list, null, 4));
  // for (let [diseaseAssoc, value] of Object.entries(genes_list)) {
  //   console.log('for loop' + diseaseAssoc, value);
  // }

  return { createURl, genes_list, error, populateGeneInfoByID };
}

export default getGeneMutDataInfoHPO;
