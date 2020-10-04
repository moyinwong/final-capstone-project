import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './QuestionCreatePage.scss'
import { Button } from "@material-ui/core";
import { Badge } from "react-bootstrap";

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
    // list[index][name] = value;
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

  // handle add choice button
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

  // clear question and uncheck radio field
  const clearInputField = (index:number) => {
    const questionAnswer = (document.getElementById(`multiple-choice${index}`) as HTMLInputElement)
    questionAnswer.value = ''
    let radio = document.getElementsByName(`answer${index}`) as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < radio.length; i++) {
        radio[i].checked = false;
    }
  }

  // handle submit
  const handleSubmit = async () => {
      const queryRoute = '/lesson/creation/question';
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${queryRoute}/${courseName}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputList)
      });
      const result = await res.json();
  }

  return (
    <div className="question-create-container">
      <h3>
        建立練習問題
      </h3>

      {inputList.map((input, i) => {
        return (
          <div className="box" >
            <div>
                <input
                    className="text-input-question"
                    name={`question${i}`}
                    placeholder="輸入問題題目"
                    value={input.value}
                    onChange={(e) => handleInputChange(e, i)}
                />
            </div>


            <div>
                <input 
                    className="text-input-choice" 
                    id={`multiple-choice${i}`} 
                    placeholder='輸入問題選項'
                />

                <div className="radio-truefalse">
                    <label htmlFor="true">啱</label>
                    <input id={`true${i}`} type="radio" name={`answer${i}`} value="true" />
                    <label htmlFor="false">錯</label>
                    <input id={`false${i}`} type="radio" name={`answer${i}`} value="false" />
                </div>
            </div>


            <div>
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => {
                        handleAddChoice(i)
                        clearInputField(i)
                    }}>
                        增加答案選項
                </Button>

                {input.choices.map((choice, index) => 
                <Badge className="badge-answer">
                    <span>{index + 1}: </span>
                    <span>{Object.keys(choice)[0]} </span>
                    <span>{(choice as any)[Object.keys(choice)[0]] === 'true' ? '啱': '錯'}</span>
                </Badge>)}
                <div className="btn-box">
                    {inputList.length !== 1 && (
                        <Button
                            className="button-remove"            
                            variant="contained"
                            color="secondary" 
                            onClick={() => handleRemoveClick(i)}
                        >
                            移除
                        </Button>
                    )}

                    {inputList.length - 1 === i && (
                        <Button           
                            variant="contained"
                            color="primary" 
                            onClick={() => handleAddClick(i)}
                        >
                            增加問題
                        </Button>
                    )}
                </div>

            </div>
          </div>
        );
      })}

      <Button
        href="/instructor"
        id="submit-button"
        size="large" 
        type='submit' 
        onClick={() => handleSubmit()}
      >
        提交
      </Button>
    </div>
  );
};

export default QuestionCreatePage;
