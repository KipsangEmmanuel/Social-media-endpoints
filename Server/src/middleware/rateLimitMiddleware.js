import { rateLimit } from 'express-rate-limit'

const rateLimitMiddleware = (app) => {
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000, 
        limit: 10, 
        standardHeaders: 'draft-7', 
        legacyHeaders: false, 
    })

    app.use(limiter)
}

export default rateLimitMiddleware;