<template>
	<div class="modify">
		 <toast v-model="show" type="text" class="error" width="1rem">{{text}}</toast>
	   <div class="modify-top">	
		  <span class="modify-write">{{name}}</span>
			<div class="modify-icon">
			  <div class="iconbox" @click="back">
		     	 <i class="iconfont backicon">&#xe604;</i>
		      </div>
			</div>
		</div>
		<div class="modify-main">
			<div class="main-box">
			<div class="user">
		 		<div class="user-icon"><i class="iconfont">&#xe659;</i></div>
		 		<input type="text" placeholder="请输入工号" class="username"/>
		 	</div>
		 	<div class="oldpass">
		 		<div class="user-icon"><i class="iconfont">&#xe684;</i></div>
		 		<input type="password" placeholder="请输入原密码" class="oldpassword"/>
		 	</div>
		 	<div class="newpass">
		 		<div class="user-icon"><i class="iconfont">&#xe684;</i></div>
		 		<input type="password" placeholder="请输入新密码" class="newpassword"/>
		 	</div>
		 	 <div class="dianji">
		 	  <x-button type="default" @click.native="register"  plain style="border-radius:.99rem;height:.4rem;border-color:#fff;color:#fff;">进入</x-button>
		 	</div>
		 </div>		 	
	 	</div>
	</div>
</template>

<script>
	import { XButton,Toast} from 'vux';
	export default {
		data(){
			return {
				name:'修改密码',
				show:false,
				text:""
			}
		},
		methods:{
			back() { //返回登陆页
				this.$router.push('./login');
			},
			register(){ //修改密码
				var that=this;
				$.ajax({
					type:"post",
					url:'http://192.168.1.220:9020/',
					data:{
						"TCd": "5603",
						"UName": "140001",
						"OldPwd": "931C386956C1A402", 
						"NewPwd": "931C386956C1A402"
					},
					success:function(res){
						console.log(res)
						var data=eval("("+res+")");
						if(data.RCd=="00"){
						    that.text="成功";
						    that.show=true;
						    setTimeout(function(){
						    	that.$router.push("/login");
						    },500)
						    
						}else if(data.RCd=="E1"){
							 that.text="原密码错误";
						     that.show=true;
						}else if(data.RCd=="W2"){
							  that.text="新密码与原密码不一致";
						      that.show=true;
						}else if(data.RCd=="11"){
							  that.text="用户名不存在";
						      that.show=true;
						}
					},
					error:function(error){
						 console.log(err)
					}
				})
			}
			
		},
		components:{
			XButton,
			Toast
		}
	}
</script>

<style lang="scss" scoped>
  @charset "utf-8";	
  @import '../style/core/reset.scss';
  .modify{
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
	   .modify-top{
	   	width:100%;
 	  	height:0.8rem;
 	  	position:relative;
 	  	@include flexbox();
 	    .modify-write{
 	  		@include flex(1)
 		 	color:#fff;	
 		 	@include flexbox();
 		 	@include justify-content(center);
 		 	@include align-items(center);
 	  	  }
 	  	 .modify-icon{
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
 		   	@include flexbox();
 		 	@include align-items(center);
 		 	@include justify-content(center);
 		 	.backicon{
 		 		font-size:.18rem;
 		 		color:#fff; 		
 		 	     }
               }
 	  	 } 
 	  	  
	   }   
	   .modify-main{
	   	@include flex(1);
	   	width:100%;
	   	     @include flexbox();
	   		 @include justify-content(center);
	     	 @include align-items(center);
	   	.main-box{
	   		 width:100%;
	   		 &>div{
	   		 	margin-bottom:20px;
	   		 }
	   		.user{
	   			height:.5rem;
	     		width:100%;
	     		@include flexbox();
	     		@inlucde flex-direction(row);
	     		@include justify-content(center);
	     		@include align-items(center);
	     	 .user-icon{
	     	 	    width:10%;
	     			height:100%;
	     			@include flexbox();
	     			@include justify-content(center);
	     			@include align-items(center);
	     			i{
	     				font-size:.2rem;
	     				color:#fff;
	     				
	     			}
	     		
	     	 }	
	     	 .username{
	     			width:100%;
	     			height:.3rem;
	     			background:none;
	     			border:none;
	     			border-bottom:1px solid #fff;
	     			color:#fff;
	     		}
	     	
	   		}
	   		
	   		.oldpass {
	   			height:.5rem;
	     		width:100%;
	     		@include flexbox();
	     		@inlucde flex-direction(row);
	     		@include justify-content(center);
	     		@include align-items(center);
	     		
	     		 .user-icon{
	     	 	    width:10%;
	     			height:100%;
	     			@include flexbox();
	     			@include justify-content(center);
	     			@include align-items(center);
	     			i{
	     				font-size:.2rem;
	     				color:#fff;
	     				
	     			}
	     		
	     	 }	
	     	 .oldpassword{
	     			width:100%;
	     			height:.3rem;
	     			background:none;
	     			border:none;
	     			border-bottom:1px solid #fff;
	     			color:#fff;
	     		}
	     		
	   		}
	   		
	   	.newpass {
	   			height:.5rem;
	     		width:100%;
	     		@include flexbox();
	     		@inlucde flex-direction(row);
	     		@include justify-content(center);
	     		@include align-items(center);
	     		
	     		 .user-icon{
	     	 	    width:10%;
	     			height:100%;
	     			@include flexbox();
	     			@include justify-content(center);
	     			@include align-items(center);
	     			i{
	     				font-size:.2rem;
	     				color:#fff;
	     				
	     			}
	     		
	     	 }	
	     	 .newpassword{
	     			width:100%;
	     			height:.3rem;
	     			background:none;
	     			border:none;
	     			border-bottom:1px solid #fff;
	     			color:#fff;
	     		}
	     		
	   		}
	   		
	   	}
	   }
	   input:-moz-placeholder { 
       color: #fff; 
        }
       input::-webkit-input-placeholder{
      color: #fff;
          } 
       input:-ms-input-placeholder{
        color: #fff;
        }   
        
     .error{
     	color:#fff;
     	font-size:12px;
     }   
  
  }
	
   @media screen and (max-width:321px){
    .modify-write{
    	font-size:14px
    }
    
} 
@media screen and (min-width:322px) and (max-width:413px){
     .modify-write{
    	font-size:18px
    }
}
@media screen and (min-width:414px){
    .modify-write{
    	font-size:20px
    }
}
</style>