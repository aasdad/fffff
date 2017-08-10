<template>
	<div class="advitiser">
		<div class="adv">
		  <img :src="path"/>
		</div> 
		<div class='jump' @click="btn">
			跳过
		</div>	
	</div>
</template>

<script>
	var iTimer;
	export default {
		data () {
			return {
				path:'../static/start.jpg',
				SID:'',
				UName:'',
				powerId:''
			}
		},
		mounted(){
			var that=this;
			this.SID=window.localStorage.getItem("SID");
			this.UName=window.localStorage.getItem("username");
			this.powerId=window.localStorage.getItem("powerId");
			console.log(this.SID)
			console.log(this.UName)
			console.log(this.powerId)
			if(this.powerId==null||this.SID==null||this.UName==null){
				 console.log(1111111)
			 this.iTimer=setTimeout(function(){
				 that.$router.push('/login');
			   },5000)
			}else{
			  this.iTimer=setTimeout(function(){
				 that.$router.push('/home');
			   },5000)
			}
		
		},
		methods:{
			btn(){
//			if(this.powerId==null||this.SID==null||this.UName==null){
//				 console.log(1111111)
//			       this.$router.push('/login');
//			       clearTimeout(this.iTimer);
//			}else{
			  
				 this.$router.push('/home');
				  clearTimeout(this.iTimer);
			
//			}
				
			}
		}
		
	}
</script>

<style lang="scss" scoped>
   @charset "utf-8";	
   @import '../style/core/reset.scss';
     .advitiser{
     	width:100%;
     	height:100%;
     	position:relative;
     	.adv{
     		img{
     			width:100%;
     			height:100%;
     		}
     	}
     	.jump{
     	    position:absolute;
     		width:20%;
     		height:.3rem;
     		background:#999;
     		border-radius:10rem;
     		top:.1rem;
     		right:.2rem;
     		text-align:center;
     		line-height:.3rem;
     	}
     }
</style>