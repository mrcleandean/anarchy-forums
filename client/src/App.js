import './maincss/App.css';
import React from 'react';
import Header from './components/Header/Header';
import UnderHeader from './components/UnderHeader/UnderHeader';
import UserTools from './components/UserTools/UserTools';
import Filters from './components/Filters/Filters';
import CreatePost from './components/CreatePost/CreatePost';
import Posts from './components/Posts/Posts';
import IconTooltip from './components/IconTooltip/IconTooltip';
import SoftAlert from './components/SoftAlert/SoftAlert';
function App() {
  const [refresh, setRefresh] = React.useState({
    boolean: false,
    rule: 'initial'
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filter, setFilter] = React.useState('newest');
  function refreshFunc(rule) {
    setRefresh({
      boolean: !refresh.boolean,
      rule
    });
  };
  return (
    <div className="App">
      <Header />
      <IconTooltip />
      <UnderHeader />
      <UserTools refreshFunc={refreshFunc} refresh={refresh} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters refreshFunc={refreshFunc} refresh={refresh} filter={filter} setFilter={setFilter} />
      <CreatePost refreshFunc={refreshFunc} refresh={refresh} setSearchQuery={setSearchQuery} filter={filter} setFilter={setFilter} />
      <Posts refreshFunc={refreshFunc} refresh={refresh} searchQuery={searchQuery} filter={filter} setFilter={setFilter} />
      <SoftAlert />
    </div>
  );
}

export default App;
