import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import ListadoSocios from './pages/Socios/ListadoSocios';
import NewSocio from './pages/Socios/NewSocio';
import EditSocio from './pages/Socios/EditSocio';
import ListadoPagos from './pages/Pagos/ListadoPagos';
import NewPago from './pages/Pagos/NewPago';
export const rootPath ='/Gym';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Switch>
          <Route path={'/Login'}>
            <Login></Login>
          </Route>
          <Route path={rootPath + '/Socios/EditSocio/:id'}>
            <EditSocio></EditSocio>
          </Route>
          <Route path={rootPath + '/Socios/NewSocio'}>
            <NewSocio></NewSocio>
          </Route>
          <Route path={rootPath + '/Socios'}>
            <ListadoSocios></ListadoSocios>
          </Route>
          <Route path={rootPath + '/Pagos/NewPago'}>
            <NewPago></NewPago>
          </Route>
          <Route path={rootPath + '/Pagos'}>
            <ListadoPagos></ListadoPagos>
          </Route>
         

        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
