import React from "react";
import User1 from "../assets/images/user1.png";
import User2 from "../assets/images/user2.png";
import User3 from "../assets/images/user3.png";
import User4 from "../assets/images/user4.png";
import Comment from "./Comment";
import { ReactComponent as Send } from "../assets/images/send.svg";

function CommentBox() {
  /*Comments Data Format */
  const [data, setData] = React.useState([
    {
      _id: "user1",
      pic: User1,
      name: "Maria",
      comment:
        "I was very glad to have you after such a long time. Can you plan a meetup? Maybe this weekend?",
      likes: 1,

      replies: [
        {
          _id: "user4",
          pic: User4,
          name: "John Doe",
          comment: "Old rivalry! Consider me in ;-)",
          likes: 0,
        },
      ],
    },
    {
      _id: "user2",
      pic: User2,
      name: "Alex Benjamin",
      comment:
        "Home sweet home! I’m glad you are back. It’s been two year and miss the football matches we have together. A lot has been changed since you left. Let’s meet at the ground tomorrow evening? ",
      likes: 1,
      replies: [],
    },
    {
      _id: "user3",
      pic: User3,
      name: "Tania",
      comment:
        "Hey bud, welcome back to home. It’s so long to see you back again. Would love to hear the travelling stories of yours. Your or my place?",
      likes: 0,
      replies: [],
    },
  ])
  const addComment = (id, comment) => {
    const commentObj = {
      _id: Math.random().toString(16).slice(2),
      pic: User4,
      name: "John Doe",
      comment: comment,
      likes: 0,
    }
    const tempData = [...data]
    tempData.map(({ _id, replies }) =>
      id === _id && replies.push(commentObj)
    )
    setData(tempData)
  }

  const commentInteractionHandler = (status, commentId, postId) => {
    alert(status)
    const tempData = [...data];
    switch (status) {
      case 'removed':
        const filteredArray = data.map(item => ({
          ...item,
          replies: item.replies.filter(reply => reply._id !== commentId),
        }));
        setData(filteredArray)
        break;
      case 'like':
        setData(prevComments => {
          return prevComments.map(comment => {
            return {
              ...comment,
              replies: comment.replies.map(reply => {
                if (reply._id === commentId) {
                  return {
                    ...reply,
                    likes: reply.likes + 1,
                  };
                }
                return reply;
              }),
            };
          });
        });
        break;
      case 'dislike':
        setData(prevComments => {
          return prevComments.map(comment => {
            return {
              ...comment,
              replies: comment.replies.map(reply => {
                if (reply._id === commentId) {
                  return {
                    ...reply,
                    likes: reply.likes - 1,
                  };
                }
                return reply;
              }),
            };
          });
        });
        break;
      default:
    }
  }

  return (
    <div className="container">
      <div className="commentBox">
        <h2 className="header">Comments</h2>
        {!!data?.length &&
          data?.map((value) => (
            <Comment commentInteractionHandler={commentInteractionHandler} addComment={addComment} key={"COMMENT" + value?._id} data={value} />
          ))}
        {/* Key Index must be unique for User data */}

        <div className="comment">
          <input
            className="text"
            type="text"
            placeholder="Write your comment"
          />
          <Send className="send" />
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
