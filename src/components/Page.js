import React, {useState} from 'react'
import {dict, categories} from '../words.js'
function Page({mode, selectedCategories, setCategories, setCategoriesMode, setWordlistMode}){
    

    return (
        <div className="Page">
        {mode=='categories'&&
        <Categories selectedCategories={selectedCategories} setCategories={setCategories} setWordlistMode={setWordlistMode}/>
        }
        {mode=='wordlist'&&
        <WordList selectedCategories={selectedCategories} setCategoriesMode={setCategoriesMode}/>
        }
        {mode=='home'&&
        <HomePage/>
        }
        </div>
    )

}


function Word({jstring, estring, contributer, nextHandler, prevHandler, showEnglishfirst, imglink}){
    let [flashModeOn , setFlashMode] = useState(true)
    let [cardFlipped , flipCard] = useState(!showEnglishfirst)

    let toggleFlashMode = ()=>{setFlashMode(v=>{return !v})}
    console.log("imglink is ", imglink)

    return (
        <div className="Word">
            <div className="Word-actions ">
        {/*<div className="Word-action" onClick={toggleFlashMode}>Flash</div>*/}
                {flashModeOn&&
                <div className="Word-action HighlightOnClick" onClick={toggleFlashMode}>Show</div>}

                { false&&!flashModeOn && <div className="Word-action translucent2x"> <i class="fa-solid fa-repeat"></i></div>}
                { flashModeOn && <div className="Word-action" onClick={()=>{flipCard(v=>{return !v})}}> <i class="fa-solid fa-repeat"></i></div>}
            </div>
            <div className="Word-left HighlightOnClick">
                {prevHandler&&<div className="Word-prev " onClick={prevHandler}>{'<'}  </div>
                }
            </div>
            {flashModeOn &&
            <div className="Word-message ">
                
                {false &&cardFlipped &&
                    <span className="translucent animate">にほんご</span>
                }
                {cardFlipped &&
                    <span className="animate">{jstring}</span>
                }
                {false&&!cardFlipped &&
                    <span className="translucent">えいご</span>
                }
                {!cardFlipped &&
                    <span className="animate">{estring}</span>
                }
    
            </div>
            }
            
            { imglink && 
                    <img max-width="80%" max-height="70%" className="Word-image" src={imglink} />
            }
            {!flashModeOn &&
            <div className="Word-message">
                
                <span className="animate">{jstring}</span>
                <span className="animate">{estring}</span>
    
            </div>
            }
            <div className="Word-right HighlightOnClick">
                {nextHandler&&<div className="Word-next " onClick={nextHandler}>{'>'}  </div>

                }
            </div>
            <div className="Word-name animate">
                <span className="translucent">{contributer}</span>
            </div>
        </div>
    )
}

function WordList({selectedCategories, setCategoriesMode}){
   
    let[showEnglishfirst, setEnglishFirst] = useState(false)

    let words = dict.filter(v=>{
        if(!selectedCategories)return true;
        return selectedCategories.map(c=>v.categories.includes(c)).reduce((a,b)=>a&&b,true)

    })
    //words =words.filter(w=>w.imglink!="");
    console.table(words)
    debugger
    const [index, setIndex] = useState(0)

    let incrIndex = ()=>{
            setIndex((ind)=>{
                if (ind==words.length-1){
                    return 0;
                }
                return ind+1;
            })
    }

    let decrIndex = ()=>{
            setIndex((ind)=>{
                if (ind==0){
                    return  words.length-1;
                }
                return ind-1;
            })
    }
    let w = words[index]

    return (
        <div className="WordList">


        <div className="Words-flags"> 
            <span>Show english first </span>
            <div class="switch" onClick={()=>setEnglishFirst(v=>!v)}>
                <input type="checkbox" checked={showEnglishfirst} />
                <span class="slider round"></span>
            </div>
        </div>
        <div className="WordList-categories">
        <span> {selectedCategories&&selectedCategories.length>0?selectedCategories.join(', '):"No categories selected"}</span>
        <div className="Word-action HighlightOnClick" onClick={setCategoriesMode}><i class="fas fa-edit"></i></div>
        </div>
        { 
            words && words.length>0?
        <Word showEnglishfirst={showEnglishfirst} imglink={w.imglink} jstring={w.jstring} estring={w.estring} contributer={w.contributer} nextHandler={incrIndex} key={w.jstring} prevHandler={decrIndex}/>
        :
        <span>No words found for selected categories</span>
        }

        </div>
    )
}

function Categories({setCategories, selectedCategories , setWordlistMode}){
    categories.sort()
    console.log(" setCategories , selectedCategories", selectedCategories)
    
    let checkedMap = {};
    selectedCategories?.map(v=>checkedMap[v]=true)
    let updateCategory = (v)=>{
        console.log("v is ", v)
        setCategories(cats=>{
            if( cats.indexOf(v)==-1){
                return [...cats,v]
            }
            return cats.filter(c=>c!=v);
        })
    }

    console.log("rerendered")

    return (<div className="Categories">
        
        {categories.map(v=>{return (
            <div className="category">
            <span>{v}</span>
            <input type="checkbox" onChange={()=>updateCategory(v)} id={v} name={v} value={v} key={v} label={v} checked={checkedMap[v]}/>
            </div>
        )})}


                <div className="Category-apply HighlightOnClick" onClick={setWordlistMode}>apply</div>
        </div>)
}



function HomePage(){
    return (
        <div className="animate">
        <h1>CCTJ1</h1>
        {/*
         teacher
        */}
        <div className="teacher">
          <span> TAUGHT BY  </span>
            
           <h3>せんせい Preet Vidyanand</h3> 
        </div>
        <div className="students">
           <span>STUDENTS</span>
            <br/>
            <br/>
            <h4>Palash Sarkar </h4>
            <h4>Mandan</h4>
            <h4>Ashutosh</h4>
            <h4>Manisha</h4>
            <h4>Kiratana</h4>
            <h4>Soumya</h4>
            <h4>Nishanth</h4>
            <h4>Harshada</h4>
        </div>


        </div>
    )
}


export default Page
