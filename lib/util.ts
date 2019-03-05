// export const getNerverPath = () => __dirname;

export const reImport = async (path:string) => {
    delete require.cache[require.resolve(path)];
    return import(path).then((mod) => mod.default || mod);
};
