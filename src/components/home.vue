<template>
	<div class="home">
		<toast v-model="showPositionValue" type="text" width="2rem" :time="1000" is-show-mask text="bugvalue" :position="position"></toast>
		<header class="top">
			<span></span><span class="test">{{RName}},{{Time}}</span>
			<div class="icon">
				<div class="iconbox" @click="showPlugin">
				 <i class="iconfont backicon">&#xe604;</i>
				</div>
			</div>
		</header>
          <x-dialog v-model="back" class="dialog-demo">
          	  <div class="mode-box">
          	  	 <p class="context">确定注销该账户？</p>
          	  	 <p><span></span><span @click="onCancel" class="no">取消</span><span @click="onConfirm" class="sure">确定</span></p>
          	  </div>
          </x-dialog>
		<div class="top-swiper">
		<swiper height="1.8rem"  :aspect-ratio="300/800" show-dots dots-position="center" auto loop  :interval=3000 style="border-top:4px solid #fff;border-bottom:4px solid #fff">
			<swiper-item v-for="(item, index) in list" :key="index"><img :src="item"></swiper-item>
		</swiper>
		</div>
		<div class="bottom-swiper" style="border-bottom:.02rem solid #5DAD52">
		<swiper :show-dots="false" auto loop height="40px" direction="vertical"  :show-desc-mask="true">
			<swiper-item v-for="(item2, index) in text" :key="index"><p class="p-text">{{item2}}</p></swiper-item>
		</swiper>
		</div>
		<article class="routelink" @click.stop="close">
			<ul>
				<li style="border-bottom:1px solid #fff;border-right:1px solid #fff" ><router-link :to="{name:'news'}">					
					<span><i><img src="/static/M1.png"></i></span>
					<span>消息通知</span>
				</router-link></li>
				<li style="border-bottom:1px solid #fff"><router-link :to="{name:'pay'}">
					<span><i><img src="/static/P1.png"></i></span>
					<span>我要缴存</span>
				</router-link></li>
				<li style="border-right:1px solid #fff" @click.stop="open">
				    <a>
					<span><i><img src="/static/C1.png"></i></span>
					<span>客户服务</span>
					</a>
				</li>
				<li @click="fun1">
					<a>
				    <span><i><img src="/static/S1.png"></i></span>
					<span>故障报修</span>
					</a>
				</li>
			</ul>
			<div class="shodow" v-if="show">
				<div ><i class="iconfont">&#xe6d6;</i></div>
				<div ><span>400客服</span><i class="iconfont">&#xe65a;&#xe65a;&#xe65a;&#xe65a;&#xe65a;</i></div>
				<div @click="phoneCall(11184098)">
					<i class="iconfont">
					   &#xe63f;
				    </i>				
				</div>
			</div>
		</article>
	</div>		
</template>

