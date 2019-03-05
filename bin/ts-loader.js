#!/usr/bin/env node

/**
 * 用于支持解析 .ts 文件
 */
// 获取全局 typescript 路径, 修复运行时需要 install typescript
const ts = require.resolve("typescript");

require('ts-node').register({
    compiler: ts
});

/**
 * 主进程
 */
require('../lib/nerver-bin');

