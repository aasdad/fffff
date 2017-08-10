<template>
	<div class="server">
		<vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
	</div>
	
	
</template>

<script>
	import VueQArt from 'vue-qart';
	export default {
		data () {
			 return {
		        msg: 'Welcome to Your Vue.js App',
		        config: {
		            value: 'https://www.baidu.com',
		            imagePath: './examples/assets/logo.png',
		            filter: 'color'
		        },
		        downloadButton: false
             }
		},
		components:{
			"vue-q-art":VueQArt
		}
		
		
		
	}
</script>

<style>
	
	
	
</style>