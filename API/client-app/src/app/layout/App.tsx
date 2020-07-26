import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import { observer } from 'mobx-react-lite';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import LibrarianManager from '../../features/Books/LibrarianManager';
import CreateBook from '../../features/Books/CreateBook';
import EditBook from '../../features/Books/EditBook';
import BookDashboard from '../../features/Books/BookDashboard';
import BookRecord from '../../features/Books/BookRecord';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/booklist' component={BookDashboard} />
                <Route path='/addBook' component={CreateBook} />
                <Route exact path='/manageBooks' component={LibrarianManager} />
                <Route exact path='/recordBook' component={BookRecord} />
                <Route key={location.key} path='/booksDetail/:id' component={EditBook} />


                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
