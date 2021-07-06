import React, { useEffect, useState } from 'react';

// styles
import './App.scss';

// components
import { FlaggedMessages } from './components/FlaggedMessages/FlaggedMessages';
import { ChannelList } from './components/ChannelList/ChannelList';

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

  useEffect(async () => {
    try {
      setup();
    } catch (error) {
      console.error(`[ERROR]: ${error}`);
    }
  }, []);

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
      <h1>Application: Moderation Bois!</h1>
      {/* Need to make components for all the sections here -- these are just placeholder for layout now */}
      <ChannelList />
      <FlaggedMessages flagged={flagged} setFlagged={setFlagged} />
      <section className="container"></section>
      <section className="container"></section>
      <section className="logo-container">
        <StreamLogo className="stream-logo" />
      </section>
    </main>
  )
}

export default App;
