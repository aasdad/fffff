<template>	
		<header class="top-header">
			<span class="write">{{name}}</span>
			<div class="back-icon">
			  <div class="iconbox" @click="back">
		     	 <i class="iconfont backicon">&#xe604;</i>
		      </div>
			</div>
		</header>
		
</template>

<script>
	 export default {
	     data () {
			  	 return {
			  	 	
			  	 }
			  },
		   mounted(){
		   	 
		   },
		   props:['name'],	  
	       methods:{
			    back () {window.history.go(-1);
			    	console.log(11)
			    	
			    	
			    }
			  	
			  }
		  
		
	}
</script>

<style lang="scss" scoped>
 @charset "utf-8";	
 @import '../../style/core/reset.scss';
    .top-header{
 		height:100%;
 		width:100%;
 		 @include flexbox();
 		 position:relative;
 		 .write{
 		 	@include flex(1)
 		 	color:#fff;
 		 	 @include flexbox();
 		 	@include justify-content(center);
 		 	@include align-items(center);
 		  }
 		   .back-icon{
 		 	position:absolute;
 		 	top:0px;
 		 	left:0px;
 		 	width:20%;
 		 	height:100%;
 		 	@include flexbox();
 		 	@include align-items(center);
 		 	@include justify-content(center);
 		 	.iconbox{
 		   	width:50%;
 		   	height:50%;
 		   	@include flexbox();
 		    @include align-items(center);
 		    @include justify-content(center)
 		 	.backicon{		 		
 		 		font-size:.3rem;
 		 		color:#fff; 		
 		 	     }
               }
 		   }
 		 }
	    
	    @media screen and (max-width:321px){
		.write{ font-size:25px}
		
	}
	@media screen and (min-width:322px) and (max-width:413px){
		.write{ font-size:30px}
		
	}
     @media screen and (min-width:414px){
		.write{ font-size:35px}
		
	}
</style>