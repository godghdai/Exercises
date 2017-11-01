"use strict";window.NewsListCase=window.NewsListCase||{},window.NewsListCase.components=window.NewsListCase.components||{};var inlineWebp="data:image/webp;base64,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",TEMPLATE='<div class="selector-container"><div class="option-list"><div class="option" @click="type=1">最热新闻</div><div class="option" @click="type=2">最新新闻</div><div class="option" @click="type=3">附近新闻</div><div class="option" @click="showMask=true">下载app</div></div><template v-if="type === 1"><div class="hot-news"><template v-for="item in hotNewsData"><div class="hot-news-item"><div class="hot-news-item-title">{{item.title}}</div><div class="hot-news-item-content"><img :src="item.image" /></div></div></template></div></template><template v-else-if="type === 2"><div class="lastest-news"><div class="lastest-news-item"><div class="lastest-news-item-title">墨尔本发生劫持人质事件 警方击毙劫持者</div><div class="lastest-news-item-content"><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2806459891,6604429&fm=173&s=CD406886C14A2CE666D899180300C001&w=218&h=146&img.JPEG" /><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2808613921,18845132&fm=173&s=DEB404C64D33BADA144C48B803001003&w=218&h=146&img.JPEG" /><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2810767951,31085835&fm=173&s=2DE50B8E0852A4D680C4D8A903003000&w=218&h=146&img.JPEG" /></div></div></div></template><template v-else="type === 3"><div class="near-news"><div class="near-news-item"><div class="near-news-item-title">任性女司机高速路倒车，惨遭大货车“砍首”，这下长记性了</div><div class="near-news-item-content"><img src="https://ss0.bdstatic.com/9bA1vGba2gU2pMbfm9GUKT-w/timg?searchbox_feed&size=f660_370&quality=120&wh_rate=0&imgtype=0&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=b4b06d2aa878b0549f812eb6e462ca4f&src=http%3A%2F%2Fbos.nj.bpc.baidu.com%2Fv1%2Fmediaspot%2F07eb39f2717765f5cd93a46819430a8f.jpeg" /></div></div></div></template><div class="downloadApp" v-show="showMask" @click="showMask=false"><img src="'+inlineWebp+'" /></div></div></template>';window.NewsListCase.components.NewList={template:TEMPLATE,data:function(){return{showMask:!1,type:1,scrolling:!1,hotNewsData:[{title:"镜头下：世界各地小偷行窃瞬间，看到最后一张我笑哭了",image:"https://ss0.bdstatic.com/9bA1vGba2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=120&wh_rate=0&size=f648_364&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=d2fce00eea90aca8c923e90183754e8a&src=http%3A%2F%2Ft10.baidu.com%2Fit%2Fu%3D3077957088%2C2725281143%26fm%3D175%26s%3D818B93574ED321DE0D1499070300F043%26w%3D640%26h%3D360%26img.JPEG"},{title:"当一个摄影师患上色盲症，他拍出的照片是什么样的",image:"https://ss0.bdstatic.com/9bA1vGba2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=120&wh_rate=0&size=f648_364&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=f5a7d67e763e7690d7c836784a5735af&src=http%3A%2F%2Ft11.baidu.com%2Fit%2Fu%3D2202736171%2C1506348745%26fm%3D175%26s%3DAAD22EC14E33BEDC5CFD45170300C0C2%26w%3D661%26h%3D370%26img.JPEG"},{title:"老版《倚天屠龙记》里的“赵敏”，在家里死了3天，却没有人知道",image:"https://ss0.bdstatic.com/9bA1vGba2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=120&wh_rate=0&size=f648_364&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=d455c6334ed97974b0ee6f57da5ece7a&src=http%3A%2F%2Ft10.baidu.com%2Fit%2Fu%3D1226991411%2C164132089%26fm%3D175%26s%3DE6B055CBC65324744D08AD3803008042%26w%3D444%26h%3D249%26img.PNG"},{title:"吴镇宇9岁儿子费曼近照，胖到认不出，左眼角疤痕明显惨成断眉",image:"https://ss0.bdstatic.com/9bA1vGba2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=120&wh_rate=0&size=f648_364&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=14659e73f60e53dbadadd91f361acced&src=http%3A%2F%2Ft10.baidu.com%2Fit%2Fu%3D2821969698%2C1790614101%26fm%3D175%26s%3D703B17D70A1337D6D0144DB30300F04A%26w%3D660%26h%3D370%26img.JPEG"}]}},created:function(){var t=this;this.$on("windowScrollEnd",function(){t.scrolling===!1&&(t.scrolling=!0,t.renderMoreData(),t.$nextTick(function(){t.scrolling=!1}))})},methods:{renderMoreData:function(){var t=[{title:"金雕活捉草原狼， 准确击中目标要害部位",image:"https://ss0.bdstatic.com/9bA1vGba2gU2pMbfm9GUKT-w/timg?searchbox_feed&size=f660_370&quality=120&wh_rate=0&imgtype=0&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=49e29e766464c2668ba59aa29b46bf10&src=http%3A%2F%2Fbos.nj.bpc.baidu.com%2Fv1%2Fmediaspot%2F1f9510bf5c5077fb19335325432eaa67.png"},{title:"传说中只有“土豪”才敢吃的美食——切糕",image:"https://ss0.bdstatic.com/9bA1vGfa2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=120&wh_rate=0&size=f648_364&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=ccc69039de31a5ec4f4ede4ea8eac32d&src=http%3A%2F%2Ft10.baidu.com%2Fit%2Fu%3D2363281557%2C59271533%26fm%3D175%26s%3D9E117687408058F01D3B116A0300E018%26w%3D660%26h%3D370%26img.JPEG"},{title:"老赌徒坚信麻将不能作弊，反赌赌王现场演示揭秘",image:"https://ss0.bdstatic.com/9bA1vGba2gU2pMbfm9GUKT-w/timg?searchbox_feed&size=f660_370&quality=120&wh_rate=0&imgtype=0&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=8e1605444817c5525f5d3a21c91ba2a4&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fmda-gjmbztnjn4uz3ssx.jpg"}];this.hotNewsData=this.hotNewsData.concat(t)}},mixins:[window.NewsListCase.mixins.scrollEndMixin]};