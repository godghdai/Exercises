require.config({
    baseUrl: 'js'　　
});

window.onload = function() {
    requirejs(['Advert'], function(Advert) {
        new Advert().init();
    });
}