<template>
	
	 <div class="detail">
		<div class="detail-top">
		<v-top name="消息通知"></v-top>
		</div>
		
		<div class="main">
			<scroller lock-x scrollbar-y >
				<div class="scroller-box">
			<div class="main-top">{{TranAmt}}</div>
			<div class="main-middle">
				<div>缴存类型:<span>{{CashInType}}</span></div>
				<div>交易时间:<span>{{TranDate}}</span></div>
				<div>款项日期:<span>{{MoneyDate}}</span></div>
				<div>款项类型:<span>{{TranType}}</span></div>
				<div>设备编号:<span>{{DevNo}}</span></div>
				<div>交易流水号:<span>{{TermSeqNo}}</span></div>
				<div>操作员:<span>{{UserName}}</span></div>
			</div>
			<div class="main-detail">
				<div>缴存明细</div>
				<ul v-for="(item,index) in MoneyList" :key="index">
					<li><span>￥{{item.Denom}}</span><span>{{item.Denom}}</span></li>
					<!--<li><span>￥50</span><span>{{count}}</span></li>
					<li><span>￥20</span><span>{{count}}</span></li>
					<li><span>￥10</span><span>{{count}}</span></li>
					<li><span>￥5</span><span>{{count}}</span></li>
					<li><span>￥1</span><span>{{count}}</span></li>
					<li><span>￥0.5</span><span>{{count}}</span></li>
					<li><span>￥0.1</span><span>{{count}}</span></li>-->
				</ul>
			</div>
			<div class="main-bottom">
				{{Result}}
			</div>
			<div class='bottom' style="height:.4rem"></div>
			  </div>
			</scroller>
		  </div>
		
	</div>
   	
</template>

<script>
	import Top from './comment/top.vue';
	  import {Scroller} from 'vux';
	export default {
		data(){
			return{
				MoneyList:'',
				CashInType:'',
				TranType:'',
				TranDate:'',
				MoneyDate:'',
				DevNo:'',
				TermSeqNo:'',
				UserName:'',
				Result:'',
				TranAmt:'',
				SID:'',
				UName:''
			}
		},
		mounted () {
			var that=this;
			that.SID=window.localStorage.getItem("SID");
			that.UName=window.localStorage.getItem("username");
			$.ajax({
				type:'post',
				url:'http://192.168.1.220:9020/',
				data:{
					"TCd":"5609",
					"UName":that.UName,
					"id":that.$route.params.abc, 
					"state":"0", 
					"SID":that.SID
				},
				success:function(res){
					console.log(res)
					var data=eval("("+res+")")
					that.MoneyList=data.Array;
					console.log(that.MoneyList)
					that.CashInType=data.CashInType;
					that.TranDate=data.TranDate
					that.TranType=data.TranType
					that.MoneyDate=data.MoneyDate
					that.DevNo=data.DevNo
					that.TermSeqNo=data.TermSeqNo
					that.UserName=data.UserName
					that.Result=data.Result
					that.TranAmt=data.TranAmt
				},
				error:function(err){
					console.log(err)
				}
			})
		},
		components:{
			"v-top":Top,
			Scroller
		}
	}
</script>

<style lang="scss" scoped>
  @charset "utf-8";	
  @import '../style/core/reset.scss';
  .detail{
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
  	 .detail-top{
  	 	width:100%;
  	 	height:1rem;
  	 } 
  	 .main{
  	 	@include flex(1);
  	 	width:100%;
  	 	background:#fff;
  	 	border-radius:.2rem;
  	 	padding:.1rem;
  	 	overflow:hidden;
        overflow-y:scroll;
        @include flexbox();
        @include flex-direction(column);
        
       .main-top{
       	   width:100%;
       	   height:.5rem;
       	   text-align:center;
       	   line-height:.5rem;
       	   border-bottom:1px solid #eee;
         } 
       .main-middle{
       	  div{
       	  	width:100%;
       	  	height:.3rem;
       	  	line-height:.3rem;
       	  }
       	
       }  
       .main-detail{
       	 ul{
       	 	li{
       	 		border-bottom:1px solid #eee;
       	 		@include flexbox();
       	 		@include flex-direction(row);
       	 		span{
       	 			@include flex(1)
       	 		}
       	 	}
       	 }
       } 
       .main-bottom{
       	width:100%;
       	height:.3rem;
       	line-height:.3rem;
       	text-align:right;
       	border-bottom:1px solid #eee;
       }
  	 }
  	  
  }
  @media screen and (max-width:321px){
		.main-top{font-size:20px;
		font-weight:600}
		
	}
	@media screen and (min-width:322px) and (max-width:413px){
		.main-top{font-size:22px;
		font-weight:600}
	}
     @media screen and (min-width:414px){
		.main-top{font-size:24px;
		font-weight:600}
	}
  
</style>