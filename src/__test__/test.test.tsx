import { render, screen, cleanup } from "@testing-library/react";
import LoginPage, { onLoginSubmit } from "../pages/authfalse/LoginPage";
import { ProviderWraper } from "../utils/providerWraper";
import { store } from "../redux/store";
import { setUsers } from "../redux/slices/Users/Users.slice";
import {
  addNewPost,
  addPostLike,
  setPosts,
} from "../redux/slices/Posts/Posts.slice";
import { setComments } from "../redux/slices/Coments/Coments.slice";
import { commentsAllMock, postsMock, userAllMock } from "./mocks";
import { DeleteAction } from "../components/posts/SinglePost";

test("should render login page", () => {
  render(
    <ProviderWraper>
      <LoginPage />
    </ProviderWraper>
  );
  const page = screen.getByTestId("loginpage");
  expect(page).toBeInTheDocument();
}, 100);

describe("LoginUser", () => {
  test("there should be user state", () => {
    const state = store.getState().Users;

    expect(state).not.toBeUndefined();
    store.dispatch(setUsers(userAllMock));
    const state2 = store.getState().Users;
    expect(state2.users?.length).not.toBe(0);
  });
  test("state shouldnt be 0 and should contain test user", () => {
    const state = store.getState().Users;
    expect(state).not.toBeUndefined();
    store.dispatch(setUsers(userAllMock));
    const state2 = store.getState().Users;
    expect(state2.users?.length).not.toBeUndefined();
    expect(state2.users?.length).not.toBe(0);
    expect(state.users).toContainEqual(userAllMock[0]);
  });

  test("should login user ", async () => {
    const user = await onLoginSubmit({
      allUsersData: userAllMock,
      loginForm: { email: userAllMock[0].email, password: "test" },
      next() {},
      setErrorMessage: () => {},
    });
    expect(user).not.toBeNull();
    expect(user).not.toBeUndefined();
  });
  test("should not login user ", async () => {
    const user = await onLoginSubmit({
      allUsersData: userAllMock,
      loginForm: { email: userAllMock[0].email + "fail", password: "test" },
      next() {},
      setErrorMessage: () => {},
    });
    expect(user).toBeNull();
  });
});
//#region post mock

describe("post actions ", () => {
  beforeAll(() => {
    cleanup();
  });
  // #endregion
  test("to have some posts", () => {
    const posts = store.getState().Posts;
    expect(posts.posts).toBe(null);

    store.dispatch(setPosts(postsMock));
    const postsUpdated = store.getState().Posts;
    expect(postsUpdated.posts?.length).not.toBeUndefined();
    expect(postsUpdated.posts?.length).not.toBeNaN();
  });

  test("post to have some comments", () => {
    const comments = store.getState().Comments;
    expect(comments.comment).toBe(null);

    store.dispatch(setPosts(postsMock));
    store.dispatch(setComments(commentsAllMock));
    const commentsupdated = store.getState().Comments;
    const postsUpdated = store.getState().Posts;

    const postComments = commentsupdated.comment?.filter(
      (comment) =>
        postsUpdated.posts &&
        postsUpdated.posts[0] &&
        comment.postId === postsUpdated.posts[0].id
    );
    const postLen = postComments ? postComments.length : 0;
    expect(postLen).not.toBeNaN();
  });

  test("get liked posts", () => {
    store.dispatch(setPosts(postsMock));

    const posts = store.getState().Posts;
    const likedPostsCount = posts.numberOfLikes
      ? posts.numberOfLikes?.length
      : 0;
    expect(likedPostsCount).toBe(0);
    store.dispatch(addPostLike({ postId: 1 }));

    const postsUpdated = store.getState().Posts;
    const likedPostsCountUpdated = postsUpdated.numberOfLikes
      ? postsUpdated.numberOfLikes?.length
      : 0;
    expect(likedPostsCountUpdated).toBe(1);
  });

  test("add new post", () => {
    store.dispatch(setPosts(postsMock));
    const posts = store.getState().Posts;
    const postsCount = posts.posts ? posts.posts.length : 0;
    store.dispatch(
      addNewPost({ body: "body", id: 99999, title: "title", userId: 1 })
    );
    const postsUpdated = store.getState().Posts;
    const postsCountUpdated = postsUpdated.posts?.length;
    expect(postsCountUpdated).toBe(postsCount + 1);
  });

  test("delete post", () => {
    store.dispatch(setPosts(postsMock));
    const posts = store.getState().Posts;
    expect(posts.posts).not.toBeNull();
    expect(posts.posts?.length).not.toBe(0);
    if (posts.posts) {
      const newp = DeleteAction(posts.posts[1].id, posts.posts);
      store.dispatch(setPosts(newp ? newp : []));
    }
    const newposts = store.getState().Posts;
    const postlen = posts.posts ? posts.posts.length : 0;
    const newpostlen = newposts.posts ? newposts.posts.length : 0;
    expect(postlen).toBeGreaterThan(newpostlen);
  });
});
