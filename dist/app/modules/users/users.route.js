"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// users.route.ts
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
// import { upload } from '../../utils/sendImageToCloudinary';
const router = express_1.default.Router();
router.get('/', users_controller_1.UserControllers.getAllUser);
router.get('/me', (0, auth_1.default)('user', 'admin', 'vendor', 'seller'), users_controller_1.UserControllers.getMe);
router.get('/:userId', users_controller_1.UserControllers.getSingleUserById);
router.get('/my-orders/:userId', (0, auth_1.default)('user', 'admin', 'vendor', 'seller'), users_controller_1.UserControllers.getMyOrders);
// router.get('/my-posts/:authorId', auth('user', 'admin'), UserControllers.getMyPosts);
// router.put('/me', auth('user', 'admin'),
//   multerUpload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     if(req?.body?.data){
//       req.body = JSON.parse(req?.body?.data);
//     }
//     next();
//   },
// UserControllers.updateProfile);
router.delete('/remove-user/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.deleteUser);
router.put('/make-admin/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.changeUserRoleToAdmin);
router.put('/make-user/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.changeUserRoleToUser);
router.put('/suspend-user/:userId', (0, auth_1.default)('admin'), users_controller_1.UserControllers.suspendUser);
router.put('/follow/:userId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.followUser);
router.put('/unfollow/:userId', (0, auth_1.default)('user', 'admin'), users_controller_1.UserControllers.unfollowUser);
exports.userRoutes = router;
