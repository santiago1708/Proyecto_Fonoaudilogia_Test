import { rateLimit } from 'express-rate-limit'

export const Limiter = rateLimit({ 
    windowMs: 60 * 1000,
    limit: 10,
    message: {
        error: 'Has alcanzado el límite de peticiones, intenta de nuevo más tarde'
    }
})