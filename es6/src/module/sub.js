export let A=123;

export function test(){
  console.log('test');
}

export class Hello{
  test(){
    console.log('class');
  }
}

export default function(msg){
	console.log(msg)
}