# Nerver

A node simple Server, create a ts(TypeScript) file, and respond your body, just like a static server or PHP.

```bash
# install nerver to your npm global
npm i nerver -g

# open a dir, just run nerver
nerver
```

Create or Edit `./xxx.ts`:

```typescript
export default (ctx) => {
    return {
        Hello: 'Nerver'
    }
}
```

visit `http://127.0.0.1:3000/xxx`, you will got `{"Hello":"Nerver"}`;

- [QA](https://github.com/BoltDoggy/nerver/wiki)
- [e.g.](https://github.com/BoltDoggy/nerver/wiki/Examples)


## ENV

```bash
port=3001 nerver
```

or

Create `.env`:

```ini
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

```
ctx.query
ctx.request.body
ctx.request.fields
ctx.request.files
ctx.cookies.get(key)
ctx.cookies.set(key, value)
```