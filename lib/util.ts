// export const getNerverPath = () => __dirname;

function delCache(path:string) {
    require.cache[path] && require.cache[path].children.forEach((mod:NodeModule) => {
        if (mod.id.indexOf('/node_modules/') === -1) {
            delCache(mod.id);
        }
    });
    delete require.cache[path];
}

export const reImport = async (path:string) => {
    delCache(require.resolve(path));
    return import(path).then((mod) => mod.default || mod || (() => {}));
};

export const isFun = (ele:any) => typeof ele === 'function';
