<script setup>
import { reactive, ref } from 'vue';
import getGeneMutDataInfoHPO from '../composables/getGeneMutGeneInfoHPO';
import { computed, onMounted } from 'vue';

const { createURl, genes_list, error, populateGeneInfoByID } = getGeneMutDataInfoHPO();

const geneName = ref('Gene Options');
const allDefinitions = [
  {
    id: 4625,
    geneName: 'MYH7',
    geneDefinition: `Muscle myosin is a hexameric protein containing 2 heavy chain subunits, 2 alkali light chain subunits, 
    and 2 regulatory light chain subunits. This gene encodes the beta (or slow) heavy chain subunit of cardiac myosin. It is 
    expressed predominantly in normal human ventricle. It is also expressed in skeletal muscle tissues rich in slow-twitch type
     I muscle fibers. Changes in the relative abundance of this protein and the alpha (or fast) heavy subunit of cardiac myosin
      correlate with the contractile velocity of cardiac muscle. Its expression is also altered during thyroid hormone depletion 
      and hemodynamic overloading. Mutations in this gene are associated with familial hypertrophic cardiomyopathy, myosin storage 
      myopathy, dilated cardiomyopathy, and Laing distal myopathy.`
  },
  {
    id: 4607,
    geneName: 'MYBPC3',
    geneDefinition: `MYBPC3 encodes the cardiac isoform of myosin-binding protein C. Myosin-binding protein C is a myosin-associated 
    protein found in the cross-bridge-bearing zone (C region) of A bands in striated muscle. MYBPC3 is expressed exclusively in heart 
    muscle and is a key regulator of cardiac contraction. Mutations in this gene are a frequent cause of familial hypertrophic cardiomyopathy. `
  },
  {
    id: 7139,
    geneName: 'TNNT2',
    geneDefinition: `This gene encodes the cardiac isoform of troponin T. The encoded protein is the tropomyosin-binding subunit of the 
    troponin complex, which is located on the thin filament of striated muscles and regulates muscle contraction in response to alterations 
    in intracellular calcium ion concentration. Mutations in this gene have been associated with familial hypertrophic cardiomyopathy as well 
    as with dilated cardiomyopathy.`
  },
  {
    id: 70,
    geneName: 'ACTC',
    geneDefinition: `Actins are highly conserved proteins that are involved in various types of cell motility. Polymerization of globular 
    actin (G-actin) leads to a structural filament (F-actin) in the form of a two-stranded helix. Each actin can bind to four others. 
    The protein encoded by this gene belongs to the actin family which is comprised of three main groups of actin isoforms, alpha, beta, and gamma. 
    The alpha actins are found in muscle tissues and are a major constituent of the contractile apparatus. Defects in this gene have been associated with
     idiopathic dilated cardiomyopathy (IDC) and familial hypertrophic cardiomyopathy (FHC). `
  },
  {
    id: 7168,
    geneName: 'TPM1',
    geneDefinition: `This gene is a member of the tropomyosin family of highly conserved, widely distributed actin-binding proteins involved in the 
    contractile system of striated and smooth muscles and the cytoskeleton of non-muscle cells. Tropomyosin is composed of two alpha-helical chains 
    arranged as a coiled-coil. It is polymerized end to end along the two grooves of actin filaments and provides stability to the filaments. 
    The encoded protein is one type of alpha helical chain that forms the predominant tropomyosin of striated muscle,
     where it also functions in association with the troponin complex to regulate the calcium-dependent interaction of actin and myosin during muscle contraction. 
     In smooth muscle and non-muscle cells, alternatively spliced transcript variants encoding a range of isoforms have been described. 
     Mutations in this gene are associated with type 3 familial hypertrophic cardiomyopathy and dilated cardiomyopathy 1Y.`
  },
  {
    id: 7134,
    geneName: 'TNNC1',
    geneDefinition: `Troponin is a central regulatory protein of striated muscle contraction, and together with tropomyosin, 
    is located on the actin filament. Troponin consists of 3 subunits: TnI, which is the inhibitor of actomyosin ATPase; TnT, 
    which contains the binding site for tropomyosin; and TnC, the protein encoded by this gene. The binding of calcium to TnC abolishes the inhibitory action of TnI,
     thus allowing the interaction of actin with myosin, the hydrolysis of ATP, and the generation of tension. Mutations in this gene are associated 
     with cardiomyopathy dilated type 1Z.`
  },
  {
    id: 7137,
    geneName: 'TNNI3',
    geneDefinition: `Troponin I (TnI), along with troponin T (TnT) and troponin C (TnC), is one of 3 subunits that form the troponin complex of the thin filaments of striated muscle. 
    TnI is the inhibitory subunit; blocking actin-myosin interactions and thereby mediating striated muscle relaxation. 
    The TnI subfamily contains three genes: TnI-skeletal-fast-twitch, TnI-skeletal-slow-twitch, and TnI-cardiac. 
    This gene encodes the TnI-cardiac protein and is exclusively expressed in cardiac muscle tissues. 
    Mutations in this gene cause familial hypertrophic cardiomyopathy type 7 (CMH7) and familial restrictive cardiomyopathy (RCM). 
    Troponin I is useful in making a diagnosis of heart failure, and of ischemic heart disease. An elevated level of troponin is also now used as indicator of acute 
    myocardial injury in patients hospitalized with moderate/severe Coronavirus Disease 2019 (COVID-19). Such elevation has also been associated with higher risk of 
    mortality in cardiovascular disease patients hospitalized due to COVID-19.`
  },
  {
    id: 4633,
    geneName: 'MYL2',
    geneDefinition: `This gene encodes a major sarcomeric protein in mammalian striated muscle. 
    The encoded protein plays a role in embryonic heart muscle structure and function, while phosphorylation of the encoded protein is involved in cardiac
     myosin cycling kinetics, torsion and function in adults. Mutations in this gene are associated with hypertrophic cardiomyopathy 10 and infant-onset myopathy.`
  },
  {
    id: 7273,
    geneName: 'TTN',
    geneDefinition: `This gene encodes a large abundant protein of striated muscle. The product of this gene is divided into two regions, a
    N-terminal I-band and a C-terminal A-band. The I-band, which is the elastic part of the molecule, contains two regions of tandem immunoglobulin 
    domains on either side of a PEVK region that is rich in proline, glutamate, valine and lysine. The A-band, which is thought to act as a protein-ruler,
    contains a mixture of immunoglobulin and fibronectin repeats, and possesses kinase activity. An N-terminal Z-disc region and a C-terminal M-line region 
    bind to the Z-line and M-line of the sarcomere, respectively, so that a single titin molecule spans half the length of a sarcomere. Titin also contains 
    binding sites for muscle associated proteins so it serves as an adhesion template for the assembly of contractile machinery in muscle cells. It has also 
    been identified as a structural protein for chromosomes. Alternative splicing of this gene results in multiple transcript variants. Considerable variability
    exists in the I-band, the M-line and the Z-disc regions of titin. Variability in the I-band region contributes to the differences in elasticity of 
    different titin isoforms and, therefore, to the differences in elasticity of different muscle types. Mutations in this gene are associated with familial 
    hypertrophic cardiomyopathy 9, and autoantibodies to titin are produced in patients with the autoimmune disease scleroderma.`
  }
];
const geneDef = computed(() => {
  const gene = geneName.value;
  return allDefinitions.find((p) => p.geneName === gene);
});

