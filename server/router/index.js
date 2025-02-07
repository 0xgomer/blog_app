import {Router} from "express";
import {body} from "express-validator";
import {uploadWithFilter} from "../utils/index.js";
import authController from "../controllers/auth-controller.js";
import UserController from "../controllers/user-controller.js";
import ArticleController from "../controllers/article-controller.js";
import CommentsController from "../controllers/comments-controller.js";
import PopularController from "../controllers/popular-controller.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";
import isActivatedMiddleware from "../middlewares/is-activated-middleware.js";

const router = new Router()

// Auth

router.post('/registration',
    uploadWithFilter.single('avatar'),
    body('email').isEmail(),
    body('fullName').matches(/^\p{Lu}\p{L}*\s((\p{Lu}\p{L}*)+\s)*\p{Lu}\p{L}*$/gu),
    body('password').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/),
    authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)

// User

router.get('/user', UserController.getUser)
router.patch('/user',
    uploadWithFilter.single('avatar'),
    body('email').optional().isEmail(),
    body('fullName').optional().matches(/^\p{Lu}\p{L}*\s((\p{Lu}\p{L}*)+\s)*\p{Lu}\p{L}*$/gu),
    body('password').optional().matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/),
    AuthMiddleware, UserController.editUser)

// Articles

router.post('/article',
    uploadWithFilter.single('preview'),
    AuthMiddleware, isActivatedMiddleware, ArticleController.create)
router.get('/article/all', ArticleController.getAll)
router.get('/article/one', ArticleController.getOne)
router.get('/article/my', AuthMiddleware, ArticleController.getMy)
router.get('/article/my/one', AuthMiddleware, ArticleController.getMyOne)
router.patch('/article', uploadWithFilter.single('preview'), AuthMiddleware, ArticleController.update)
router.delete('/article', AuthMiddleware, ArticleController.delete)

// Comments

router.post('/comment', AuthMiddleware, isActivatedMiddleware, CommentsController.create)
router.get('/comment', CommentsController.get)
router.delete('/comment', AuthMiddleware, isActivatedMiddleware, CommentsController.delete)

// Popular

router.get('/popular/comments', PopularController.getComments)


export default router