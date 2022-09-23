import Banner from './Banner';
import Stat from './Stat';
import weight from './Data';
import './App.css';

function App() {
  return (
      <div className="structure">
          <Banner />
          <div className="strip">
              <h1>Weight</h1>
          </div>
          {weight.map((name, num) => (
              <Stat Name={name[0]} Num={num + 1} Stat={name[1]} />
          ))}

      </div>     
  );
}

export default App;
