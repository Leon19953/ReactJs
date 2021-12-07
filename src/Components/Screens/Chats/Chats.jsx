import Grid from "@mui/material/Grid";
import React, { Fragment } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../Menu/constants.js";

import { chatListSelector } from "../../Store/Chats/selectors";
import { ChatList } from "./ChatList/ChatList.jsx";
import { AddChat } from "./AddChat/AddChat.jsx";
import { MessageField } from "./MessageField/MessageField.jsx";
import { Form } from "./Form/Form.jsx";

export function Chats() {
  const chats = useSelector(chatListSelector);
  const { chatId } = useParams();

  //если чата с таким параметром не находит,то возвращает noChat == undefined
  const noChat = chats.find((chat) => chat.id === chatId);

  if (chatId && !noChat) {
    return <Redirect to={ROUTES.NO_CHAT} />;
  }

  return (
    <div className="chat">
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ height: "100%" }}
      >
        <Grid item xs={3}>
          <ChatList chatId={chatId} />
          <AddChat />
        </Grid>
        <Grid item xs={9}>
          {chatId && (
            <Fragment>
              <MessageField chatId={chatId} />
              <Form chatId={chatId} />
            </Fragment>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
