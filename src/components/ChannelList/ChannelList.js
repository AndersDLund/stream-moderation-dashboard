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

  const updateChannelList = (input) => {
    // const filter = { id: channelID };
    const filter = { name: { $autocomplete: input } };
    // const cidFilter = { channel_cid: "messaging:" + input };
    // const cidFilter = { channel_cid: {$in: []} };
    chatClient.queryChannels(filter, sort, {}).then((res) => {
      setChannels(res);

      const channelCIDS = res.map(channel => channel.cid);
      console.log(channelCIDS);
      const cidFilter = { channel_cid :{$in:[channelCIDS]}};

      ModerationService.getFlaggedMessages(cidFilter, {}).then((res) => {
        setFlagged(res.data);
      }).catch(err => console.log(err, 'WHAT THE HECK'))
    }, []);

    // ModerationService.getFlaggedMessages(cidFilter, {}).then((res) => {
    //   setFlagged(res.data);
    // });
  };

  const updateInputValue = (cidInput) => {
    setChannelID(cidInput);

    setTimeout(() => {
      if (cidInput.length > 0) {
        updateChannelList(cidInput)
      } else {
        clear();
      }
    }, 1000);
  };

  const clear = () => {
    Promise.all([ModerationService.getFlaggedMessages({}, {}), chatClient.queryChannels(filter, sort, {})]).then((res) => {
      setFlagged(res[0].data);
      setChannels(res[1]);
    });
  }

  const selectChannel = (channel) => {
    ModerationService.getFlaggedMessages({ channel_cid: channel.cid }, {}).then((res) => {
      console.log(res);
      setFlagged(res.data);
      setChannels([channel])
    });
  };

  return (
    <section className="container channel-list-container">
      <div className="search-container">
        <input onChange={(e) => updateInputValue(e.target.value)}></input>
        {/* <button onClick={(e) => updateChannelList()}>GO</button> */}
      </div>
      <ul>
        {channels.map((channel, i) => (
          <li key={i} onClick={() => selectChannel(channel)}>
            <p>{channel.id}</p>
          </li>
        ))}
      </ul>
      <button className='clear-search-button' onClick={() => clear()}>clear</button>
    </section>
  );
};
