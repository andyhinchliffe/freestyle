"use client"
import React, { useEffect } from 'react'
import OpenAI from "openai";
import { useState } from "react";



const myAPIKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

const openai = new OpenAI({ apiKey: myAPIKey });

export default function Home() {

  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");
  const [thirdWord, setThirdWord] = useState("");
  const [freestyle, setFreestyle] = useState("freestyle");
  const [question, setQuestion] = useState("");
  // const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

  
  
  const handleGenerate = () => {

    setQuestion("write a rap verse of less than 100 words in a 90s east coast style , at the end of each rhyming couplet include the words "+firstWord+" and "+secondWord+" and "+thirdWord+" make sure each word is used at the end of the line after the line including the word they are rhymed with") 
    console.log(question)
  }

  useEffect(() => {
    handleGenerate();
  }, [firstWord, secondWord, thirdWord]);

  
  

  const handleSubmit = async () => {
        
    setIsLoading(true);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a freestyle rap generator.",
        },
        { role: "user", content: question },
      ],
      model: "gpt-3.5-turbo-0125",
    
      
    });
    console.log(completion)
    setFreestyle(completion.choices[0].message.content);
    setIsLoading(false);
  }
  
 
  console.log(firstWord)
  console.log(secondWord)
  console.log(thirdWord)
  return (<>
  
  <div className="h-screen  bg-no-repeat bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1581548708095-7158f2e63857?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
  <div className="mx-auto  w-72">
  <h1 className="text-grey-400 text-2xl pt-4 font-bold">Freestyle Rap Generator</h1>
    
    <input type="text" placeholder="First Word"  onChange={(e) => setFirstWord(e.target.value)} className="mt-6 mx-auto input input-bordered w-full max-w-xs" />
    <input type="text" placeholder="Second Word"  onChange={(e) => setSecondWord(e.target.value)} className="mt-10 mx-auto input input-bordered w-full max-w-xs" />
    <input type="text" placeholder="Third Word"  onChange={(e) => setThirdWord(e.target.value)} className="mt-10 mx-auto input input-bordered w-full max-w-xs" />
    <button className="btn glass w-full mt-10"  onClick={(e) => {handleGenerate();
       
      // console.log(question);
      handleSubmit();
  }}
    
    >Generate</button>
    {isLoading? <span className="loading loading-bars loading-lg ml-32 mt-2 text-white"></span> : null}
    <textarea className="textarea textarea-bordered text-mx h-screen mt-6 w-full"  placeholder={freestyle}></textarea>
    
    
    </div>
    </div>
    
  </>
  );
}
