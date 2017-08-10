<template>
	<div class="pay">
		 <div class="pay-top">
		 	<v-top name="缴存"/>
		 </div>
		 <div class="choose">
		 <div class="pay-main">
		 	<group class="group">
                <datetime class="datetime" v-model="value" title="缴费日期" @on-change="change" @on-clear="setToday"  :start-date="startDate" :end-date="endDate"  year-row="{value}年" month-row="{value}月" day-row="{value}日" value-text-align="left" confirm-text="确认" cancel-text="取消"></datetime>
		 	</group>
		 	<group class="group">
		      <selector  class="select" title="款项类型"   v-model="defaultValue" :options="list" value="" @on-change="onChange" style="text-align:left"></selector>
		    </group>
		 </div>
		 </div>
		 <div class="bottomBox">
		 <div class="pay-button">
		 	   <router-link :to="{name:'erweima',params:{id:1}}" class="link"><x-button  plain type="primary" style="border-radius:99px;border-color:#fff;color:#fff;margin-top:.2rem;" class="custom-btn custom-btn1" >缴存</x-button></router-link>
		 	   <router-link :to="{name:'strong'}" class="link"><x-button  plain type="primary" style="border-radius:99px;border-color:#fff;color:#fff" class="custom-btn custom-btn2" >强存</x-button></router-link> 
		 	   <router-link :to="{name:'erweima'}" class="link"><x-button  plain type="primary" style="border-radius:99px;border-color:#fff;color:#fff" class="custom-btn custom-btn3" >零钞存款</x-button></router-link>
		 </div>
		 </div>
	</div>	
</template>
<script>
	import Top from './comment/top.vue';
	import { XButton,Group,Datetime,Selector} from 'vux';
	import {mapState} from 'vuex';
	export default {
		data () {
			return {
				value:'',
				endDate:'',
				startDate:'',
				powerId:'',
				UName:'',
				SID:'',				
				show:'true',				
				defaultValue:'',
				list:[],				
				code:[],
				num:''
			}
		},
		methods:{
			  change (value) {
             //  console.log(value)
             },
			setToday (value) {//时间插件的设置
			      let now = new Date()
			      let cmonth = now.getMonth() + 1
			      let day = now.getDate()
			      if (cmonth < 10) cmonth = '0' + cmonth
			      if (day < 10) day = '0' + day
			      this.$data.value7 = now.getFullYear() + '-' + cmonth + '-' + day
			      console.log('set today ok')
			    },
		    onChange (val) {   //获得款项类型的codetype码		     
		      for(var i=0;i<this.list.length;i++){
		      	if(val==this.list[i]){
		      		console.log(i)		      		
		      	  var aa=this.code[i];
		      	   this.num=aa;
		      	}
		      }
		    },
	    	getPowerId () { //根据权限获得操作范围（下拉框，按钮）
	    		     var that=this;	
					 if(that.powerId=="1"||"2"||"3"){
					 	 $.ajax({
					 	 	type:"post",
					 	 	url:'http://192.168.1.220:9020/',
					 	 	data:{
					 	 		"TCd":"5604",
					 	 		"UName":this.UName,
					 	 		"SID":this.SID
					 	 	 },
					 	 	 success:function(res){
					 	 	  var data=eval("("+res+")")
					 	 	   console.log(data)
					 	 	   if(data.RCd=="00"){						 	 	 	
					 	 	 	for(var i=0;i<data.FundTypeList.length;i++){
					 	 	 	 that.list.push(data.FundTypeList[i].TypeName);	
					 	 	 	 that.code.push(data.FundTypeList[i].TypeCode)
					 	 	     }	
					 	 	     that.defaultValue=data.FundTypeList[0].TypeName
					 	 	   }	
					 	 	 },
					 	 	 error:function(err){
					 	 	 	console.log(err)
					 	 	 	
					 	 	 }
					 	 })
					 }else{
					 	
					 	document.querySelector(".weui-select").setAttribute("disabled","true");
					 	console.log(document.querySelector(".weui-select"))
					 }
					 
					 if(that.powerId=="1"){
					 	   document.querySelector(".custom-btn2").style.cssText="background:#7AAEE8;border-radius:99px;border-color:#fff;color:#FF9900";
					 	   document.querySelector(".custom-btn2").setAttribute("disabled","false")
					 } 
					 
					 if(that.powerId=="2"){
					 	   document.querySelector(".custom-btn1").style.cssText="background:#7AAEE8;border-radius:99px;border-color:#fff;color:#FF9900;margin-top:.4rem;";
					 	   document.querySelector(".custom-btn1").setAttribute("disabled","false")
					 }
					 if(that.powerId=="3"){
					 	
					 }
				},
				btn1 () {
					var that=this;
			        that.$store.state.time=this.value;
			        that.$store.state.type=this.num;
				},
				btn3 () {
					 $.ajax({
			      	type:'post',
			      	url:'http://192.168.1.220:9020/',
			      	data:{
			      		"TCd": "5605", 
			      		"UName": "14000001", 
			      		"DepDate": "2016-11-25", 
			      		"DepType": "1001",
			      		"SID": "GSD115"
			         },
			        success:function(res){
			        	console.log(res)
			        },
			        error:function(err){
			        	console.log(err)
			        }
			     })
				}
		},
		mounted (){
			  let now = new Date();
		      let cmonth = now.getMonth() + 1;
		      let day = now.getDate();
		      if (cmonth < 10) cmonth = '0' + cmonth;
		      if (day < 10) day = '0' + day;
		      this.value = now.getFullYear() + '-' + cmonth + '-' + day;
		      this.endDate = this.value;
		      this.startDate = now.getFullYear()-1 + '-' + 1 + '-' + 1;	
		      this.powerId=window.localStorage.getItem("powerId");//获取储存的	
		      this.SID=window.localStorage.getItem("SID");
			  this.UName=window.localStorage.getItem("username"); 
		      this.getPowerId();//获取权限数据
		},
		components:{
			'v-top':Top,
			XButton,
			Group,
			Datetime,
			Selector
		}
	}
