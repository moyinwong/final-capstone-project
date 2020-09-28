import React, { useState } from 'react'


const QuestionCreatePage = () => {
    const [inputList, setInputList] = useState<any[]>([{ question0: ''}]);
 
    // handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        console.log(e.target.value)
      const { name, value } = e.target;
      const list: any[] = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = (index:number) => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = (index: number) => {
        const  object:any = {}
        object[`question${index}`] = ''
      setInputList([...inputList, object]);
    }; 
   
    return (
      <div className="App">
        <h3><a href="https://cluemediator.com">Clue Mediator</a></h3>
        {inputList.map((input, i) => {
          return (
            <div className="box">
              <input
                name={`question${i}`}
                placeholder="Enter question"
                value={input.question}
                onChange={e => handleInputChange(e, i)}
              />
              <div className="btn-box">
                {inputList.length !== 1 && <button
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}>Remove</button>}
                {inputList.length - 1 === i && <button onClick={() => handleAddClick(i)}>Add</button>}
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
      </div>
    );
}

export default QuestionCreatePage
