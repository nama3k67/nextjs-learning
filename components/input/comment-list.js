import classes from "./comment-list.module.css";

const CommentList = ({ items }) => {
  const renderCommentList = () =>
    items.map((item) => (
      <li key={item._id}>
        <p>{item.text}</p>
        <div>
          By <address>{item.name}</address>
        </div>
      </li>
    ));

  return <ul className={classes.comments}>{renderCommentList()}</ul>;
};

export default CommentList;
