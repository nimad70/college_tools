//  States: we need to be able to change the data in the IonCardContent compnent dynamically
//   and reflect those changes in our JSX code and therefore in the Dom,
//   and that is the reason we need state in react. In functional component (FC) we manage it by using "useState" hook
import React, { useRef, useState } from "react";
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  IonAlert,
} from "@ionic/react";
// import Home from './pages/Home';

// our custom component
import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/Input Control";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

{
  /*
FC stands for functional component. it is pre defined. added to the project by ionic start command line.
Whatever we store in the "App:" should be valid functional component. so it should return JSX.
But there are other types like:
const title: string = 'Hey!'; (title should only hold string)
const num: number = 12; 
*/
}

// change () to {} and add return() to be able to add functions not just JSX

const App: React.FC = () => {
  {
    /*
    State to be managed here is to calculate at body mass index.
    State returns and array with exact two elements, so use array to get those elements
      of the returned array.
    the first element is always the current state snapshot for the render cycle so for the fucntion execution,
    and the second array element is a function that allows us to update that state and we typically name it set[+the name of the first element]
 */
  }
  {
    /*
  by using generic type feature <>,  we tell TypeScript that the state we are going
  to store here will be eventually be a number
*/
  }
  const [calculatedBmi, setCalculatedBmi] = useState<number>();

  // Another state to show errors in the alert. and the error is a string
  const [error, setError] = useState<string>();

  // our selected calculation metrics, the type of data we will store in this state
  //  is either string of 'mkg' or 'ftlbs'. and we can officially set it to one of them inside the parenthesis -> ('mkg')
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg");

  {
    /*
    This Refs can be assigned to elements in the JSX code, 
      so we kinda establish a connection to those elements,
      and we can retrieve values somewhere elese in our JS code with help of those Refs
    we should tell the ref hold a pointer to ion input element,
      because the ref by itself cannpt understand to get element from where.
      HTMLIonInputElement is just TypeScript type provided by ionic.
      it's globally available and don not need to be imported.
      it lets TypeScript know that this ref will eventually point an ion input element.
      so if working with refs and using them to connect and element in JSX code,
      you have to set up which kind of element you are connecting to, and initializing them to null.
  */
  }
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    {
      /*
      ? -> special TypeScript syntax to write ternary(conditional) expressions.
      first it checks if the input ref holds non null value before try to access value property
      "weightInputRef.current ? weightInputRef.current.value : null" which is shortened to below expression.
      to prevent runtime errors.
      But if you know with certainty that the inputs will not be null,
      it is possible to replace "?" with "!":
      "const enteredWeight = weightInputRef.current!.value;"
      this tells TypeScript this will never be null. you can always access the value.
    */
    }
    // const enteredWeight = weightInputRef.current?.value;
    // const enteredHeight = heightInputRef.current?.value;

    {
      /*
      we add ! to value to tell TypeScript that the value will not be null too to avoid the error
    */
    }
    // const enteredWeight = +weightInputRef.current!.value!;
    // const enteredHeight = +heightInputRef.current!.value!;

    // Another solution is just be checking and using if cluase
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    // if these 2 are not null and are not empty strings make it to next line
    // check if the weight validity and also height
    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      // to set the error to show in the alert
      setError("Please enter a valid (non-negative) input number!");

      return;
    }


    // convert the height to kg or pounds based on what the calcUnit is
    const heightCoversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1; 
    const height = +enteredHeight / heightCoversionFactor;

    // convert the weight to kg or pounds based on what the calcUnit is
    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const weight = +enteredWeight / weightConversionFactor;

    // Add + to convert string to integer
    const bmi = weight / (height * height);

    // console.log(bmi);
    // by defining number <number> if we pass a string here w will get an error
    // it is about be more explicit about the types of data we are working with
    setCalculatedBmi(bmi);
  };

  // to reset inputs
  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  // to reset the error to empty string -> ''
  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  {
    /* To display a alert, we can add it anywhere in the JSX code 
    because it won't be rendered in the normal JSX Dom element hierarchy anyways,
    so we add it on the top! 
    As in react multilple root level elements are not allowed to add this on top,
    so we wrap this with <React.Fragment> that allows us to have multiple side-by-side root
    level elements without having them as root level elements. this is just there to fulfill this technical requirement react has,
    which is you must only return one root-level element in your JSX code. */
  }
  return (
    <React.Fragment>
      {/* set isOpen to tell the alert if it is visible or not. if the error is true and not null it will show it
      turn the error from string to boolean by using -> "!!" 
      here it means if it is true so it is a not empty srtring and show it, 
      if it is false so it is an empty string or undefined do not show it to users
      to show the error message is used that wants a string 
      also we can add buttons to the alert. it takes an array like buttons={['']},
      which is an array of strings that is text of the button.
      or an array of objects buttons={[{}]}, and every objects defines the text of the button, the role which controls which color it has
      and the handler function 
      To reset the error and give another chance to user to enter the inputs, the handler is used and it points to the function for reseting the error
      */}

      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/* Input Controller is added here */}
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={calcUnits}
                  onSelectValue={selectCalcUnitHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  {/* based on what we store in metrics states we show the correct metric to the user */}
                  <IonLabel position="floating">Your Height ({calcUnits === 'mkg' ? 'meters' : 'feet'})</IonLabel>
                  {/* To get the inputs we use the Refs. it is just a react concept and
               with use useRef hook we can use set up Refs infunctional components 
               To restrict the user just enter the number by adding type='number'*/}
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
                  {/* Getting error "ref" only because using Typescript */}
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            {/*
          Show this row section if and only if the calculated BMI is set.
          So if it is set means it's not undefined, and not false. So output this row here.
          Also possible to write terbary expresion but it also can be shortened to Vanilla JS synatx:
          {calculatedBmi ? (<IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <h2>{calculatedBmi}</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        ) : null}
        - In a nutshell, if the calculatedBmi is true,
           so the remaining code will be rendered to the DOM
        */}
            {/*
          After importing BmiControl component we add BmiControls like below.
          now we need to pass pointers at those 2 function above down into the
            BmiControls component.
          This is the way to connect buttons and so on in a child component to
          functions in the parent component. then we name those props.
        */}
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
            {calculatedBmi && <BmiResult result={calculatedBmi} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
