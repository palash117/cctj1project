import logo from './logo.svg';
import './App.css';
import Test from './components/Test.js'
import Page from './components/Page'
import React, {useState} from 'react'

function App() {
 //let [mode, setMode]=useState('home')
 let [mode, setMode]=useState('wordlist')
 let [selectedCategories, setCategories] = useState([])
 let setHomeMode =()=> { 
     setMode('home')
 }
 let setCategoriesMode =()=> { 
     setMode('categories')
 }
 let setWordlistMode =()=> { 
     setMode('wordlist')
 }
  return (
    <div className="App">
      <Taskbar setHomeMode={setHomeMode} setWordlistMode={setWordlistMode} setCategoriesMode={setCategoriesMode}/>
      <Page mode={mode} selectedCategories={selectedCategories} setCategories={setCategories} setWordlistMode={setWordlistMode} setCategoriesMode={setCategoriesMode}></Page>
    </div>
  );
}
function Taskbar({setCategoriesMode, setWordlistMode, setHomeMode}){
    return (
        <div className="TaskBar">
            <div  onClick ={setHomeMode} className="TaskBarItem">
                Home
            </div>
        
            <div onClick ={setCategoriesMode} className="TaskBarItem">
                Categories 
            </div>
        
            <div onClick ={setWordlistMode} className="TaskBarItem">
                Word list 
            </div>
        
        </div>
    )
}

export default App;
