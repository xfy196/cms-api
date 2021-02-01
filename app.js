module.exports = app => {
    //服务启动的监听，一般可以里面初始化websocket 
    app.once("server", server => {
        // 初始化的时候可以绑定一些对象
    })
    // 异常错误监听器
    app.on("error",(err, ctx) => {
        ctx.body = {
            err
        }
    })
    // 请求拦截器
    app.on("request", ctx => {

    })
    // 响应拦截器
    app.on("response", ctx => {
    })
}