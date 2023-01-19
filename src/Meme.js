import React from "react"


export default function Meme() {




    const[meme,setMeme]=React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })




    const[allMemes,setAllMemes]=React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])



    function getMemeImage(){
       
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url=allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    
    }

    
    // Math.random generates a number between 0 and 1, that isn’t a whole number, and also isn’t 1.
    // To get a number, for example between 0 and 10, multiply your answer by 10: Math.random() * 10.
    // To get it to be a whole number, i.e. an integer, apply Math.floor,
    // which rounds down to the nearest whole number: Math.floor(Math.random() * 10) 
    // To get a whole number between 1 and 10, add 1 to the answer: Math.floor(Math.random() * 10 + 1)



    function handleChange(event){
        const{name,value}=event.target
        setMeme(prevMeme =>({
            ...prevMeme,
            [name]:value
        }))
    }


    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}

                />
                <button 
                    className="form-button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
            <img src={meme.randomImage} className="meme--image"/>
            <h2 className="meme--text top">{meme.topText}</h2>
             <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}