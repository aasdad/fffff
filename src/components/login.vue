<template>
	 <div class="login">
	 	<toast v-model="show" type="text" class="error" width="1rem">账户或密码错误</toast>
	 	<div class="main">
	 	<div class="user">
	 		<div class="user-icon"><i class="iconfont">&#xe659;</i></div>
	 		<input type="text" placeholder="请输入工号" class="username"  v-model="val"/>
	 	</div>
	 	<div class="pass">
	 		<div class="pass-icon"><i class="iconfont">&#xe684;</i></div>
	 		<input type="password" placeholder="请输入密码" class="password" v-model="val3"/>
	 	</div>
	 	<div>
		    <x-switch title="记住用户名"  style="background:none;border:none;color:#fff;" v-model="val2" ></x-switch>
	   </div>
	   <div>
	   	 <x-button @click.native="login" type="default"  plain style="border-radius:.99rem;height:.4rem;border-color:#fff;color:#fff;">进入</x-button>
	   </div>
	   </div>
	   <div class="modifycode">
	   	  <p><router-link :to="{name:'modify'}" class="mc">修改密码</router-link></p>
	   </div>
	  </div>
</template>

<script>
	import {Group,XSwitch,XButton,Toast} from 'vux';
	export default {
		data () {
			return {
				val:'',
				val2:false,
				val3:'',
				val4:'TSDFJI345DSFofsjdo12',				
				show:false				
			}
		},
		methods:{
			btn () {    // 修改密码页面跳转
				this.$router.push('/modify');
			},
			login(){     //登陆请求
		var that=this;
            console.log(that.val)
            console.log(that.val3)
            var md = hex_md5(that.val3)//md码32位
            var md16 = md.substr(8, 16);//md码16位
            var Uppermd16 = md16.toUpperCase(md16)//大写
           $.ajax({	
         	 type:'post',
         	 url:'http://192.168.1.220:9020/',
         	 data:{"TCd":"5601",
         	       "UName":that.val, 
         	       "Pwd":Uppermd16,
                   "CID":that.val4
               },    
         success:function(res){
         	 console.log(res) 
         	 var data=eval("("+res+")");
         
         	// $store.commit("SET_Name(data.RealName)");
         	 //$store.state.realName;
         	 if(data.RCd=='00'){        	
         	 	if(that.val2){			 	
			 	window.localStorage.setItem('username',that.val);
			 	window.localStorage.setItem('state',that.val2);
			 	window.localStorage.setItem('SID',data.SID);
			 	window.localStorage.setItem('powerId',data.AuthCd);			 	
			 	window.localStorage.setItem('realname',data.RealName);
			 	that.$router.push('/home');
			      }else{
			  	window.localStorage.setItem('state',that.val2);
			  	window.localStorage.setItem('SID',data.SID);
			  	window.localStorage.setItem('powerId',data.AuthCd);
			  	window.localStorage.setItem('realname',data.RealName);
			  	that.$router.push('/home');
			      };
         	 }else{
         	 	console.log("111");
         	 	that.show=true;         	 	
         	 	that.val3=""
         	 }
          },
		 error:function(err){
				console.log(err)
			},
		 complete:function(data,status){  
                   console.log(status);   
               }  	          
			   })
              },
            showPosition (position) {
               this.position = position
               this.showPositionValue = true
                }   
		},
		mounted(){	
			
			var st=window.localStorage.getItem("state");
			
			if(st=="false"){
				this.val2=false;
			}else{
				var user=window.localStorage.getItem("username");
				this.val2=true;
			
			if(user!=null){
				this.val=user;
			   }
			}
		},
		components:{
			Group,
			XSwitch,
			XButton,
			Toast
			
		}
	}
	
</script>

<style lang="scss" scoped>@charset "utf-8";
@import '../style/core/reset.scss';
.login {
	height: 100%;
	width: 100%;
	padding: 0.15rem;
	padding-top: 0px;
	background: -webkit-linear-gradient(#1A58A1, #478EDC);
	background: -o-linear-gradient(#1A58A1, #478EDC);
	background: -moz-linear-gradient(#1A58A1, #478EDC);
	background: linear-gradient(#1A58A1, #478EDC);
	@include flexbox();
	@include flex-direction(column);
	.main {
		width: 100%;
		margin: auto;
		&>div {
			margin-top: .3rem;
		}
		.user {
			height: .5rem;
			width: 100%;
			@include flexbox();
			@inlucde flex-direction(row);
			@include justify-content(center);
			@include align-items(center);
			.user-icon {
				width: 10%;
				height: 100%;
				@include flexbox();
				@include justify-content(center);
				@include align-items(center);
				i {
					font-size: .2rem;
					color: #fff;
				}
			}
			.username {
				width: 100%;
				height: .3rem;
				background: none;
				border: none;
				border-bottom: 1px solid #fff;
				color: #fff;
			}
		}
		.pass {
			height: .5rem;
			width: 100%;
			@include flexbox();
			@inlucde flex-direction(row);
			@include justify-content(center);
			@include align-items(center);
			.pass-icon {
				width: 10%;
				height: 100%;
				@include flexbox();
				@include justify-content(center);
				@include align-items(center);
				i {
					font-size: .2rem;
					color: #fff;
				}
			}
			.password {
				width: 100%;
				height: .3rem;
				background: none;
				border: none;
				border-bottom: 1px solid #fff;
				color: #fff;
			}
		}
	}
	.modifycode {
		bottom: 0;
		height: .4rem;
		width: 100%;
		p {
			@include flexbox();
			@include justify-content(center);
			@include align-items(center);
			color: #fff;
		}
	}
	input:-moz-placeholder {
		color: #fff;
	}
	input::-webkit-input-placeholder {
		color: #fff;
	}
	input:-ms-input-placeholder {
		color: #fff;
	}
	.error{font-size:12px;color:#fff;}
  }

@media screen and (max-width:321px) {
	.mc {
		font-size: 14px;
		color: #fff;
	}
}

@media screen and (min-width:322px) and (max-width:413px) {
	.mc {
		font-size: 16px;
		color: #fff;
	}
}

@media screen and (min-width:414px) {
	.mc {
		font-size: 20px;
		color: #fff;
	}
}
</style>