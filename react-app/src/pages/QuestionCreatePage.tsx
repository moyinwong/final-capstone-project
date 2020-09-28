import React, { useState } from "react";

const QuestionCreatePage = () => {
  const [inputList, setInputList] = useState<
    { questionNum: number; value: string }[]
  >([{ questionNum: 0, value: "" }]);

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    const list: { questionNum: number; value: string }[] = [...inputList];
    inputList[index].value = value;
    //list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (index: number) => {
    const obj: { questionNum: number; value: string } = {
      questionNum: index,
      value: "",
    };
    setInputList([...inputList, obj]);
  };

  return (
    <div className="App">
      <h3>
        <a href="https://cluemediator.com">Clue Mediator</a>
      </h3>
      {inputList.map((input, i) => {
        return (
          <div className="box">
            <input
              name={`question${i}`}
              placeholder="Enter question"
              value={input.value}
              onChange={(e) => handleInputChange(e, i)}
            />
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
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
};

export default QuestionCreatePage;
