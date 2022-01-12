import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//in 21.5.4 we updated this to the auth link
// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// In 21.3 we had to update
// function App() {
//   return (
//     <div className='flex-column justify-flex-start min-100-vh'>
//       <Header />
//       <div className='container'>
//         <Home />
//       </div>
//       <Footer />
//     </div>
//   );
// }

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Switch>
        <Route exact path="/" component={Home}  />
        <Route exact path="/login" component={Login}  />
        <Route exact path="/signup" component={Signup}  />
        <Route exact path="/profile/:username?" component={Profile}  />
        <Route exact path="/thought/:id" component={SingleThought}  />
        
        <Route component={NoMatch}/>
        </Switch>
      </div>
      <Footer />
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
