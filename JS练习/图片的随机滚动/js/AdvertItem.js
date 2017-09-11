define(["Util"], function(Util) {
    var STATUS_STOP = 0,
        STATUS_START_RUN = 1,
        STATUS_WAIT = -1;

    function AdvertItem(data,option) {
        this.id = 0;
        this.dom = null;
        this.data = data || [];
        this.from = 0;
        this.to = 0;
        this.change = 0;
        this.step = 0;
        this.direction = undefined;
        this.waitTimeOut = 2000;
        this.waitTime = 0;
        this.runTask = 0;
        this._height = 130;
    }
    AdvertItem.prototype.getId = function() {
        return this.id;
    }
    AdvertItem.prototype.onEnterFrame = function(timeline) {
        if (this.dom == null) {
            var randomIndex = Util.random(this.data.length - 1, 0);
            this.dom = this.dom || Util.$$(this.id);
            if (this.data.length > 1)
                this.dom.style.top = -randomIndex * this._height + "px";
           }
        //图片张数必需大于1
        if (this.data.length == 1) return;
        //等待计时器
        this.waitTime += timeline.getIntervel();
        if (this.waitTime > this.waitTimeOut) {
            this.runTask++;
            this.waitTime = 0;
        }

        if( this.runTask==0) return;

        if (this.direction == undefined) {
            //随机一个移动的方向
            this.direction = Math.random() < 0.8 ? "down" : "up";
            this.from = this.dom.offsetTop;
            switch (this.direction) {
                case "up":
                    if (this.from == -(this.data.length + 1) * this._height) {
                        this.dom.style.top = -this._height + "px";
                        this.from = -this._height;
                    }
                    this.change = -this._height;
                    break;
                case "down":
                    if (this.from == 0) {
                        this.dom.style.top = -(this.data.length) * this._height + "px";
                        this.from = -(this.data.length) * this._height;
                    }
                    this.change = this._height;
                    break;
            }
        }

        if (this.step > 20) {
            this.direction = undefined;
            this.step = 0;
            this.runTask--;
            this.waitTimeOut = Util.random(5000, 1000);
            return;
        }
        this.dom.style.top = this.from + this.change * this.step /20 + "px";
        this.step++;
    }
    AdvertItem.prototype.getInnerHTML = function() {
        this.id = Util.newId("AdvertItem");
        var copyData = this.data.concat();
        //开头元素复制到最后一个
        //第一个复制到结尾 实现无缝切换
        if (copyData.length > 1) {
            copyData.unshift(copyData[copyData.length - 1]);
            copyData.push(copyData[1]);
        }
        return '<div class="con">' +
            '<div class="wrap" id="' + this.id + '">' +
            copyData.map(function(item, index) {
                return '<a href="#"><img src="' + item.name + '" alt=""/></a>';
            }).join('') +
            '</div>' +
            '</div>';
    }
    return AdvertItem;
})