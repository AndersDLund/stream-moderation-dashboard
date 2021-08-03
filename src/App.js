import React, { useEffect, useState } from 'react';

// styles
import './App.scss';

// components
import { FlaggedMessages } from './components/FlaggedMessages/FlaggedMessages';
import { ChannelList } from './components/ChannelList/ChannelList';
import { MessageContext } from './components/MessageContext/MessageContext';

// assets
import { ReactComponent as StreamLogo } from './assets/stream_logo.svg';

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
      const selected = flagged.filter(message => message.selected);
      setActiveMessage(active);
      setSelectedMessages(selected);
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
      {/* <h1>Application: Moderation Bois!</h1> */}
      {/* Need to make components for all the sections here -- these are just placeholder for layout now */}
      <ChannelList channels={channels} setChannels={setChannels} setFlagged={setFlagged} />
      <FlaggedMessages flagged={flagged} setFlagged={setFlagged} />
      <MessageContext activeMessage={activeMessage} />
      <section className="container"></section>
      {/* <section className="logo-container">
        <StreamLogo className="stream-logo" />
      </section> */}
    </main>
  )
}

export default App;
