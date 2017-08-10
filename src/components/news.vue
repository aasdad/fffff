
<template>
	
	 <div class="news">
	 	
	 	<div v-transfer-dom>
        <loading v-model="show" :text="text1"></loading>
     </div>       
	    <div class="new-top">
	       <v-top name='缴费通知'></v-top>
	    </div>
	    <div class="new-main"> 
	       <div class="main-scroll" ref="main">
	       	    <scroller  lock-x bounce scrollbarY  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"  :scroll-bottom-offst="300" style="overflow:hidden;border-radius:.2rem;height:4.53rem" class="scrollbox">
	       	   	  <ul class="oul" >
	       	   	  	
	       	   	  <li v-for="(item,index) in newlist">
	       	   	  	<router-link :to="{name:'detail',params:{abc:item.id}}" class="link-list">
	       	   	 <div id="oli-time">
	       	   	 	<div>{{item.TDate}}</div>
	       	   	 </div>
	             <div>{{item.TType}}</div>
	             <div>{{item.TAmt}}</div>
	             <div  :class="true ? 'green' : 'red' " >{{item.TStatus}}</div>
	              </router-link>	
	       	   	  </li>
	       	   	    <load-more tip="loading"></load-more>
	       	   	    <div class="nomore">{{noMore}}</div>
	       	   	  </ul>
	       	    </scroller>
	       </div>
	    </div>	    
	 </div>	
</template>
<script>
	import Top from './comment/top.vue';
	import { Loading, LoadMore,Scroller,TransferDomDirective as TransferDom} from 'vux';
	export default {
		data () {
		return {
		 show:"",
		 text1: '加载中',
		 onFetching:false,
		 scrollTop:0,
		 bottomCount: 20,
		 newlist:'',
		 SID:'',
		 UName:'',
		 pageNum:'1',//请求页面page
		 noMore:''//请求没有数据
			}
		},
		directives: {
		    TransferDom
		 },
		mounted () {
			var that=this;
		    this.show=true;
		    that.SID=window.localStorage.getItem("SID");
			that.UName=window.localStorage.getItem("username");
		    $.ajax({  //获取交易记录
		    	type:"post",
		    	url:'http://192.168.1.220:9020/',
		    	data:{
		    		"TCd":"5608",
		    		"UName":that.UName,
		    		"Pg":that.pageNum, 
		    		"SID":that.SID
		    	},
		    	success:function(res){
		    		
		    		var data=eval("("+res+")");
		    		console.log(data);
		    		that.newlist=data.NL
		    		that.show=false;
		    		//$(".weui-loadmore").hide();
		    		
		    	},
		    	error:function(err){
		    		console.log(err)
		    	}
		    })
		    		
			var Height=this.$refs.main.clientHeight;
			console.log(Height);
			var sh=document.querySelector(".scrollbox");
			console.log(sh);
			sh.style.height=Height+"px";
		},
		methods:{
			onScrollBottom () {//到达底部判断
				var that=this;
		      if (this.onFetching) {
		        // do nothing     	        
		      } else {	
		      	 that.onFetching = true;
		         that.pageNum++;
		       $.ajax({
		    	type:"post",
		    	url:'http://192.168.1.220:9020/',
		    	data:{
		    		"TCd":"5608",
		    		"UName":that.UName,
		    		"Pg":that.pageNum, 
		    		"SID":that.SID
		    	},
		    	success:function(res){
		    		console.log(res);
		    		var data=eval("("+res+")");
		    		if(data.RCd=="11"){
		    			console.log(data.RstMsg)
		    			that.noMore=data.RstMsg;
		    			$(".weui-loadmore").hide();		    			
		    		}else{
		    		var  val2=that.newlist.concat(data.NL);
		        	     that.newlist=val2;
		        	    }
		        	     that.$nextTick(() => {
   		                 that.$refs.scrollerBottom.reset()
		    	                  })
		        	     that.onFetching = false;
		    	},
		    	error:function(err){
			  		 	console.log(err)
			  		 }
		       }); 		      
		}
		  }
			},
		components:{
			"v-top":Top,
			Loading,
			LoadMore,
			Scroller
			
		},
		computed:{
			
		}
	
	}
</script>

<style lang="scss" scoped>
 @charset "utf-8";	
 @import '../style/core/reset.scss';
	.news{
	  height:100%;
 	  width:100%;
 	  background: -webkit-linear-gradient(#1A58A1,#478EDC);
 	  background: -o-linear-gradient(#1A58A1,#478EDC);
 	  background: -moz-linear-gradient(#1A58A1,#478EDC);
 	  background: linear-gradient(#1A58A1,#478EDC);
 	  @include flexbox();
 	  @include flex-direction(column);
 	   padding:.15rem;
 	   padding-top:0px;
 	  .new-top{
 	  	width:100%;
 	  	height:1rem;
 	  }
	  .new-main{
	    @include flex(1);
	    width:100%;
	    box-sizing:border-box;
        overflow:hidden;
        overflow-y:scroll;
	    .main-scroll{
	    	width:100%;
	    	height:100%;
	    	box-sizing:border-box;
	    	border-radius:.2rem;
	    	background:#fff;
	    	overflow-y:scroll;
	    	overflow:hidden!important;
	    	
	    .scrollbox{ 	
	    	 
	      .oul{
	      	width:100%;
	      	height:100%;
	        li{
	        	@include flexbox();
	        	a{
	            @include flex(1);
	            @include flexbox();
	         	@include flex-direction(row);
	         	width:100%;
	         	height:.5rem;
	         	box-sizing:border-box;
	         	padding:.1rem;
	            border-bottom:1px solid #eee;
	            color:#000;
	        	}

	          }
	        a>div{
	         		 @include flex(1);
		             @include flexbox()
		             @include align-items(center);
		             @include justify-content(center);   
	         	}
	         	
	          }	
	    	} 
	    }
	  	
	  }
	  #oli-time{ 
		             @include flexbox();
		             @include flex-direction(column);	       
		             div{
		             @include flexbox()
		             @include align-items(center);
		             @include justify-content(center);  
		             }
	         		}	
	  
	  .nomore{
	  	width:100%;
	  	height:.5rem;
	  	text-align:center;
	  	line-height:.5rem;
	  }
	}
	.green{
		color:green;
	}
	.red{
		color:red
	}
	@media screen and (max-width:321px){
		.oul li{ font-size:14px}
		#oli-time{font-size:9px}
		
	}
	@media screen and (min-width:322px) and (max-width:413px){
		.oul li{ font-size:16px}
		#oli-time{font-size:14px}
	}
     @media screen and (min-width:414px){
		.oul li{ font-size:18px}
		#oli-time{font-size:16px}
	}
</style>