function createAPIRequest() {
  const geneID = computed(() => {
    const gene = geneName.value;
    return allDefinitions.find((p) => p.geneName === gene);
  });

  createURl(geneID.value.id);
  populateGeneInfoByID();
}
</script>
<template>
  <div class="onPage">
    <h1>Select a Gene</h1>
    <span style="color: darkgrey">(Search local database of HCM associated genes)</span>
    <select class="form-select" @change="createAPIRequest()" v-model="geneName">
      <option>Gene Options</option>
      <option v-for="geneDef in allDefinitions">{{ geneDef.geneName }}</option>
    </select>

    <b-table striped hover :items="allDefinitions"></b-table>

    <div v-if="error">{{ error }}</div>
    <div v-if="genes_list.gene">
      <!-- <h1>{{geneName}}</h1> -->
      <h2>Definition:</h2>
      <div>{{ geneDef.geneDefinition }}</div>
      <!-- <h2>Diseases Associated</h2>
    <div style="border:2px solid black" v-for="diseaseAssoc in genes_list.diseaseAssoc" :key="id">
        <span>{{ diseaseAssoc.diseaseName }}</span>
    </div>
    <h2>Terms Associated</h2>
    <div  style="border:2px solid black" v-for="termAssoc in genes_list.termAssoc" :key="id">
        <span>{{ termAssoc.name }}</span>
    </div> -->
      <h3>Diseases Associated with Mutation</h3>
      <table
        class="table table-hover border-danger table-danger table-bordered table-danger table-striped table-sm geneTable"
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
        class="table table-hover table-bordered border-danger table-danger table-striped table-sm geneTable"
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
    </div>
  </div>
</template>

<style>
.geneInfo {
  padding: 100px;
  margin-left: 100px;
}
</style>
