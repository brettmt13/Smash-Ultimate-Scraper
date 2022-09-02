import logo from './logo.svg';
import Banner from './Banner';
import Stat from './Stat';
import weight from './Data';

function App() {
  return (
      <div>
          <Banner />
          <h1 className="statTitle">Weight</h1>
          {weight.map((name, num) => (
              <Stat Name={name[1]} Num={num + 1} />
          ))}
      </div>     
  );
}

export default App;
