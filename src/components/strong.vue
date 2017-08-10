<template>
	 <div class="strong">
	 	 <div class="strong-top">
	 	 	<v-top name="强制缴存"></v-top>
	 	 </div>
	 	 <div class="strong-main">
	 	 	 <div class="hundred">
	 	 	 	 	  <group class="group" gutter="0">	
					      <x-number   :value="0" :min="0"  title="100" width="0.38rem"  @on-change="change1"></x-number>					    
					      <x-number   :value="0" :min="0"  title="50" width="0.38rem"  @on-change="change2"></x-number>  
					      <x-number   :value="0" :min="0"  title="20" width="0.38rem" @on-change="change3"></x-number>  
					      <x-number   :value="0" :min="0"  title="10" width="0.38rem" @on-change="change4"></x-number>
					      <x-number   :value="0" :min="0"  title="5" width="0.38rem" @on-change="change5"></x-number>
					      <x-number   :value="0" :min="0"  title="1" width="0.38rem" @on-change="change6"></x-number>
					      <x-number   :value="0" :min="0"  title="0.5" width="0.38rem" @on-change="change7"></x-number>
					      <div class="totalBox">
					      	<div class="totalcount"><span>总张数:</span><span>{{totalcount}}</span></div><div class="totalMoney"><span>总金额:</span><span>￥{{totalMoney}}</span></div>
					      </div>
	 	 	 	 	  </group>  
	 	 	 </div>	
	 	 </div>
	 	 <div class="strong-bottom">
	 	   <x-button @click.native="btn2"  plain type="primary" style="border-radius:99px;height:.4rem;background:#FEA11E;border:none;" class="link">强存</x-button>
	 	 </div>
	 	 <toast v-model="show"  type="text" :time="1000" width="2rem" is-show-mask text="请先选择缴存的面值" :position="position"></toast>
	 </div>
</template>
<script>
	import Top from './comment/top.vue';
	import { XButton , Group,XNumber,Cell,Toast} from 'vux';
	export default {
		data () {
			return {
				val1:"0",//点击的张数
				val2:"0",
				val3:"0",
				val4:"",
				val5:"",
				val6:"",
				val7:"",				
				obj1:{},//点击的的面值和张数组成对象
				obj2:{},
				obj3:{},
				obj4:{},
				obj5:{},
				obj6:{},
				obj7:{},
				hundredValue:"",//
				totalcount:"0",//总张数
				totalMoney:"0",//总金额
				position: 'default',
				show:false
			}
		},
		methods:{
			change1 (val) {
				 console.log( val);
				 this.val1=val;
				 var num=Number(this.val1)+Number(this.val2)+Number(this.val3)+Number(this.val4)+Number(this.val5)+Number(this.val6)+Number(this.val7);
				 var money= this.val1*100+this.val2*50+this.val3*20+this.val4*10+this.val5*5+this.val6*1+this.val7*0.5;
				 this.totalcount=num;//总张数
				 this.totalMoney=money;	//总金额			 
				 var key="Denom";
				 var key1="Number"
				 this.obj1[key]=100;
				 this.obj1[key1]=this.val1
			},
			change2 (val) {
				 console.log( val);
				 this.val2=val;
				  var num=Number(this.val1)+Number(this.val2)+Number(this.val3)+Number(this.val4)+Number(this.val5)+Number(this.val6)+Number(this.val7);
				  var money= this.val1*100+this.val2*50+this.val3*20+this.val4*10+this.val5*5+this.val6*1+this.val7*0.5;
				 this.totalcount=num;
				 this.totalMoney=money;
				 var key="Denom";
				 var key1="Number"
				 this.obj2[key]=50;
				 this.obj2[key1]=this.val2
	
			},
			change3 (val) {
				 console.log( val);
				 this.val3=val;
				  var num=Number(this.val1)+Number(this.val2)+Number(this.val3)+Number(this.val4)+Number(this.val5)+Number(this.val6)+Number(this.val7);
				 var money= this.val1*100+this.val2*50+this.val3*20+this.val4*10+this.val5*5+this.val6*1+this.val7*0.5;
				this.totalcount=num;
				this.totalMoney=money;
				 var key="Denom";
				 var key1="Number"
				 this.obj3[key]=20;
				 this.obj3[key1]=this.val3
			},
			change4 (val) {
				 console.log( val);
				 this.val4=val;
				   var num=Number(this.val1)+Number(this.val2)+Number(this.val3)+Number(this.val4)+Number(this.val5)+Number(this.val6)+Number(this.val7);
				var money= this.val1*100+this.val2*50+this.val3*20+this.val4*10+this.val5*5+this.val6*1+this.val7*0.5;
				this.totalcount=num;
				this.totalMoney=money;
			     var key="Denom";
				 var key1="Number";
				 this.obj4[key]=10;
				 this.obj4[key1]=this.val4;
				 
			},
			change5 (val) {
				 console.log( val);
				this.val5=val;
				   var num=Number(this.val1)+Number(this.val2)+Number(this.val3)+Number(this.val4)+Number(this.val5)+Number(this.val6)+Number(this.val7);
				var money= this.val1*100+this.val2*50+this.val3*20+this.val4*10+this.val5*5+this.val6*1+this.val7*0.5;
				this.totalcount=num;
				this.totalMoney=money;
				 var key="Denom";
				 var key1="Number"
				 this.obj5[key]=5;
				 this.obj5[key1]=this.val5
				 
			},
			change6 (val) {
				 console.log( val);
				 this.val6=val;
				  var num=Number(this.val1)+Number(this.val2)+Number(this.val3)+Number(this.val4)+Number(this.val5)+Number(this.val6)+Number(this.val7);
				var money= this.val1*100+this.val2*50+this.val3*20+this.val4*10+this.val5*5+this.val6*1+this.val7*0.5;
				this.totalcount=num;
				this.totalMoney=money;
				var key="Denom";
				var key1="Number";
				this.obj6[key]=1;
				this.obj6[key1]=this.val6;
			},
			change7 (val) {
				console.log( val);
				this.val7=val;
				var num=Number(this.val1)+Number(this.val2)+Number(this.val3)+Number(this.val4)+Number(this.val5)+Number(this.val6)+Number(this.val7);
				var money= this.val1*100+this.val2*50+this.val3*20+this.val4*10+this.val5*5+this.val6*1+this.val7*0.5;
				this.totalcount=num;
				this.totalMoney=money;
				var key="Denom";
				var key1="Number";
				this.obj7[key]=0.5;
				this.obj7[key1]=this.val7;
		   },
		   showPosition (position) {
            this.position = position
            this.show = true
           },
			btn2 (){
				if(this.val1==("0"||"")&&this.val2==(""||"0")&&this.val3==(""||"0")&&this.val4==""&&this.val5==""&&this.val6==""&&this.val7==""){
					this.showPosition("bottom");//判断是否全部为空
				}else{
				 var arr=[];
		    	 arr=[this.obj1,this.obj2,this.obj3,this.obj4,this.obj5,this.obj6,this.obj7]
		    	 this.$store.commit("SET_DepInfo",arr)//保存在vuex里的
				 this.$router.push({ name:'erweima',params:{id:2}})//跳转路由
				}
			}
           
 
		},
		components:{
		  "v-top":Top,
		  XButton,
		  Group,
		  XNumber,
		  Cell,
		  Toast
		}
		
	}
	
