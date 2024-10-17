import express from 'express';
import { getAuthorizationRequests, submitAuthorizationRequest, updateAuthorizationStatus } from '../controllers/autherizationController/autherizationController';

const authRoutes = express.Router();

authRoutes.post('/', submitAuthorizationRequest);
authRoutes.get('/', getAuthorizationRequests);
//@ts-ignore
authRoutes.patch('/:id', updateAuthorizationStatus);

export default authRoutes;
