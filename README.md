# Nerver

A node simple Server, create a ts(TypeScript) file, and respond your body, just like a static server or PHP.

```
npm i nerver -g
nerver
```

Create or Edit `./xxx.ts`:

```
export default (ctx) => {
    ctx.body = {
        Hello: 'Nerver'
    }
}
```

visit `http://127.0.0.1:3000/xxx`, you will got `{"Hello":"Nerver"}`;


## ENV

```
port=3001 nerver
```

or

Create `.env`:

```
port=3001
```

## Static Server

Any static file, but `*.ts` and `.*`.

```
/index.html => got `/index.html` or `/index.html.ts`
/any.json => got `any.json` or `any.json.ts`
/any.jpg => got `any.jpg` or `any.jpg.ts`
...
/any.ts => got `Not Found`
/.env => got `Not Found`
```

## ctx

Just a koa context - https://koajs.com/#context
