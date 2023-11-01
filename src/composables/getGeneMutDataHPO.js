import { ref } from 'vue';

function getGeneMutDataHPO() {
  const HPO_base_url = 'https://hpo.jax.org/api/hpo/search?';

  let genes_list = ref([]);
  const error = ref(null);

  let genes_list_url = '';

  function createURl(q_param) {
    genes_list_url = HPO_base_url + 'q=' + q_param + '&category=genes';
  }

  async function populateCoinsList() {
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

  return { createURl, genes_list, error, populateCoinsList };
}

export default getGeneMutDataHPO;
