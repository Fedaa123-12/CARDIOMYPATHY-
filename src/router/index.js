import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/HomeView.vue';
import Query from '../components/QueryPage.vue';
import Analysis from '../views/AnalysisView.vue';
import ManageAccount from '../components/ManageAccount.vue';
import ResetPassword from '../views/ResetPassword.vue';
import GeneralMessage from '../views/GeneralMessage.vue';
import UpdateData from '../views/UpdateData.vue';
import UserPage from '../components/UserPage.vue';
import ApiSearch from '../components/ApiSearch.vue';
import geneIdDataInfo from '../views/geneIdDataInfo.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: Analysis
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
    },
    {
      path: '/manage',
      name: 'ManageAccount',
      component: ManageAccount
    },
    {
      path: '/deleteaccount',
      name: 'DeleteAccount',
      component: () => import('../components/DeleteAccount.vue')
    },
    {
      path: '/resetpassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/message/:message',
      name: 'GeneralMessage',
      component: GeneralMessage,
      props: true
    },
    {
      path: '/AddData',
      name: 'AddData',
      // lazy loading
      component: () => import('../views/AddData.vue')
    },
    {
      path: '/:postID',
      name: 'UpdateData',
      component: UpdateData,
      props: true
    },
    {
      path: '/userpage',
      name: 'UserPage',
      component: UserPage,
      props: true
    },
    {
      path: '/ApiSearch',
      name: 'ApiSearch',
      component: ApiSearch,
      props: true
    },
    {
      path: '/:entrezId',
      name: 'geneIdDataInfo',
      component: geneIdDataInfo,
      props: true
    },
    {
      path: '/GeneInfo',
      name: 'GeneInfo',
      // lazy loading
      component: () => import('../views/moreGeneInfoByAPI.vue')
    }
  ]
});

export default router;
