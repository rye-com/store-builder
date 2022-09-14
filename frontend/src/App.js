import ReactGA from 'react-ga';

import { OperatorToast } from 'components';
import { DataContextProvider, ToastContextProvider } from 'context';
import { AuthContextProvider } from 'context/AuthContext';
import MainRoute from 'routes/Main';
import { identify } from 'utils';
import { GA_TRACKING_ID, GA_USER_ID } from 'config';
import './App.scss';
import { GraphQLProvider } from 'gql/client';

identify();
window.heap.clearEventProperties();
ReactGA.initialize(GA_TRACKING_ID, {
  gaOptions: {
    userId: GA_USER_ID,
  },
});

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <ToastContextProvider>
          <DataContextProvider>
            <GraphQLProvider>
              <OperatorToast />
              <MainRoute />
            </GraphQLProvider>
          </DataContextProvider>
        </ToastContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
