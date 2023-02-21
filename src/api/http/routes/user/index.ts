import { Router } from "express";
import { User } from "../../../../database/Schema/User";
import { makeRoute } from "../../../../makerRequest/makeRoutes";

export const userRoutes = (): Router[] => {
  const routers: Router[] = makeRoute(User, [
    {
      name: "GetUsers",
      type: "GET_Simple",
      path: "/users",
      filter: [],
      functionPropeties: {
        requestFunction: "find",
      },
      request: "get",
    },
    {
      name: "testUser",
      type: "GET_Simple",
      path: "/test",
      filter: [
        {
          key: "name",
          getter: "query",
        },
      ],
      functionPropeties: {
        requestFunction: "findOne",
      },
      request: "post",
    },
  ]);
  return routers;
};
