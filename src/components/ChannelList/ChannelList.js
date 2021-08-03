import React, { useEffect, useState } from "react";
import "./ChannelList.scss";
import { StreamChat } from "stream-chat";
import { ModerationService } from "../../services/ModerationService";

const key = "xfyrhz6nwwxz";
const chatClient = StreamChat.getInstance(key);
const userId = "Ryan";
// const token = chatClient.createToken(userId);
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUnlhbiJ9.JaI1xNZ0b2taG04F_dNQHcU6kjpVgxf1hd5vLLKe72I";
// chatClient.connectUser({ id: userId }, userToken);
const filter = { members: { $in: ["Ryan"] } };
const sort = { last_message_at: -1 };
let filterValue = "";

export const ChannelList = (props) => {
  // use effect variables
  // const [channels, setChannels] = useState([])
  const [channelID, setChannelID] = useState("");
  // other variables
  const { channels, setChannels, setFlagged } = props;

  // functions
  useEffect(() => {
    chatClient.queryChannels(filter, sort, {}).then((res) => {
      setChannels(res);
    });
  }, []);

  const updateChannelList = () => {
    const filter = { id: channelID };
    const cidFilter = { channel_cid: "messaging:" + channelID };
    // const cidFilter = { channel_cid: "messaging:austin"}
    // console.log(newFilter)
    chatClient.queryChannels(filter, sort, {}).then((res) => {
      setChannels(res);
    }, []);

    ModerationService.getFlaggedMessages(cidFilter, {}).then((res) => {
      //    console.log(res.data)
      setFlagged(res.data);
    });
  };

  const updateInputValue = (cidInput) => {
    setChannelID(cidInput);
  };

  return (
    <section className="container">
      <input onChange={(e) => updateInputValue(e.target.value)}></input>
      <button onClick={(e) => updateChannelList()}>Search</button>
      <ul>
        {channels.map((channel) => (
          <li>{channel.id}</li>
        ))}
      </ul>
    </section>
  );
};
