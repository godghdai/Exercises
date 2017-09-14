require.config({
	baseUrl: 'js',　　
    paths: {　　　　　　
        "jquery": "lib/jquery-3.2.1"
    }　　
});
requirejs(['jquery','ToolBar',"Polyfill"], function($,ToolBar ) {
     $(function() {
     	ToolBar().init();
     });
});







