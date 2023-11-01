<script setup>
import { ref, onMounted } from 'vue';
import {
  firebaseAuthentication,
  onAuthStateChanged,
  signOut,
  firebaseFireStore,
  collection,
  onSnapshot,
  deleteDoc
} from '@/firebase/database';
import { useRouter } from 'vue-router';
import { doc, setDoc, updateDoc, getDocs } from '@firebase/firestore';
import Navigation from '@/components/Navigation.vue';

/*
  The funciton below should, in theory, only need to be executed once. 
  It changes all the relevant fields in the database to the correct types
  (Number/Boolean)
*/
/* ---------------------Currently commented because it has already been completed.
  ---------------------If you need to run it again, uncomment it and run it once.
  ---------------------Then comment it again.---------------------
onMounted(async () => {
  const typeNum = ["LEDV", "LESV", "LSV", "LVEF", "LVMASS", "REDV", "RESV", "RSV", "RVEF", "AGEATMRI"]
  const typeBool = ["SCAR", "GENDER", "APICALHCM", "SUDDENCARDIACDEATH", "DIABETES", "MYECTOMY",
  "hypertension", "MYH7", "MYBPC3", "TNNT2", "ACTC", "TPM1", "TNNCI", "TNNI3", "MYL2", "TTN"]
  const changeTypeRef = collection(firebaseFireStore, 'HCM_DATA')
  getDocs(changeTypeRef).then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const data = doc.data()
      Object.entries(data).forEach(([key, value]) => {
        if (value == "" || !value) {
          data[key] = String(value)
        }
        else if (typeNum.includes(key)) {
          data[key] = Number(value) // convert string to number
        }
        else if (typeBool.includes(key)) {
          // console.log("checking key and value")
          // console.log(key)
          console.log(value)
          if (value != "false" && (value.toUpperCase() == "YES" || value.toUpperCase() == "TRUE" || value == '1')) {
            data[key] = Boolean(true)
          }
          else if (!value || value.toUpperCase() == "NO" || value.toUpperCase() == "FALSE" || value == '0' ) {
            data[key] = Boolean(false)
          }
        }
      })
      setDoc(doc.ref, data)
    })
  })
  console.log("Function run")
})
*/
/*
  The funciton above should, in theory, only need to be executed once. 
  It changes all the relevant fields in the database to the correct types
  (Number/Boolean)
*/

const allData = ref([]);

const user = ref(null);
const errorLogout = ref(null);

onAuthStateChanged(firebaseAuthentication, (currentUser) => {
  if (currentUser) {
    user.value = currentUser;
    let sub_collection_reference = null;

    sub_collection_reference = collection(firebaseFireStore, 'users', user.value.uid, 'posts');
    onSnapshot(sub_collection_reference, (snapShot) => {
      const snapData = [];
      snapShot.forEach((doc) => {
        snapData.push({
          id: doc.id,
          LEDV: doc.data().LEDV,
          LESV: doc.data().LESV,
          LSV: doc.data().LSV,
          LVEF: doc.data().LVEF,
          LVMASS: doc.data().LVMASS,
          RVMASS: doc.data().RVMASS,
          REDV: doc.data().REDV,
          RESV: doc.data().RESV,
          RSV: doc.data().RSV,
          RVEF: doc.data().RVEF,
          SCAR: doc.data().SCAR,
          GENDER: doc.data().GENDER,
          AGEATMRI: doc.data().AGEATMRI,
          APICALHCM: doc.data().APICALHCM,
          SUDDENCARDIACDEATH: doc.data().SUDDENCARDIACDEATH,
          DIABETES: doc.data().DIABETES,
          MYECTOMY: doc.data().MYECTOMY,
          hypertension: doc.data().hypertension,
          MYH7: doc.data().MYH7,
          MYBPC3: doc.data().MYBPC3,
          TNNT2: doc.data().TNNT2,
          ACTC: doc.data().ACTC,
          TPM1: doc.data().TPM1,
          TNNCI: doc.data().TNNCI,
          TNNI3: doc.data().TNNI3,
          MYL2: doc.data().MYL2,
          TTN: doc.data().TTN
        });
      });

      allData.value = snapData;
    });
  } else {
    user.value == null;
  }
});

const router = useRouter();
function logout() {
  signOut(firebaseAuthentication).then(
    () => {
      user.value = null;
      router.push({
        name: 'GeneralMessage',
        params: { message: 'Successfully logged out. Redirecting to home page.' }
      });
      setTimeout(home, 1500);
    },
    (error) => {
      errorLogout.value = error.message;
    }
  );
}

function resetUser() {
  user.value = null;
}

function home() {
  router.push('/');
}

function generateHexNumber() {
  let letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let color = '#';
  for (let i = 0; i < 20; i++) {
    color += letters[Math.floor(Math.random() * 36)];
  }
  return color;
}

//Add data under the user's name
function addData(Data) {
  const ID = generateHexNumber();
  setDoc(doc(firebaseFireStore, 'HCM_DATA', ID), Data);
  setDoc(doc(firebaseFireStore, 'users', user.value.uid, 'posts', ID), Data);
}

//Delete documents
async function deleteData(docID) {
  await deleteDoc(doc(firebaseFireStore, 'users', user.value.uid, 'posts', docID));
  await deleteDoc(doc(firebaseFireStore, 'HCM_DATA', docID));
}

//update documents
async function updateData(docID, data) {
  await updateDoc(doc(firebaseFireStore, 'users', user.value.uid, 'posts', docID), data);
  await updateDoc(doc(firebaseFireStore, 'HCM_DATA', docID), data);
}
</script>

<template>
  <Navigation :user="user" @logout="logout"></Navigation>
  <RouterView
    :allData="allData"
    :user="user"
    @logout="logout"
    @add-data="addData"
    @resetuser="resetUser"
    @delete-data="deleteData"
    @update-data="updateData"
    @search-extra-data="test"
  />
</template>

<style>
body {
  padding-top: 50px;
  background-image: url('./assets/subtle-background.jpg');
  background-size: cover;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.onPage {
  padding-left: 180px;
  padding-top: 50px;
}

.backgroundItems {
  background-color: rgba(255, 255, 255, 0.4) !important;
}
.backgroundItems:hover {
  background-color: rgba(255, 255, 255, 0.9) !important;
}
</style>
