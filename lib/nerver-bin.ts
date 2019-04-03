import FS from 'fs';
import Path from 'path';
import { cwd, env } from 'process';

import Dotenv from 'dotenv';
import Koa from 'koa';
import KoaCors from '@koa/cors';
import KoaBetterBody from 'koa-better-body';
import KoaStatic from 'koa-static';

import { version } from '../package.json';
import { reImport, isFun } from './util';

const CWD = cwd();

Dotenv.config({ path: Path.resolve(CWD, '.env.local') });
Dotenv.config({ path: Path.resolve(CWD, '.env') });

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.path);
    try {
        if (Path.extname(ctx.path) !== '.ts') {
            await next();
        }
    } catch (err) {
        console.error(err);
    }
});

/**
 * 允许跨域
 */
app.use(KoaCors({ credentials: true }));

/**
 * 静态资源
 */
app.use(KoaStatic(CWD));

app.use(KoaStatic(Path.resolve(__dirname, '..', 'static')));

/**
 * 解析 post body
 */
app.use(KoaBetterBody());

app.use(async (ctx, next) => {
    const truePath = Path.join(CWD, `.nerver.config.ts`);
    const ret = FS.existsSync(truePath);
    if (ret) {
        return reImport(truePath)
            .then(mod => isFun(mod) && mod.bind(this)(ctx, next) || next())
            .catch((err) => {
                next();
                return Promise.reject(err);
            })
    } else {
        return next();
    }
});

app.use(async (ctx) => {
    const truePath = Path.join(CWD, `${ctx.path}.ts`).replace('/.ts', '/index.ts');
    return reImport(truePath)
        .then(mod => isFun(mod) && mod.bind(this)(ctx))
        .then((req) => {
            // 用于支持 return
            if (!ctx.body) {
                ctx.body = req;
            }
        });
});

app.listen(env.port || 3000);

console.log(`Nerver Version: ${version}`);
console.log(`Nerver Mode: ${env.mode || 'default'}`);
console.log(`Nerver on http://127.0.0.1:${env.port || 3000}`);
