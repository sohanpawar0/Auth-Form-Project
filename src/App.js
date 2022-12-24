import { Switch, Route , Redirect} from 'react-router-dom';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './components/store/auth-context';

function App() {
  const authCtx =useContext(AuthContext);//useContext is use to connect authContext and show button when user is login or not 
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        
        {!authCtx.isLoggedIn && (
        <Route path='/auth'>
          <AuthPage />
        </Route>
        )}
        {authCtx.isLoggedIn&&(
        <Route path='/profile'>
         {authCtx.isLoggedIn && <UserProfile />}
         {!authCtx.isLoggedIn && <Redirect to ='/auth' />}
        </Route>
        )}
        <Route path='*'><Redirect to='/' /></Route>
      </Switch>
    </Layout>
  );
}

export default App;
