import React, { useState } from "react";
import { clear } from "console";
import { useParams } from "react-router-dom";

interface IQuestion {
    questionNum: number; 
    value: string; 
    choices: Array<Object>;
}
const QuestionCreatePage = () => {
  const param: { lessonName: string } = useParams();
  const courseName = param.lessonName;
  const [inputList, setInputList] = useState<IQuestion[]>([{ questionNum: 0, value: "", choices: [] }]);

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(inputList[index]);
    const { name, value } = e.target;
    const list: IQuestion[] = [...inputList];
    inputList[index].value = value;
    //list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    for (let i = 0; i < list.length; i++) {
        if (i > index) {
            list[i].questionNum -= 1;
        }
    }
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (index: number) => {
    const obj: IQuestion = {
      questionNum: index + 1,
      value: "",
      choices: [],
    };
    setInputList([...inputList, obj]);
  };

  const handleAddChoice = (index:number) => {
      const questionAnswer = (document.getElementById(`multiple-choice${index}`) as HTMLInputElement).value
      let radio = document.getElementsByName(`answer${index}`) as NodeListOf<HTMLInputElement>;
      const questionObject: any = {}
      for (let i = 0; i < radio.length; i++) {
        if(radio[i].checked) {
            questionObject[questionAnswer] = radio[i].value
        }
      }
        
      const list = [...inputList];
      list[index].choices.push(questionObject)
      setInputList(list)
  }

  const clearInputField = (index:number) => {
    const questionAnswer = (document.getElementById(`multiple-choice${index}`) as HTMLInputElement)
    questionAnswer.value = ''
    let radio = document.getElementsByName(`answer${index}`) as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < radio.length; i++) {
        radio[i].checked = false;
    }
  }

  const handleSubmit = async () => {



      const queryRoute = '/lesson/creation/question'
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${queryRoute}/${courseName}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputList)
      })
  }

  return (
    <div className="App">
      <h3>
        建立練習問題
      </h3>
      {inputList.map((input, i) => {
        return (
          <div className="box" style={{marginTop: '20px'}}>
            <input
              name={`question${i}`}
              placeholder="Enter question"
              value={input.value}
              onChange={(e) => handleInputChange(e, i)}
            />


            <input id={`multiple-choice${i}`} placeholder='Enter choice'/>

            <label htmlFor="true">True</label>
            <input id={`true${i}`} type="radio" name={`answer${i}`} value="true" />
            <label htmlFor="false">False</label>
            <input id={`false${i}`} type="radio" name={`answer${i}`} value="false" />

            <button onClick={() => {
                handleAddChoice(i)
                clearInputField(i)
                }}>Add Choice</button>

            {input.choices.map((choice, index) => 
            <div>
                <span>{index}: </span>
                <span>{Object.keys(choice)[0]} </span>
                <span>{(choice as any)[Object.keys(choice)[0]]}</span>
            </div>)}
            <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}

              {inputList.length - 1 === i && (
                <button onClick={() => handleAddClick(i)}>Add</button>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList, null, '\t')}</div>
      <button type='submit' onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};

export default QuestionCreatePage;
