const Router = require('koa-router');
const { resolve } = require('path');
const glob = require('glob');
export const SymbolRoutePrefix = Symbol('prefix');

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

export class Route {
    constructor(app, apiPath) {
        this.app = app;
        this.apiPath = apiPath;
        this.router = new Router()
    }

    init() {

    }

    /**
     * 注册路由
     * const router = new Route(opt);
     * router.registerRouters();
     */
    registerRouters() {
        //载入api接口,使用sync同步载入
        glob.sync(path.join(this.apiDirPath, './*.js')).forEach((item) => require(item));
        //遍历静态属性_DecoratedRouters
        for (let [config, controller] of Route._DecoratedRouters) {
            let controllers = isArray(controller);
            let prefixPath = config.target[SymbolRoutePrefix];
            if (prefixPath) {
                prefixPath = normalizePath(prefixPath);
            }
            //拼接api路由
            let routerPath = prefixPath + config.path;
            //遍历追加方法
            this.router[config.method](routerPath, ...controllers);
        }
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }

}


export const _DecoratedRouters = new Map();

export const controller = (path) => {
    return (target) => {
        target.prototype[SymbolRoutePrefix] = path;
        target["__hello"] = path;
    }
}

export const router = (config) => {
    return (target, name, value) => {
        config.path = normalizePath(config.path);
        //设置静态值
        _DecoratedRouters.set({
            target: target,
            ...config
        }, target[name])
    }
}

export const get = (path) => {
    return router({
        method: 'get',
        path: path
    })
}

export const post = (path) => {
    return router({
        method: 'post',
        path: path
    })
}