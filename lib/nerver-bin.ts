import { cwd, env } from 'process';
import Path from 'path';

import Dotenv from 'dotenv';
import Koa from 'koa';
import KoaStatic from 'koa-static';

import { reImport } from './util';

const CWD = process.cwd();

Dotenv.config({ path: Path.resolve(CWD, '.env') });

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.url);
    try {
        if (Path.extname(ctx.url) !== '.ts') {
            await next();
        }
    } catch (err) {
        console.log(err);
    }
});

app.use(KoaStatic(CWD));

app.use(async (ctx) => {
    const truePath = Path.join(CWD, `${ctx.url}.ts`);
    return reImport(truePath).then(mod => mod.bind(this)(ctx))
});

app.listen(env.port || 3000);

console.log(`Nerver on http://127.0.0.1:${env.port || 3000}`);