<script>
	import { Card } from 'vux';
	import { Swiper,SwiperItem,Confirm,XDialog,Toast} from 'vux'
	
	export default{
			  data () {
			  	 return {
			  	 	list:[
			  	 	 "../static/banner1.png",
			  	 	 "./static/banner2.png",
			  	 	 "https://static.vux.li/demo/2.jpg"
			  	 	],
			  	 	text:"",
			  	 	show:false,
			  	 	back:false,
			  	 	SID:'',
			  	 	UName:'',
			  	 	RName:'',
			  	 	Time:'',
			  	 	position:'default',
			  	 	bugvalue:'',
			  	 	showPositionValue:false
			  	 }
			  },
			  methods:{
			  	 onCancel () { //注销时cancel
				      this.back=false;
				 },
				 onConfirm () {  //注销时sure
				 	var that=this;
				      console.log('on confirm');
				      $.ajax({   //请求登出
				      	type:'post',
				      	url:"http://192.168.1.220:9020/",
				      	data:{
				      		"TCd": "5602", 
				      		"UName":that.UName,
				      		"SID":that.SID
				      	},success:function(res){
				      		console.log(res)
				      		var data=eval("("+res+")")
				      		if(data.RCd=="00"){
				      			 that.back=false;
				      			window.localStorage.removeItem("SID");//清除部分localStorage
				      			window.localStorage.removeItem("powerId");
				      			window.localStorage.removeItem("realname");
				      			window.localStorage.removeItem("SID")
				                that.$router.push('/login');
				      		}
				      	},error:function(error){
				      		console.log(error)
				      	}
				      })
				     
				 },				
			  	showPlugin () {  //注销
			  	 	this.back=true;
				    },
			  	open (){  //客户服务
			  		this.show=true;
			  		
			  	},
			  	close (){  //客户服务
			  		this.show=false;	
			  	},
		 	  	showPosition (position) {//故障报告
                  this.position = position
                  this.showPositionValue = true
                   },
			  	judgeTime () {//一天的时间段判断
			  		var  now = new Date(),hour = now.getHours()
						if(hour < 6){this.Time="凌晨好！"}
						else if (hour < 9){this.Time="早上好！"}
						else if (hour < 12){this.Time="上午好！"}
						else if (hour < 14){this.Time="中午好！"}
						else if (hour < 17){this.Time="下午好！"}
						else if (hour < 19){this.Time="傍晚好！"}
						else if (hour < 22){this.Time="晚上好！"}
						else {this.Time="夜里好！"}
			  	},
			  	phoneCall (msg) {//拨打电话
			  		console.log(msg);
			  		window.location.href = 'tel:' + msg;
			  	},
				 fun1 () {	
				 	var that=this;
				    cordova.plugins.barcodeScanner.scan(
				      function (result) {
				         
				          $.ajax({
				          	type:"post",
				          	url:'http://192.168.1.220:9020/',
				          	data:{
				          		"TCd": "5614",
				          		"UName":that.UName, 
				          		"ErrQRCd":result.text, 
				          		"SID":that.SID
				          	},
				          	success:function(res){
				          		var data=eval("("+res+")");
				          		if(data.RCd=="00"){
				          		  that.showPosition("bottom");
				          		  that.bugvalue="上传成功"
				          		}else{
				          			 that.showPosition("bottom");
				          		      that.bugvalue="上传失败"
				          		}
				          	},
				          	error:function(error){
				          		console.log(error)
				          	}
				          })
				      },
				      function (error) {
				          that.showPosition("bottom");
				          that.bugvalue="上传失败"
				        },
				      {
				          preferFrontCamera : false, // iOS and Android 
				          showFlipCameraButton : true, // iOS and Android 
				          showTorchButton : true, // iOS and Android 
				          torchOn: false, // Android, launch with the torch switched on (if available) 
				          prompt : "请将二维码放入框中", // Android 
				          resultDisplayDuration:400, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
				          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
				          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device 
				          disableAnimations : true, // iOS 
				          disableSuccessBeep: false // iOS 
				      }
				   );
				 		}
			  },
			  mounted () {  //请求广告图片和标语
			  	this.judgeTime();
			  	var that=this;
			  	that.SID=window.localStorage.getItem("SID");
				that.UName=window.localStorage.getItem("username");
				that.RName=window.localStorage.getItem("realname");
				console.log(that.UName)
			  	$.ajax({   
			  		type:'post',
			  		async:false,
			  		url:'http://192.168.1.220:9020/',			  		
			  		data:{"TCd": "5616",
			  		     "UName":this.UName,
			  		     "SID":this.SID
			  		     },
			  		 success:function(res){
			  		 	console.log(res)
			  		 	
			  		 	var data=eval("("+res+")");
			  		 	console.log(data.Slogan)
			  		 	that.text=data.Slogan;			  		 	
			  		 },
			  		 error:function(XMLHttpRequest, textStatus, errorThrown){
			  		 	 console.log(XMLHttpRequest.status);
                         console.log(XMLHttpRequest.readyState);
                         console.log(textStatus);
			  		 }
			  	})
			  },
			  components:{
			      Card,
			      SwiperItem,
			      Swiper,
			      Confirm,
			      XDialog,
			      Toast
			   
			  }
		
		
		
	}
</script>