</script>

<style lang="scss" >
   @charset "utf-8";	
   @import '../style/core/reset.scss';
	.pay{height:100%;
	     width:100%;
	     padding:.15rem;
	     padding-top:0px;
	     background: -webkit-linear-gradient(#1A58A1,#478EDC);
  	     background: -o-linear-gradient(#1A58A1,#478EDC);
 	     background: -moz-linear-gradient(#1A58A1,#478EDC);
 	     background: linear-gradient(#1A58A1,#478EDC);
	     @include flexbox();
	     @include flex-direction(column);
	       .pay-top{
	       	  width:100%;
	       	  height:0.7rem;
	         }
	       .choose{
	       	@include flex(1);
	       	width:100%;
	       	@include flexbox();
	       	@include align-items(center);
	       	@include justify-content(center)
	        .pay-main{
	        	width:100%;
	        	height:2rem;
	        	background:#fff;
	        	border-radius:.2rem;
	        	@include flexbox();
	        	@include flex-direction(column);
	        	@include align-items(center);
	        	@include justify-content(center);
	        	.group{
	        		width:100%;
	        		height:.7rem;
	        	}	        	
	         } 
	        }  
	        .bottomBox{
	        	@include flex(1);
	        	@include flexbox();
	        	@include align-items(center);
	        	@include justify-content(center);
	        	width:100%;
	        .pay-button{
	        	width:100%;
	        	.link{
	        		display:block;
	        		margin-bottom:.1rem;
	        	}
	         	.custom-btn{
	         		height:.4rem!important;
	         	 }	        	
	          }
	        }
	        .weui-cell_access {
	        	
	        }
	        
	       .weui-cell__ft{
	       	text-align:left!important;
	        padding-left:.41rem;
	       }
	   
	        
	       }
	
	 
@media screen and (max-width:321px){
    .pay-main{
    	font-size:16px!important
    }
    .select{
    	font-size:16px
    }
    .link{
    	font-size:9px;
    }
} 
@media screen and (min-width:322px) and (max-width:413px){
     .pay-main{
    	font-size:18px!important
    }
    .select{
    	font-size:18px
    }
    .link{
    	font-size:16px;
    }
}
@media screen and (min-width:414px){
    .pay-main{
    	font-size:20px!important
    }
    .select{
    	font-size:20px
    }
}
	
	
</style>