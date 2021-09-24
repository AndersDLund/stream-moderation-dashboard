import React, { useEffect, useState } from 'react';

// styles
import './App.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// components
import { FlaggedMessages } from './components/FlaggedMessages/FlaggedMessages';
import { ChannelList } from './components/ChannelList/ChannelList';
import { MessageContext } from './components/MessageContext/MessageContext';
import { MessageActions } from './components/MessageActions/MessageActions';

// services
import { ConnectionService } from './services/ConnectionService';
import { ChannelService } from './services/ChannelService';
import { ModerationService } from './services/ModerationService';

const App = () => {
  const [connectedUser, setConnectedUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(async () => {
    try {
      setup();
    } catch (error) {
      console.error(`[ERROR]: ${error}`);
    }
  }, []);

  useEffect((data) => {
    if (flagged.length > 0) {
      const active = flagged.filter(message => message.active)[0];
      const messages = flagged.filter(message => message.selected);
      const users = messages.map(message => message.user.id);
      setSelectedUsers([... new Set(users)]);
      setActiveMessage(active);
      setSelectedMessages(messages);
    }
  }, [flagged])

  const setup = async () => {
    const connectResponse = await ConnectionService.connect({ id: process.env.REACT_APP_USER_ID }, process.env.REACT_APP_USER_TOKEN);
    const channelsResponse = await ChannelService.getChannels({}, {}, {});
    const flaggedResponse = await ModerationService.getFlaggedMessages({}, {});

    setConnectedUser(connectResponse.me);
    setChannels(channelsResponse);
    setFlagged(flaggedResponse.data);
  }

  return (
    <main>
      <ChannelList channels={channels} setChannels={setChannels} setFlagged={setFlagged} />
      <FlaggedMessages flagged={flagged} setFlagged={setFlagged} />
      <MessageContext activeMessage={activeMessage} />
      <MessageActions selectedMessages={selectedMessages} selectedUsers={selectedUsers} />
    </main>
  )
}

export default App;
