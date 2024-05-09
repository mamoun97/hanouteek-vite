
import ReactDOM from 'react-dom/client'

import './index.css'
import './App.css'
import App from './App.tsx'

import { store } from "./Store/";
import { Provider } from "react-redux";
// import { loadData, saveData } from './Store/localStorage.tsx';
// import ApiConfig from './Api/ApiConfig.tsx';

// console.log(loadData("version"))
// if(loadData("version")!=ApiConfig.version){
//   localStorage.clear()
//   saveData("version",ApiConfig.version )
// }
// // console.log = function () {};
// // console.error = function () {};
// // console.info = function () {};
// // console.warn = function () {};
// localStorage.clear()


ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <>
      
      <App />
    </>
  </Provider>,
)
