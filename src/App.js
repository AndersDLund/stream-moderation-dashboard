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

const App = () => {
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {

    ConnectionService.connect({ id: process.env.REACT_APP_USER_ID }, process.env.REACT_APP_USER_TOKEN).then((res) => {
      setConnectedUser(res.me);
    }).catch(err => console.error(`[ERROR]: ${err}`));

  }, []);

  return (
    <main>
      <h1>Application: Moderation Bois!</h1>
      {/* Need to make components for all the sections here -- these are just placeholder for layout now */}
      <ChannelList />
      <FlaggedMessages />
      <section className="container"></section>
      <section className="container"></section>
      <section className="logo-container">
        <StreamLogo className="stream-logo" />
      </section>
    </main>
  )
}

export default App;