<style lang="scss" scoped>
 @charset "utf-8";	
 @import '../style/core/reset.scss';
 .home{
 	  height:100%;
 	  width:100%;
 	  background: -webkit-linear-gradient(#1A58A1,#478EDC);
 	  background: -o-linear-gradient(#1A58A1,#478EDC);
 	  background: -moz-linear-gradient(#1A58A1,#478EDC);
 	  background: linear-gradient(#1A58A1,#478EDC);
 	  @include flexbox();
 	  @include flex-direction(column);
 	.top{
 		height:0.7rem;
 		width:100%;
 		 @include flexbox();
 		 position:relative;
 		 span:first-child{
 		 	@include flex(1)
 		 }
 		 .test{
 		 	@include flex(9)
 		 	color:#fff;
 		 	 @include flexbox();
 		 	@include justify-content(center);
 		 	@include align-items(center);
 		 }
 		 .icon{
 		 	position:absolute;
 		 	top:0px;
 		 	left:0px;
 		 	
 		 	width:20%;
 		 	height:100%;
 		 	@include flexbox();
 		 	@include align-items(center);
 		 	@include justify-content(center);
 		   .iconbox	{
 		   	width:50%;
 		   	height:50%;
 		   	@include flexbox();
 		 	@include align-items(center);
 		 	@include justify-content(center);
 		 	.backicon{
 		 		font-size:.3rem;
 		 		color:#fff;
 		 	  }
           }
 		 }
 		 
 	}
 	.top-swiper{
 		width:100%;	
 	
 		.vux-swiper{
 			.vux-swiper-item{	
 				width:100%;
 				height:100%;				
 				img{
 					width:100%;
 				    height:100%;	
 				}
 			}
 		  }
 	
 	}
 	.bottom-swiper{
 		width:100%;
 		height:.4rem;
 	}
 	.p-text{
 		height:100%;
 		width:100%;
 		@include flexbox();
 		@include justify-content(center);
 		@include align-items(center);
 		color:#fff;
 	} 
 	.routelink{
 		@include flex(1)
 		/*height:5rem;*/
 		width:100%;
 		@include flexbox();
 		@include justify-content(center);
 		@include align-items(center);
 		position:relative;
 		ul{
 			width:70%;
 			height:60%;
 			@include flexbox();
 			@include justify-content(center);
 			@include align-items(center);
 			@include flex-wrap(wrap)
 			li{
 			  width:50%;
 		 	  height:50%;
 			  @include flexbox();
 			  @include justify-content(center);
 			  @include align-items(center); 			  	
 			  a{
 			  	width:100%;
 			  	height:100%;
 			  	@include flexbox();
 			    @include flex-direction(column);
	 			 span:first-child{
	 			  	@include flex(1);
	 			  	width:100%;
	 			  	@include flexbox();
		 			@include justify-content(center);
		 			@include align-items(center);
		 			color:#fff;
		 			i{
		 				height:10%;
		 				width:5%;
		 				img{
		 					width:100%;
		 					height:100%;
		 				}
		 			}
	 			  }
	 			  span:last-child{
	 			  	@include flex(1);
	 			  	width:100%;
	 			  	@include flexbox();
		 			@include justify-content(center);
		 			@include align-items(center);
	 			  }
	 			  
 			   }
 			}
 		}
 		   
 		.shodow{
 			width:100%;
 			height:1rem;
 			position:absolute;
 			bottom:0;
 			left:0;
 			background:rgba(0,0,0,0.7);
 			@include flexbox();
 			@include flex-direction(row);
 			div:nth-child(1){
 				@include flex(3)
 				@include flexbox();
 				i{
 				  display:block;
 				  width:60%;
 				  height:.6rem;
 				  background:#FF9900;
 				  border-radius:50%;
 				  font-size:40px;
 				  color:#fff;
 				  text-align:center;
 				  line-height:.6rem;	
 				  margin:auto;
 				}
 			}
 			div:nth-child(2){
 				@include flex(3);
 				@include flexbox();
 				@include flex-direction(column);
 				span{ 					
 					@include flex(1)
 					width:100%;					
 					font-size:16px;
 					color:#fff;
 					@include flexbox();
 					@include align-items(flex-end);
 					@include justify-content(center);
 				  }
 				i{
 					@include flex(1);
 					width:100%;
 					color:#FF9900;
 					@include flexbox();					
 					@include justify-content(center);
 				}
 			}
 			div:nth-child(3){
 				@include flex(4);
 				@include flexbox();
 				@include align-items(center);
 				@include justify-content(center);

 				i{
 					width:60%;
 					height:.6rem;
 					color:#fff;
 					font-size:30px;
 					@include flexbox();
 					@include align-items(center);
 					@include justify-content(center);
 				}
 			}
 		}
 		
 	}
 	.mode-box{width:100%;
 	height:1rem;
 	background:#fff;
 	border-radius:.2rem;
 	padding:.1rem;
 	@include flexbox();
 	@include flex-direction(column);
 	  p{
 	  	@include flex(1);
 	  	width:100%;
 	  	&:first-child{
 	  	 @include flexbox();
 	  	 @include align-items(center);	
 	  	}
 	  	&:last-child{
 	  		@include flexbox();
 	       @include flex-direction(row);
 	       span:nth-child(1){
 	       	@include flex(6)
 	       }
 	       span:nth-child(2){
 	       	@include flex(2)
 	       	color:red;
 	       }
 	       span:nth-child(3){
 	       	@include flex(2)
 	       		color:red;
 	       }
 	  	}
 	  	
 	  }
 	}
 	 
 }
 
@media screen and (max-width:321px){
    .test{font-size:25px}
    .p-text{font-size:14px}
    ul span{
    	font-size:14px;
    	color:#fff;
    }
    .cancel{font-size:14px;}
    .context,.no,.sure{
    	font-size:14px;
    }
} 
@media screen and (min-width:322px) and (max-width:413px){
     .test{font-size:30px}
     .p-text{font-size:16px}
      ul span{
    	font-size:16px;
    	color:#fff;
    }
    .cancel{font-size:16px;}
    .context,.no,.sure{
    	font-size:16px;
    }
}
@media screen and (min-width:413px){
     .test{font-size:35px}
     .p-text{font-size:18px}
      ul span{
    	font-size:18px;
    	color:#fff;
    }
    
    .cancel{font-size:18px;}
     .context,.no,.sure{
    	font-size:18px;
    }
}
	
</style>