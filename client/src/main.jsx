import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Container from './pages/container';

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);
