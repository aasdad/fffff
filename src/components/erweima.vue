<template>
	<div class="erweima">
		<div class="er-top" >
		  <span class="write">二维码{{$route.params.id}}</span>
		  <div class="back-icon">
		  <div class="iconbox" @click="clear">
		     	<i class="iconfont backicon">&#xe604;</i>
		  </div>
		 </div>
		 <div class="refresh">
			<div id="refreshbox" @click="refresh">
			 <i class="iconfont icon">&#xe609;</i>
			</div>
		 </div>
		 </div>
		 <div class='main'>
			<div class="mainbox">
			<!--<vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>-->
			<div id="code"></div> 
			</div>
			<p>该二维码两分钟刷新一次</p>
		</div>
	</div>
</template>

<script>
//	import VueQArt from 'vue-qart';   
    var Itimer1;
    var Itimer2;
	export default {
		data () {
			return {             
                SID:'',
                UName:'',
                type:'',
                time:''
			}
		},
		methods:{
			get () {
			 var val=this.$refs.text.value;
			 this.config.value=val;
			 console.log(this.config.value);
			},
			refresh() {
				var that=this;
				$("#code").empty();
               if(this.$route.params.id=="1"){
               	console.log("普")
		         that.create1();		     
		       } else if(this.$route.params.id=="2"){
		       	console.log("强")
	            that.create2();
 }		         
				  },
			 clear(){
			 	
			 	clearInterval(this.Itimer1);
			 	clearInterval(this.Itimer2);
			 		window.history.go(-1);
			 },
			 create1 () {
			var that=this;
			  console.log("普")
			  $.ajax({ //普通缴存请求生成二维码
			      	type:'post',
			      	url:'http://192.168.1.220:9020/',
			      	data:{
			      		"TCd": "5605",
			      		"UName":this.UName,
			      		"DepDate":this.time,
			      		"DepType":this.type, 
			      		"SID":this.SID
			         },
			        success:function(res){			        	
			        	var data=eval("("+res+")");
                        $('#code').qrcode(data.QRCd);//生成二维码   

			        },
			        error:function(err){
			        	console.log(err)
			        }
			     })
			   },
			    create2 () {//强制缴存
			    console.log("强")			   
			    var arr=[];
			    var obj={};
			    var key="Denom";
			    var key1="Number";
			    var Moneylist=this.$store.state.Moneylist;
			    for(var i=0;i<Moneylist.length;i++){//把vuex里的面值和钱张数数据取出
			    	if(Moneylist[i].Number!=null&&Moneylist[i].Number!=0){			    
			    		obj[key]=Moneylist[i].Denom;
			    		obj[key1]=Moneylist[i].Number;
			    		arr.push(obj)			   //组成对象 		
			    		console.log(arr)           //放入数组
			    	  }
			    	}
			    //console.log(arr)
			var that=this;			
			  $.ajax({ //强制缴存请求生成二维码
			      	type:'post',
			      	url:'http://192.168.1.220:9020/',
			      	data:{
			      		"TCd": "5606",
			      		"UName":that.UName,
			      		"DepDate":this.time, 
			      		"DepType":this.type, 
			      		"SID":that.SID,
			      		"DepInfo":arr			      	
			         },
			        success:function(res){			        	
			        	var data=eval("("+res+")");
			        	console.log(data)
                        $('#code').qrcode(data.QRCd);   
			        },
			        error:function(err){
			        	console.log(err)
			        }
			     })
			   }
			  
			},
		mounted(){
			var that=this;
			this.time=this.$store.state.time;
			this.type=this.$store.state.type;
			this.SID=window.localStorage.getItem("SID");
			this.UName=window.localStorage.getItem("username");
			if(this.$route.params.id=="1"){
				 this.create1() 
				 console.log(1111);
			this.Itimer1=setInterval(function(){//普通缴存定时器
			 	$("#code").empty();
			 	that.create1();	
			 	},120000)
			}else if(this.$route.params.id=="2"){
				  this.create2() 
			this.Itimer2=window.setInterval(function(){//强制缴存定时器
			 	$("#code").empty();
			 	that.create2();	
			 	},120000)
			}
		     
		  },
		components:{
			
			
		}
	}
</script>

<style lang="scss" scoed>
    @charset "utf-8";	
    @import '../style/core/reset.scss';
    .erweima{
    	width:100%;
    	height:100%;
    	 padding:.15rem;
	     padding-top:0px;
	     background: -webkit-linear-gradient(#1A58A1,#478EDC);
  	     background: -o-linear-gradient(#1A58A1,#478EDC);
 	     background: -moz-linear-gradient(#1A58A1,#478EDC);
 	     background: linear-gradient(#1A58A1,#478EDC);
	     @include flexbox();
	     @include flex-direction(column);
	    .er-top{
	       	  width:100%;
	       	  height:1rem;
	       	  position:relative;
	       	  @include flexbox();
	       	  @include flex-direction(row);
	       	  .write{
	       	  	@include flex(1)
 		 	   color:#fff;
 		 	   @include flexbox();
	 		 	@include justify-content(center);
	 		 	@include align-items(center); 		 	
	       	  }
	       	  .back-icon{
	       	  	position:absolute;
	 		 	width:20%;
	 		 	height:100%;
	 		 	top:0px;
	 		 	left:0px;
	 		 	@include flexbox();
	 		 	@include align-items(center);
	 		 	@include justify-content(center);
	 		 	 .iconbox	{
	 		   	width:50%;
	 		   	height:50%;
	 		 	.backicon{
	 		 		font-size:.3rem;
	 		 		color:#fff; 		
	 		 	     }
	               }
	       	  	
	       	  }	       	  
	       	 .refresh{
	       	 	position:absolute;
	       	 	width:10%;
	       	 	height:100%;;
	       	 	right:0;
	       	 	top:0;
	       	 	@include flexbox();
	       	 	@include align-items(center);
	       	 	@include justify-content(center);
	       	 	#refreshbox{
	       	 		width:100%;
	       	 		height:50%;
	       	 	   @include flexbox();
	       	 	   @include align-items(center);
	       	 	   @include justify-content(center);
	       	 	  }
	       	 	    .icon{
	       	 	    	font-size:.2rem;
	       	 	    	color:#fff;	
	       	 	    }
	       	 	
	       	   } 
	         } 
	         .main{
	         	@include flex(1);
	         	width:100%;	         	
	         	@include flexbox();
	       	 	@include align-items(center);
	       	 	@include justify-content(center);
	       	 	@include flex-direction(column)
	         	.mainbox{
	         		
	         		/*@include flex(4)
	         		width:80%;*/
	         		width:2.56rem;
	         		height:2.56rem;
	         		background:#fff;
	         		padding:.1rem;
	         		@include flexbox();
	       	 	    @include align-items(center);
	       	 	    @include justify-content(center);
	       	 	  #code{
	         		width:100%;
	         		height:100%;
	         		canvas{
	         			width:100%;
	         		    height:100%;
	         		}
	         	   }
	         	}
	         	p{color:#fff;
	         	@include flex(3);
	         	width:100%;
	         	text-align:center;
	         	margin-top:.2rem}
	         	
	         }
	     
    }
   
@media screen and (max-width:321px){
		.er-top>.write{ font-size:25px}
		
}
@media screen and (min-width:322px) and (max-width:413px){
		.er-top>.write{ font-size:30px}
		
}
  @media screen and (min-width:414px){
		.er-top>.write{ font-size:35px}
		
	}
</style>