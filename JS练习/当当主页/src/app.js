import './css/common.css';
import Layer from './components/layer/layer.js';

const App=function () {
	var dom=document.getElementById("#app");
	var layer=new Layer();
	console.log(layer.tpl({name:"hello",arr:["hello","word"]}));
}
new App();
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);