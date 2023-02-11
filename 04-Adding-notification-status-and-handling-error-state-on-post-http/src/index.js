import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
// provide redux store to entire application
root.render(<Provider store={store}><App /></Provider>);
