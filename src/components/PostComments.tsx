import { $userStore } from "@clerk/astro/client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useAuth,
} from "@clerk/astro/react";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FunctionComponent,
} from "react";

interface Comment {
  id: number;
  text: string;
  createdAt: string;
  username: string;
  userId: string;
}

type DisplayComment = Omit<Comment, "createdAt"> & {
  createdAt: Date;
};

export const PostComments: FunctionComponent<{
  slug: string;
  commentServer: string;
}> = (props) => {
  const [comments, setComments] = useState<DisplayComment[] | undefined>(
    undefined
  );
  const [commentValue, setCommentValue] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const auth = useAuth();
  const user = useSyncExternalStore(
    $userStore.listen,
    $userStore.get,
    $userStore.get
  );

  const createComment = async (text: string) => {
    setSubmitting(true);
    const token = await auth.getToken();
    await window.fetch(`${props.commentServer}/comment/${props.slug}`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCommentValue("");
    setSubmitting(false);
    await fetchComments();
  };

  const fetchComments = async () => {
    const response = await window.fetch(
      `${props.commentServer}/comment/${props.slug}`
    );
    const respJson = (await response.json()) as Comment[];
    const displayComments = respJson.map((c) => ({
      ...c,
      createdAt: new Date(c.createdAt),
    }));
    setComments(displayComments);
  };

  const deleteComment = async (id: number) => {
    const token = await auth.getToken();
    await window.fetch(`${props.commentServer}/comment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [props.slug, props.commentServer]);
  return (
    <>
      <div className="divider">Comments</div>
      {comments?.length === 0 && (
        <p>
          No comments yet! <SignedOut>Sign in to be the first.</SignedOut>
        </p>
      )}
      <ul className="list-none pl-0 not-prose mb-5 flex flex-col gap-2">
        {comments?.map((c) => (
          <li
            key={c.id}
            className="flex flex-col border-2 border-accent/20 bg-accent/2 rounded-md p-2"
          >
            <p>{c.text}</p>
            <span className="flex gap-2 text-sm">
              <span>- {c.username}</span>
              <span>{c.createdAt.toLocaleString()}</span>
              {c.userId === auth.userId && (
                <button
                  type="button"
                  className="btn btn-xs"
                  onClick={() => deleteComment(c.id)}
                >
                  Delete
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
      <SignedOut>
        <div className="flex justify-center">
          <SignInButton>
            <button type="button" className="btn btn-primary">
              Sign in to comment.
            </button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <form className="flex flex-col gap-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Leave a comment | signed in as {user?.username}{" "}
              <SignOutButton>
                <button type="button" className="btn btn-xs self-end">
                  Sign out
                </button>
              </SignOutButton>
            </legend>
            <textarea
              className="textarea h-24 w-full"
              value={commentValue}
              onChange={(evt) => setCommentValue(evt.target.value)}
            ></textarea>
          </fieldset>
          <div className="flex justify-between items-center">
            <span className="opacity-50">{commentValue.length} / 1000</span>
            <button
              type="button"
              className="btn btn-accent"
              disabled={submitting || commentValue.length > 1000}
              onClick={() => createComment(commentValue)}
            >
              Save
            </button>
          </div>
        </form>
      </SignedIn>
    </>
  );
};
