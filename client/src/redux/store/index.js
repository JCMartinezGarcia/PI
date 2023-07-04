//*Importar createStore y applyMiddleware from redux*/
import { createStore, applyMiddleware } from 'redux';
//* import thunk from redux-thunk */
import thunk from 'redux-thunk';
//**import reducer */
import rootReducer from '../reducer/index';
//**import compose */
import { compose } from 'redux';
//? // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//**create the store */
//? // esta línea es para poder hacer peticiones a un server
export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

//export default store;


