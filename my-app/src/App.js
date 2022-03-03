import logo from './logo.svg';
import './App.css';
import SimpleContract from './SimpleContract.json';
const Web3 = require('web3');

// const web3 = new Web3('http://localhost:8545');

const simpleContract = SimpleContract;

console.log("NAME:", simpleContract.contractName);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
