import { useState } from 'react'
import './App.css'
import getData from './utils/getData.js';
import { useEffect } from 'react';

const App = () => {
  const [aboutLoaded, setAboutLoaded] = useState(false);
  const [about, setAbout] = useState();

  useEffect( () => {
    getData('about/').then( json => {
      setAbout(json);
      setAboutLoaded(true);
    })
  })

  if (!aboutLoaded) {
    return (
      <>
      <h1>Welcome to Dan's iSchool Site</h1>
      <h2>Loading...</h2>
      </>
    )
  }

  return (
    <>
      <div>{about.title}</div>
    </>
  )
}

export default App;