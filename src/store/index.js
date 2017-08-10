import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    value:"", 
    direction: 'forward',
    type:'',
    time:'',
    Moneylist:''

  },
  
  actions: {
    FETCH_LOADING: ({commit, state}) => {
      return state.loading
    }
  },

  mutations: {  
    SET_LOGININFO: (state, object) => {
      state.loginInfo = object
    },
    SET_DIRECTION: (state, str) => {
      state.direction = str
    },
    SET_Name:(state, str)=>{
    	state.realName=str
    },
    SET_DepInfo: (state,arr) => {
       state.Moneylist=arr;
      console.log(state.Moneylist)
      
   },
   
  },

  getters: {
    loading (state, getters) {
      return state.loading
    },  
    direction (state, getters) {
      return state.direction
    },
    
  }
})


export default store;