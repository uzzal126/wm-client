import { useGetCommentsQuery } from "@/redux-handler/api/slices/blogSlice";
import { Col, Row } from "react-bootstrap";
import CommentBox from "./commentBox";
import CommentForm from "./commentForm";

const Comments = ({ post }: { post: any }) => {
  const { data: comments, isLoading } = useGetCommentsQuery(post?.id);

  if (isLoading) return <></>;

  return (
    <>
      <Row className="mt-5 section-b-space">
        <Col sm="12">
          {comments && comments.tree && comments.tree?.length > 0 ? (
            <CommentBox comments={comments.tree} />
          ) : (
            <p className="text-center" style={{ fontSize: 20 }}>
              No comments found
            </p>
          )}
        </Col>
      </Row>
      <CommentForm postId={post?.id} />
    </>
  );
};

export default Comments;
