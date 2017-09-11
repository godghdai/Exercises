require.config({
    baseUrl: 'js'　　
});
window.onload = function() {
    requirejs(['Advert','Polyfill'], function(Advert) {
        Advert("advert1",{
        	"data":[],
        	"childCount":4
        }).start();
        //Advert("advert2").start();
    });
}