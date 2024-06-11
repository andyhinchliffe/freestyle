import React from 'react'
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true  });

// const freestyle = "";



function Generator(props) {

  const handleSubmit = async () => {
        
    
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a freestyle rap generator.",
        },
        { role: "user", content: props.question },
      ],
      model: "gpt-3.5-turbo-0125",
    
      
    });
    // console.log(completion)
    const freestyle = completion.choices[0].message.content;
    console.log(freestyle)
    
    
  }
    
    const handleClick = () => {
      console.log(props.question)
      handleSubmit()
    }



  return (
    <div>
    <button onClick={handleClick}>Generate</button>
    {/* <h1>{freestyle}</h1> */}
    </div>
  )
}

export default Generator;