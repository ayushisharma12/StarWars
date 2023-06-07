import './App.css';
import ErrorComponent from './Component/ErrorComponent';
import StarWars from './Component/StarWarsSearch/StarWars';

function App() {
  return (
    <div className="App">
      <ErrorComponent>
        <StarWars/>
      </ErrorComponent>
    </div>
  );
}

export default App;
