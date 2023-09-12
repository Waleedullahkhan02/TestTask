import { ReactComponent as Like } from "../assets/images/like.svg";
import { ReactComponent as Unlike } from "../assets/images/unlike.svg";
import { ReactComponent as Dot } from "../assets/images/Rectangle.svg";
import { ReactComponent as Send } from "../assets/images/send.svg";
import React from "react";

function Reply({commentInteractionHandler, addComment ,postData, replyState }) {
  const [comment, setComment] = React.useState('')
  const { replies: data, _id } = postData;
  const addCommentHandler = () => {
    addComment(_id,comment)
    setComment("")
  }
  return (
    <>
      {!!data?.length &&
        data?.map((value) => (
          <div className="comment" key={"REPLY" + value?.id}>
            {/* Key Index must be unique for User data */}
            <img className="userImg" src={value?.pic} alt="profile pic" />
            <div className="block">
              <h4 className="name">{value?.name}</h4>
              <p className="text">{value?.comment}</p>
              <div className="actionGroup">
                {!!value?.likes ? (
                  <Like className="heart" onClick={() => commentInteractionHandler('dislike',value._id, _id)} ></Like>
                ) : (
                  <Unlike className="heart" onClick={() => commentInteractionHandler('like',value._id, _id)}></Unlike>
                )}

                <p className="reactions">{value?.likes}</p>
                <Dot className="dot" />
                <p className="reply" style={{ color: "#E33E38" }} onClick={() => commentInteractionHandler('removed',value._id, _id)} >
                  Remove
                </p>
              </div>
            </div>
          </div>
        ))}

      {(!!replyState || !!data?.length) && (
        <div className="comment">
          <input
            className="text"
            type="text"
            placeholder="Write your comment"
            onChange={(event) => setComment(event.target.value)}
          />
          <Send className="send" onClick={addCommentHandler} />
        </div>
      )}
    </>
  );
}
export default Reply;
