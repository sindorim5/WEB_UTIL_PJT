import React from "react";
import PostCardItem from "../UI/PostCard/PostCardItem";
import FeedCardItem from "../UI/FeedCard/FeedCardItem";
import styles from "./UserPageResponsive.module.css";

const UserPageResponsive = (props) => {
  return (
    <React.Fragment>
      <div className={styles["pc"]}>
        <PostCardItem
          id={props.id}
          thumbnail={props.thumbnail}
          title={props.title}
          content={props.content}
          likeStatusSize={props.likeStatusSize}
          likeStatus={props.likeStatus}
          bookmarkStatus={props.bookmarkStatus}
          profileImg={props.profileImg}
          nickname={props.nickname}
          createdDate={props.createdDate}
          tagList={props.tagList}
        />
      </div>
      <div className={styles["mobile"]}>
        <FeedCardItem
          id={props.id}
          thumbnail={props.thumbnail}
          title={props.title}
          contents={props.content}
          likeStatusSize={props.likeStatusSize}
          likeStatus={props.likeStatus}
          bookmarkStatus={props.bookmarkStatus}
          profileImg={props.profileImg}
          nickname={props.nickname}
          createdDate={props.createdDate}
          tagList={props.tagList}
          bookmarkTab={props.bookmarkTab}
          myNickname={props.myNickname}
        />
      </div>
    </React.Fragment>
  );
};

export default UserPageResponsive;
