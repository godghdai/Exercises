define(function() {
    var STATUS_STOP = 0,
        STATUS_RUN = 1;

    function TimeLine(interval) {
        if (!(this instanceof TimeLine)) return new TimeLine(interval);
        this.interval = interval || 1000 / 60;
        this.timer = null;
        this.listeners = [];
        this.status = STATUS_STOP;
    }
    TimeLine.prototype.getIntervel = function() {
        return this.interval;
    }
    TimeLine.prototype.start = function() {
        var self = this;
        if (this.listeners.length == 0 || this.status == STATUS_RUN) return;

        console.log('TimeLine start');
        this.status = STATUS_RUN;
        this.timer = setInterval(function() {
            for (var i = 0; i < self.listeners.length; i++) {
                self.listeners[i].onEnterFrame(self, self.listeners[i]);
            }

        }, this.interval);
        return this;
    }
    TimeLine.prototype.stop = function() {
        console.log('TimeLine stop');
        this.status = STATUS_STOP;
        clearInterval(this.timer);
        return this;
    }
    TimeLine.prototype.addListener = function(listener) {
        if ("onEnterFrame" in listener && "getId" in listener)
            this.listeners.push(listener);
        //if(this.status!=STATUS_RUN) this.start();
        return this;
    }
    TimeLine.prototype.removeListener = function(listener) {
        if (this.listeners.length == 0) return;
        var arr = this.listeners,
            findIndex = -1;;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].getId() == listener.getId()) {
                findIndex = i;
                break;
            }
        }
        if (findIndex == -1) return false;
        this.listeners = arr.slice(0, findIndex).concat(arr.slice(findIndex + 1, arr.length));
        if (this.listeners.length == 0) {
            this.status = STATUS_STOP;
            this.stop();
        }
        return true;
    }
    return TimeLine;
})