import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/home.vue';
import Pay from '../components/pay.vue';
import Bug from '../components/bug.vue';
import Server from '../components/server.vue';
import News from '../components/news.vue';
import Strong from '../components/strong.vue';
import Login from '../components/login.vue';
import Modify from '../components/modify.vue';
import Advitiser from '../components/advitiser.vue';
import Erweima from '../components/erweima.vue';
import Detail from '../components/detail.vue';
Vue.use(VueRouter);



const routes = [
{
  path: '/advitiser',
  name:'advitiser',
  component:Advitiser
  
},
{
  path: '/home',
  name:'home',
  component: Home,

},
{
  path: '/pay/',
  name:'pay',
  component: Pay,
 
   
},
{
  path: '/bug/',
  name:'bug',
  component: Bug
  
},
{
  path: '/server',
  name:'server',
  component:Server

},
{
  path: '/news/',
  name:'news',
  component:News,
  mate:{keepAlive:true }
},
{
  path: '/strong/',
  name:'strong',
  component:Strong,

 
},
{
  path: '/login',
  name:'login',
  component:Login
 
},
{
  path: '/modify',
  name:'modify',
  component:Modify
  
},
{
  path: '/erweima/id',
  name:'erweima',
  component: Erweima
},
{
  path: '/detail/abc',
  name:'detail',
  component: Detail,
   mate:{keepAlive:true }
},
{
       path: '*',
       redirect: '/advitiser'
        }]
const router = new VueRouter({mode:'history',
  base: __dirname, routes})
export default router