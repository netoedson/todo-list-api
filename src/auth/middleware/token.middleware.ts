import { Request, Response } from 'express';

export const token = async (req: Request, res: Response, next: () => Promise<unknown>): Promise<unknown> => {
    const { authorization } = req.headers;

    if (authorization) {
        const split = authorization.split(' ');
        const tokenValue = split.length === 2 && split.includes('Bearer') ? split.pop() : '';

        req.token = tokenValue;
    }

    return next();
};
