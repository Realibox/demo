const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const route = require('koa-route');
const socket = require('koa-websocket');
const Alloter = require('./controls/Alloter');
const bodyParse = require('koa-bodyparser')

const alloter = new Alloter();
const config = require('./core/config');
const staticMiddle = static(path.join(__dirname));


app = new Koa();
app = socket(app);
app.use(async (ctx, next) => {
    await next();
    console.log('query', ctx.request.query)
    console.log('body', ctx.request.body)

});

app.use(staticMiddle);
app.use(bodyParse());

app.use(route.get('/', (ctx) => alloter.main(ctx)));
app.use(route.get('/projects', (ctx) => alloter.getProjects(ctx)));
app.use(route.get('/project', (ctx) => alloter.getProjectData(ctx)));
app.use(route.post('/detail', (ctx) => alloter.updateGoodDetail(ctx)));
app.use(route.get('/detail', (ctx) => alloter.getGoodDetail(ctx)));
app.use(route.post('/api_token', (ctx) => alloter.setToken(ctx)));




app.listen('5000');
console.log('listening 5000')


// app.ws.use(route.all('/socket', function (ctx) {
//   // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
//   // the websocket is added to the context on `ctx.websocket`.
//   sockctx = ctx;
//   //ctx.websocket.send('Hello World');
//   ctx.websocket.on('message', function(message) {
//     // do something with the message from client
//         console.log(message);
//   });
// }));