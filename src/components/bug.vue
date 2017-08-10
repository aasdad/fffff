<template>
	<div id="app">
        <img src="logo.png">
        <h1>{{ msg }}</h1>
       
        <vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
        change qrcode url: <input type="text" ref="text">
        	<button @click="get">确认</button>
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
		            imagePath: './static/logo.png',
		            filter: 'color',
		            size: 500
		        },
		        downloadButton: false
    }
		},
		methods:{
			get () {
			 var val=this.$refs.text.value;
			 this.config.value=val;
			 console.log(this.config.value)
			}
		},
		components:{
			"vue-q-art":VueQArt
		}
		
		
		
	}
</script>

<style scoped>
	  #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>	