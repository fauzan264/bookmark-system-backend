import { Hono } from "hono";
import { ApplicationVariable } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { User } from "@prisma/client";
import { CreateBookmarkRequest, RemoveBookmarkRequest, UpdateBookmarkRequest } from "../model/bookmark-model";
import { BookmarkService } from "../service/bookmark-service";

const bookmarkController = new Hono<{ Variables: ApplicationVariable }>();
bookmarkController.use(authMiddleware);

bookmarkController.get('/bookmarks', async (c) => {
    const user = c.get('user') as User;
    const response = await BookmarkService.list(user);

    return c.json({ data: response });
});

bookmarkController.post('/bookmarks', async (c) => {
    const user = c.get('user') as User;
    const request = await c.req.json() as CreateBookmarkRequest;
    const response = await BookmarkService.create(user, request);

    return c.json({ data: response });
});

bookmarkController.get('/bookmarks/:bookmark_id', async (c) => {
    const user = c.get('user') as User;
    const bookmarkId = Number(c.req.param("bookmark_id"));

    const response = await BookmarkService.getById(user, bookmarkId);
    
    return c.json({ data: response });
});

bookmarkController.delete('/bookmarks/:bookmark_id', async (c) => {
    const user = c.get('user') as User;
    const request: RemoveBookmarkRequest = {
        id: Number(c.req.param('bookmark_id'))
    };
    const response = await BookmarkService.remove(user, request);

    return c.json({ data: response });
});

bookmarkController.put('/bookmarks/:bookmark_id', async (c) => {
    const user = c.get('user') as User;
    const bookmarkId = Number(c.req.param("bookmark_id"));

    const request = await c.req.json() as UpdateBookmarkRequest;
    request.id = bookmarkId;
    const response = await BookmarkService.update(user, request);
    
    return c.json({ data: response });
});

export { bookmarkController };
