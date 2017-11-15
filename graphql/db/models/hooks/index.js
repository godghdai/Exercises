var _TotalDic={};
module.exports = {
    hooks: {
        beforeBulkCreate: function() {},
        beforeFind: function(options) {
            //console.log(options)
            //console.log(fun)
        },
        afterFind: function(instance, options) {
            _TotalDic[options.tableNames[0]]= (_TotalDic[options.tableNames[0]]||0)+1;
            console.log(_TotalDic);
        },
        beforeValidate: [
            function() {},
            function() {}
        ]
    }
}