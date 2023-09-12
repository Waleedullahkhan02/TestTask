import React, { useState } from "react";
import Reply from "./Reply";
import { ReactComponent as Like } from "../assets/images/like.svg";
import { ReactComponent as Unlike } from "../assets/images/unlike.svg";
import { ReactComponent as Dot } from "../assets/images/Rectangle.svg";

function Comment({ data, addComment, commentInteractionHandler }) {
  let [reply, setReply] = useState(false);

  return (
    <div className="comment">
      <img className="userImg" src={data?.pic} alt="profile pic" />
      <div className="block">
        <h4 className="name">{data?.name}</h4>
        <p className="text">{data?.comment}</p>
        <div className="actionGroup">
          {!!data?.likes ? (
            <Like className="heart" />
          ) : (
            <Unlike className="heart" />
          )}

          <p className="reactions">{data?.likes}</p>
          <Dot className="dot" />
          <p className="reply" onClick={() => setReply(true)}>
            Reply
          </p>
        </div>
        {<Reply commentInteractionHandler={commentInteractionHandler} addComment = {addComment} postData={data} replyState={reply} />}
      </div>
    </div>
  );
}

export default Comment;
