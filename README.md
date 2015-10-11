# Digital Compass Client
Client side library for building web games with the Digital Compass framework

## Installing
`npm install --save digital-compass-client`

## Usage
You'll want to create one instance of the engine and export that instance to use everywhere:
```
import { SocketEngine } from './digital-compass'

const local = {
  host: 'localhost',
  port: 3333,
  debug: true
};
let socketEngine = SocketEngine(local)

export default socketEngine
```
Save this file somewhere where you can import `socketEngine` from it easily. Now you'll import `socketEngine` in any component that wants to use digital-compass-client to interact with the backend through web sockets.


The `socketEngine` will release a state update every time the server sends new game state. You can connect a React component to listen to these state changes by doing the following:
```
import engine from '../path/to/your/socketEngine/export'

class App extends Component {
  ...
  componentWillMount() {
    engine.addStateListener(this.bindState);
    this.setState({
      gameState: engine.getState()
      });
    }

  componentWillUnmount() {
    engine.removeStateListener(this.bindState);
  }

  @autobind
  bindState {
    this.setState({
      gameState: engine.getState()
    });
  }  
  ...
}
```
Now your component's `state.gameState` field will be in sync with the game state coming back from the server.

From here, you can build out your game by using `engine's` helper methods to send out certain web sockets to interact with the backend.
