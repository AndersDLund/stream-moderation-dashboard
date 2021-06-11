import './App.scss';

// components
import { FlaggedMessages } from './components/FlaggedMessages/FlaggedMessages';
import { ChannelList } from './components/ChannelList/ChannelList';

//assets
import { ReactComponent as StreamLogo } from './assets/stream_logo.svg';

const App = () => {
  return (
    <main>
      <header>
        <h1>Application: Moderation Bois!</h1>
      </header>
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
