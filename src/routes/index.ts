import express from 'express'
import { RecipeRoute } from "../module/Recipies/Recipie.route";
import { UserRoute } from "../module/users/user.route";
import { commentRouter } from '../module/comments/comment.route';

const router = express.Router()

const Routers = [
  {
    path: "/Auth",
    Api: UserRoute,
  },
  {
    path: "/Recipie",
    Api: RecipeRoute,
  },
  {
    path: "/Comment",
    Api: commentRouter,
  },
];

Routers.map((route) => {
    router.use(route.path, route.Api);
});


export const AllRouters = router