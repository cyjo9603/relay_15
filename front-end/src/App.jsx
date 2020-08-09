import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyPage from './components/MyPage';
import Main from './components/Main';
import { MemberContextProvider } from './contexts/MemberContext';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{ 
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: 'yg-jalnan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'MapoPeacefull';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;
function App() {
  return (
    <MemberContextProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/main/:email" render={(props) => <Main {...props} />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/mypage" component={MyPage} />
        </Switch>
      </Router>
    </MemberContextProvider>
  );
}

export default App;
