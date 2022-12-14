import {useRef, useEffect} from 'react';
const useInterval = callback => {
    const savedCallback =useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      let id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, []);
  };

export default useInterval;