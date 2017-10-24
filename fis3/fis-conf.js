fis.set('project.fileType.text', 'es');
fis.set('modules.parser.es', 'babel-6.x');
fis.set('roadmap.ext.es', 'js')
fis.match('src/**.es', {
    parser: fis.plugin('babel-6.x', {
         presets: ['es2015'],
         sourceMaps: true
    }),
    isMod:true,
    useHash:true,
    isJsLike:true,
    rExt: 'js'
});


fis.match('**.ts', {
  parser: fis.plugin('typescript', {

    }),
  rExt: '.js'
});

fis.match('src/less/*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css'
})

fis.match('*.{js,css}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});


//压缩js代码。
fis.match('*.{es,ts,js}', {
  optimizer: fis.plugin('uglify-js')
});


fis.match('*.{css,less}', {
  preprocessor: fis.plugin('autoprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
})

//压缩css代码
fis.match('*.{less,css}', {
  optimizer: fis.plugin('clean-css',{

  })
})


fis.match('*.html', {
  //invoke fis-optimizer-html-minifier
  optimizer: fis.plugin('html-minifier')
});


fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});


// default media is `dev`
fis.media('dev')
  .match('*', {
    useHash: false,
    optimizer: null
  });

// extends GLOBAL config
fis.media('production');
