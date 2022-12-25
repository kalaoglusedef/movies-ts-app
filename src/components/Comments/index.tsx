import "./index.css";

interface CommentsProps {
  comment: string[];
}

const Comments: React.FC<CommentsProps> = ({ comment }) => {
  return (
    <div className="commentsContainer">
      {comment.length > 0 ? (
        <div className="col-md-6 col-md-offset-6 p-30 text-center bg-white">
          <h4 style={{ color: "#89030a" }} className="mb-50 fw-bold">
            Comments
          </h4>
          <ul className="timeline">
            {comment.map((x) => {
              return (
                <li className="timeline-inverted">
                  <div className="timeline-badge"></div>
                  <div className="timeline-panel">
                    <div className="timeline-body">
                      <p>{x}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
export default Comments;
