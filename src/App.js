import React, {useState} from 'react';
import './styles/style.css';
import {useInfiniteScroll} from './services/useInfiniteScroll'

function App() {
  const [scrolled, setScrolled] = useState({
    height: null,
    top: null,
    win: null,
    offset: null,
  });

  const handleScroll = (e) => {
    let scrollHeight = e.target.scrollHeight;
    let scrollTop = e.target.scrollTop;
    let winHeight = window.innerHeight;
    let offSet = e.target.offsetHeight;

    if (e.target.scrollHeight || e.target.scrollTop || window.innerHeight) {
      setScrolled({
        ...scrolled,
        height: scrollHeight,
        top: scrollTop,
        win: winHeight,
        offset: offSet,
      });
    }
  };

  const data = useInfiniteScroll(scrolled, 'measurements')

  return (
    <div className="contentScroll" onScroll={handleScroll}>
      {data.length > 0 && data.map(values => (
        <ul>
          <li>
            <strong>Valor</strong> {values.value}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default App;
