import React, { useState } from "react";
import * as Icons from "./Icons";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MainUserInfo.module.css";
import { userAuthSliceActions } from "../../redux/userAuthSlice";
import { ACCESS_TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";
import DropDown from "../UI/DropDown/DropDown";
import { useEffect } from "react";
import { getMyData } from "../../api/UserProfile/getMyData";

const UserIconExec = (props) => {
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);

  const userImage = (
    <div className={styles["user-image-wrapper"]}>
      <img className={styles["user-image"]} src={props.imageUrl} />
    </div>
  );

  const anonymous = (
    <div className={styles["user-image-wrapper"]}>{Icons.user}</div>
  );

  return (
    <React.Fragment>
      {userAuth.authenticated ? userImage : anonymous}
    </React.Fragment>
  );
};

export const UserIcon = (props) => {
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getMyData().then((res) => {
      setUserData(() => res);
    });
  }, [userAuth?.currentUser?.imageUrl]);

  return (
    <React.Fragment>
      {userData !== null && (
        <UserIconExec
          key={`${userAuth?.currentUser?.imageUrl}`}
          imageUrl={
            userData === null
              ? userAuth?.currentUser?.imageUrl
              : userData?.imageUrl
          }
        />
      )}
    </React.Fragment>
  );
};

export const CurrentUser = (props) => {
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);

  const requiredLogin = <div className={styles["label"]}>로그인</div>;

  const userName = (
    <div className={styles["label"]}>
      <b>{userAuth.authenticated ? userAuth.currentUser.nickname : null}</b>님
      환영합니다!
    </div>
  );

  return (
    <React.Fragment>
      {userAuth.authenticated ? userName : requiredLogin}
    </React.Fragment>
    // {userAuth.authenticated ? userName : requiredLogin}
  );
};

export const UserDockWrapper = (props) => {
  const userAuth = useSelector((state) => state.userAuthSlice.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(userAuthSliceActions.changeAuthenticated("false"));
    dispatch(userAuthSliceActions.changeCurrentUser(null));
    navigate("/login");
  };

  const navigateLogin = () => {
    navigate("/login");
  };

  const navigateProfile = () => {
    navigate("/profile");
  };

  const dropDownItems = {
    label: ["로그아웃", "마이프로필"],
    function: [handleLogout, navigateProfile],
  };

  const [dropDownState, setDropDownState] = useState(false);

  return (
    <div
      onClick={() => {
        userAuth.authenticated ? setDropDownState(true) : navigateLogin();
      }}
    >
      {props.children}
      <DropDown
        dropDownItems={dropDownItems}
        dropDownState={dropDownState}
        setDropDownState={setDropDownState}
        marginLeft={"-20px"}
        width={"260px"}
        direction={"up"}
        conditionalRender={props.isMouseOn}
      />
    </div>
  );
};
