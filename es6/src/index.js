import fs from 'fs';
//import Test from './ex';
//console.log(Test)

/*
async function init() {
    let result = await new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve("hello");
        }, 100)
    });
    console.log(result);
}

init();
*/


const isArray = (arr) => {
    return Array.isArray(arr) ? arr : [arr];
}

/**
 * 格式化路径,添加 '/'
 * @param path 路径
 */
const normalizePath = (path) => {
    if (!path.startsWith('/')) {
        path = `/${path}`
    }
    return path;
};

require("./control");

const { _DecoratedRouters, SymbolRoutePrefix } = require("./decorator");


//遍历静态属性_DecoratedRouters
for (let [config, controller] of _DecoratedRouters) {
    let controllers = isArray(controller);
    let prefixPath = config.target[SymbolRoutePrefix];
    if (prefixPath) {
        prefixPath = normalizePath(prefixPath);
    }
    //拼接api路由
    let routerPath = prefixPath + config.path;
    console.log(routerPath)
        //遍历追加方法
        //this.router[config.method](routerPath, ...controllers);
}