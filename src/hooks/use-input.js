import { useState } from "react";

const useInput = (validValue) => {
  const [enterValue, setEnterValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isEnteredValueValid = validValue(enterValue);
  const hasError = !isEnteredValueValid && isTouched;

  const onChangeHandler = (event) => {
    setEnterValue(event.target.value);
  };
  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const reSet = () => {
    setEnterValue("");
    setIsTouched(false);
  };

  return {
    enterValue,
    onChangeHandler,
    onBlurHandler,
    hasError,
    isValid: isEnteredValueValid,
    reSet,
  };
};

export default useInput;