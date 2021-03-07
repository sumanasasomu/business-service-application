import React from 'react';
import './App.css';

import Form1 from 'screens/Form1';

// const linking = {
//   prefixes: ['https://localhost:3000'],
//   config: {
//     screens: {
//       Form1: '',
//       Form2: '/form2',
//     }
//   },
// };

function App(props) {
  return (
    <Form1 {...props}/>
  );
}

export default App;
