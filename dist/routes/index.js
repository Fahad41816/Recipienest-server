"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllRouters = void 0;
const express_1 = __importDefault(require("express"));
const Recipie_route_1 = require("../module/Recipies/Recipie.route");
const user_route_1 = require("../module/users/user.route");
const comment_route_1 = require("../module/comments/comment.route");
const router = express_1.default.Router();
const Routers = [
    {
        path: "/Auth",
        Api: user_route_1.UserRoute,
    },
    {
        path: "/Recipie",
        Api: Recipie_route_1.RecipeRoute,
    },
    {
        path: "/Comment",
        Api: comment_route_1.commentRouter,
    },
];
Routers.map((route) => {
    router.use(route.path, route.Api);
});
exports.AllRouters = router;
