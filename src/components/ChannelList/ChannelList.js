import React, { useEffect, useState } from "react";
import "./ChannelList.scss";
import { StreamChat } from "stream-chat";
import { ModerationService } from "../../services/ModerationService";

const key = process.env.REACT_APP_API_KEY;
const chatClient = StreamChat.getInstance(key);

const filter = { members: { $in: ["Ryan"] } };
const sort = { last_message_at: -1 };

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
    chatClient.queryChannels(filter, sort, {}).then((res) => {
      setChannels(res);
    }, []);

    ModerationService.getFlaggedMessages(cidFilter, {}).then((res) => {
      setFlagged(res.data);
    });
  };

  const updateInputValue = (cidInput) => {
    setChannelID(cidInput);
  };

  return (
    <section className="container channel-list-container">
      <div className="search-container">
        <input onChange={(e) => updateInputValue(e.target.value)}></input>
        <button onClick={(e) => updateChannelList()}>GO</button>
      </div>
      <ul>
        {channels.map((channel) => (
          <li>
            <p>{channel.id}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
