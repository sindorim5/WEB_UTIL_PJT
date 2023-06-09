import React, { useRef, useEffect } from "react";
import styles from "./Notification.module.css";
import { notificationSliceActions } from "../../../redux/notificationSlice";
import { useDispatch } from "react-redux";

const Notification = (props) => {
  const indicatorRef = useRef();
  const popUpRef = useRef();
  const contentWrapperRef = useRef();
  const dispatch = useDispatch();
  const duration = props.duration;

  useEffect(() => {

    if (indicatorRef.current) {
      indicatorRef.current.style.transitionProperty = "width";
      indicatorRef.current.style.transitionDuration = `${
        props.duration / 1000
      }s`;
    }

    if (popUpRef.current) {
      popUpRef.current.style.height = "0px";
      if (document.body.offsetWidth > 480) {
        popUpRef.current.style.width = `${props.width + 40}px`;
        contentWrapperRef.current.style.width = `${props.width}px`;
      } else {
        popUpRef.current.style.width = `90vw`;
        contentWrapperRef.current.style.width = `90vw`;
      }

      contentWrapperRef.current.style.height = `${props.height}px`;
      if (document.body.offsetWidth > 480) {
        popUpRef.current.style.right = `-${props.width + 20}px`;
      } else {
        popUpRef.current.style.right = `-90vw`;
      }

      popUpRef.current.style.transitionProperty = "right top height";
      popUpRef.current.style.transitionDuration = `0.3s`;
    }
    setTimeout(function () {
      popUpRef.current.style.height = `${props.height + 20}px`;
    }, 100);
    setTimeout(function () {
      indicatorRef.current.style.width = "0px";

      if (document.body.offsetWidth > 480) {
        popUpRef.current.style.right = `0px`;
      } else {
        popUpRef.current.style.right = `5vw`;
      }
    }, 400);
    setTimeout(function () {
      if (document.body.offsetWidth > 480) {
        popUpRef.current.style.right = `-${props.width + 20}px`;
      } else {
        popUpRef.current.style.right = `-90vw`;
      }
    }, duration + 300);
    setTimeout(function () {
      // if (props.passToFixed === true) {
      //     alert('fawe')
      //     dispatch(notificationSliceActions.fixedPush(JSON.stringify(props.id)))
      // }
      popUpRef.current.style.height = "0px";
    }, duration + 600);
    setTimeout(function () {
      dispatch(notificationSliceActions.delete(JSON.stringify(props.id)));
    }, duration + 900);
  }, []);

  const notiHandler = () => {
    if (document.body.offsetWidth > 480) {
      popUpRef.current.style.right = `-${props.width + 20}px`;
    } else {
      popUpRef.current.style.right = `-90vw`;
    }

    setTimeout(function () {
      popUpRef.current.style.height = "0px";
    }, 300);
    // setTimeout(function() {
    //     dispatch(notificationSliceActions.delete(JSON.stringify(props.id)))
    // }, 600);
  };

  return (
    <div
      ref={popUpRef}
      onClick={() => notiHandler()}
      className={styles["pop-up"]}
    >
      <div ref={contentWrapperRef} className={styles["content-wrapper"]}>
        <div className={styles["content"]}>{props.content}</div>
        <div ref={indicatorRef} className={styles["indicator"]} />
      </div>
    </div>
  );
};

export default Notification;
