import React, { useState } from 'react';
import Child from './Child.js';

function Parent() {
  const [myState, setMyState] = useState('Hello from Parent');

  return (
    <div>
      <Child myStateProp={myState} />
    </div>
  );
}
export default Parent;