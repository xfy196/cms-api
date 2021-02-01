/**
 * gzip的中间件
 * @author 小小荧
 */
const isJSON = require("koa-is-json")
const zlib = require("zlib")

module.exports = (options, app) => {
    return async function gzip(ctx, next) {
        await next();

        let body = ctx.body;
        if (!body) {
            return;
        }
        if (options.threshold && ctx.length < options.threshold) {
            return;
        }
        if (isJSON(body)) {
            body = JSON.stringify(body);
        }
        // 设置gzip的body修正响应头
        const stream = zlib.createGzip();
        stream.end(body)
        ctx.body = stream;
        ctx.set("Content-Encoding", "gzip")
    }
}