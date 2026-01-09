import { RequestHandler } from 'express';
import { forbidden } from '../errors/httpErrors.js';

type Role = 'teacher' | 'student';

export const requireRole = (...allowedRoles: Role[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) {
      throw forbidden('Authentication required');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw forbidden(`Access denied. Required role: ${allowedRoles.join(' or ')}`);
    }

    next();
  };
};
