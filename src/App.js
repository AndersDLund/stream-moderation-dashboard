import React, { useEffect, useState } from 'react';

import { StreamChat } from 'stream-chat';

// styles
import './App.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// assets
import { ReactComponent as Logo } from './assets/stream_logo.svg'

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
  // const [connectedUser, setConnectedUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([]);

  const chatClient = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    try {
      setup();
    } catch (error) {
      console.error(`[ERROR]: ${error}`);
    }
  }, []);

  useEffect((data) => {

    chatClient.on(event => {
      if (event.type === 'flagged_message') {
        const message = JSON.parse(event.content).message;

        if (flagged.indexOf(message) === -1) {
          const flaggedClone = [...flagged];
          flaggedClone.unshift({ message, user: message.user });
          setFlagged(flaggedClone);
        }
      }
    })

    if (flagged.length > 0) {
      const active = flagged.filter(message => message.active)[0];
      const messages = flagged.filter(message => message.selected);
      const users = messages.map(message => message.user.id);
      setSelectedUsers([...new Set(users)]);
      setActiveMessage(active);
      setSelectedMessages(messages);
    }
  }, [flagged, chatClient])

  const setup = async () => {
    await ConnectionService.connect({ id: process.env.REACT_APP_USER_ID }, process.env.REACT_APP_USER_TOKEN);
    const channelsResponse = await ChannelService.getChannels({}, {}, {});
    const flaggedResponse = await ModerationService.getFlaggedMessages({}, {});

    // setConnectedUser(connectResponse.me);
    setChannels(channelsResponse);
    setFlagged(flaggedResponse.data);
  }

  return (
    <main>
      <section className='logo-container'>
        <Logo />
      </section>
      <ChannelList channels={channels} setChannels={setChannels} setFlagged={setFlagged} />
      <FlaggedMessages flagged={flagged} setFlagged={setFlagged} />
      <MessageContext activeMessage={activeMessage} />
      <header>
        <h1>Stream.io Moderator Dashboard Template</h1>
      </header>
      <MessageActions selectedMessages={selectedMessages} selectedUsers={selectedUsers} flagged={flagged} setFlagged={setFlagged} />
    </main>
  )
}

export default App;
