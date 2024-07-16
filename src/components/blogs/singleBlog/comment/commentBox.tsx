import GravatarAvatar from "@/helpers/avatar";
import { getTimeFromUnixValue } from "@/helpers/misc";
import { useState } from "react";
import CommentForm from "./commentForm";

const CommentSingle = ({
  children,
  comment,
}: {
  children?: React.ReactNode;
  comment: any;
}) => {
  const [state, setState] = useState(0);
  return (
    <>
      <div className="media mt-4">
        <a className="pr-3" href="#">
          <GravatarAvatar email={comment?.commenter_email} size={64} />
        </a>
        <div className="media-body">
          <div className="row">
            <div className="col-8 d-flex">
              <h4 className="fw-bold m-0">{comment?.commenter_name} </h4>
              <span className="text-muted pl-2">
                -{" "}
                {getTimeFromUnixValue(
                  comment?.created_at,
                  "DD MMM, YYYY hh:mm:ss"
                )}
              </span>
            </div>
            <div className="col-4">
              <div className="pull-right reply">
                <button
                  className="btn btn-link p-0 text-decoration-underline text-capitalize font-weight-normal"
                  onClick={() => setState(state > 0 ? 0 : comment?.post_id)}
                >
                  <span>
                    <i className="fa fa-reply"></i> reply
                  </span>
                </button>
              </div>
            </div>
          </div>
          <p>{comment?.comment_text}</p>
          {children && children}
        </div>
      </div>
      {state > 0 && (
        <div className="pl-5 ml-4 mt-2">
          <CommentForm postId={comment?.post_id} commentId={comment?.id} />
        </div>
      )}
    </>
  );
};

function CommentBox({ comments }: { comments: any }) {
  const renderChildComments = (child: any) => {
    return (
      child.length > 0 &&
      child.map((item: any) => (
        <CommentSingle comment={item}>
          {item?.children &&
            item.children.length > 0 &&
            renderChildComments(item.children)}
        </CommentSingle>
      ))
    );
  };
  return (
    <div className="row">
      <div className="col-md-12">
        {comments.length > 0 &&
          comments.map((comment: any) => (
            <CommentSingle comment={comment}>
              {comment?.children &&
                comment?.children?.length > 0 &&
                renderChildComments(comment?.children)}
            </CommentSingle>
          ))}
      </div>
    </div>
  );
}

export default CommentBox;