</script>

<style lang="scss" >
   @charset "utf-8";	
   @import '../style/core/reset.scss';
    .strong{
    	 height:100%;
	     width:100%;
	     padding:0.15rem;
	     padding-top:0px;
	     background: -webkit-linear-gradient(#1A58A1,#478EDC);
  	     background: -o-linear-gradient(#1A58A1,#478EDC);
 	     background: -moz-linear-gradient(#1A58A1,#478EDC);
 	     background: linear-gradient(#1A58A1,#478EDC);
	     @include flexbox();
	     @include flex-direction(column);
    	.strong-top{
    		 width:100%;
	       	 height:0.7rem;
    	}
    	.strong-main{
    		@include flex(7);
    		width:100%;
    		@include flexbox();
    		@include flex-direction(column);
    		background:#fff;
    		border-radius:.15rem;
    		padding:.15rem;
    		overflow:hidden;
    		div{
    			@include flex(1);
    			width:100%;
    			overflow:auto;
    		}
    		.totalBox{
    			@include flexbox();
    			@include flex-direction(row)
    			.totalcount{
    				@include flex(5);
    				@include flexbox();
    			    @include flex-direction(row);
    			    
    			}
    			.totalMoney{
    				@include flex(6)
    				@include flexbox();
    			    @include flex-direction(row);
    			}
    		}
    	}
    	.strong-bottom{
    		margin-top:0.2rem;
    		@include flex(1);
    		width:100%;
    		@include flexbox();
    		a{
    			@include flex(1)
    		}
    	}
      .weui-cell__hd{width:.1px!important}
      .vux-number-input{height:30px!important}
      .vux-number-selector{height:30px!important}
      .vux-number-selector-plus{float:left}

    }


@media screen and (max-width:321px){
   .totalBox{font-size:16px;}
} 
@media screen and (min-width:322px) and (max-width:413px){
   .totalBox{font-size:18px;}
}
@media screen and (min-width:414px){
     .totalBox{font-size:20px;}
}

	
</style>