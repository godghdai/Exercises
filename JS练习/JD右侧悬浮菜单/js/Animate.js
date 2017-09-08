define(['jquery', 'Tween'], function($, TWEEN) {
    function Animate(target, to, time, callback) {
        if (!(this instanceof Animate)) return new Animate(target, to, time, callback);
        this._from = null;
        this._to = to;
        this.target = $(target);
        this.tween = null;
        this.time = time;
        this.callback=callback||null;
        this.init();
    }
    Animate.prototype.init = function() {
        var target = this.target,
            _to = this._to,
            _from = this._from = {},
            time = this.time;
        for (var attr in _to) {
            _from[attr] = parseInt(target.css(attr));
        }

        function update() {
            target.css({ left: _from.left });
            //target.style.top = _from.y + 'px';
            //console.log(_from.left)
        }
        var tween = this.tween = new TWEEN.Tween(_from)
            .to(_to, time)
            .easing(TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(update);
        this.callback && tween.onComplete(this.callback);
        tween.start();

        function run(time) {

            requestAnimationFrame(run);
            TWEEN.update(time);
        }
        run();
    }
    return Animate;
});