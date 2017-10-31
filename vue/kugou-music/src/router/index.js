import Vue from 'vue';
import Router from 'vue-router';

import index from 'components/index';
import songNew from 'components/song-new';
import songTop from 'components/song-top';
import songList from 'components/song-list';
import songListDetail from 'components/song-list-detail';
import singerCategory from 'components/singer-category';

import songTopDetail from 'components/song-top-detail';
import singerList from 'components/singer-list';
import singerDetail from 'components/singer-detail';
import search from 'components/search';

Vue.use(Router);

export default new Router({
      linkActiveClass: 'active',
      routes: [
        { path: '/', redirect: '/index/songNew' },
        {
          path: '/index',
          component: index,
          children: [{
              path: 'songNew',
              component: songNew
            },
            {
              path: 'songTop',
              component: songTop
            },
            {
              path: 'songList',
              component: songList
            },
            {
              path: 'singerCategory',
              component: singerCategory
            }
          ]
        },
        {
          path: '/songListDetail/:id',
          name: 'songListDetail',
          component: songListDetail
        },
        {
          path: '/songTopDetail/:id',
          name: 'songTopDetail',
          component: songTopDetail
        },
        {
          path: '/singerDetail/:id',
          name: 'singerDetail',
          component: singerDetail
        },
         {
          path: '/singerList/:id',
          name: 'singerList',
          component: singerList
        },
         {
          path: '/search',
          name: 'search',
          component: search
        }]
      });
