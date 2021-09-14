import React from "react";
import { useSelector } from "react-redux";
import Notificacao from "../Notificacao";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const NoticacaoWrapper = () => {
  const { notificationData } = useSelector((state) => state.inventorySlice);

  return (
    <TransitionGroup
      className="fixed flex space-x-5"
      style={{
        left: "17vw",
        bottom: "5vh",
      }}
    >
      {notificationData?.map((noti, index) => (
        <CSSTransition key={index} timeout={100} classNames="item-noti">
          <Notificacao noti={noti} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default NoticacaoWrapper;
