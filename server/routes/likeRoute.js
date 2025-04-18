import express from 'express'
import { toggleLike,checkLike, fetchLikeCount } from '../controllers/likeControlller.js';

const route=express.Router();
route.post('/toggle',toggleLike);
route.get('/count/:blogId',fetchLikeCount);
route.get('/check/:userId/:blogId',checkLike);

export default route