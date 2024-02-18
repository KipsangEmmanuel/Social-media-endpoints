import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './src/utils/loggers.js'
import userRouter from './src/routes/usersRoutes.js';
import cors from 'cors'
import rateLimitMiddleware from './src/middleware/rateLimitMiddleware.js';
import postRouter from './src/routes/postsRoutes.js';
import photoRouter from './src/routes/photosRoutes.js';
import commentRouter from './src/routes/commentRoutes.js';
import groupRouter from './src/routes/groupRoutes.js';
import eventRouter from './src/routes/eventRoutes.js';
import messageRouter from './src/routes/messageRoutes.js';
import friendshipRouter from './src/routes/friendshipRoutes.js';

const app=express();

dotenv.config();
const PORT=process.env.PORT || 5000

app.use(cors())

// Middlewares should come before the apis|routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
rateLimitMiddleware(app);

app.use('/api/v1',userRouter)
app.use('/api/v1',postRouter)
app.use('/api/v1',photoRouter)
app.use('/api/v1',commentRouter)
app.use('/api/v1',groupRouter)
app.use('/api/v1',eventRouter)
app.use('/api/v1',messageRouter)
app.use('/api/v1',friendshipRouter)



app.listen(PORT,()=>{
    logger.info(`server running on port : ${PORT}`);
})

