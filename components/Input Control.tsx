import React from "react";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

// selected value should be either one the the strings below.
// it's not possible to select both at the same time.
// if an event occures by using "onIonChange" we want to trigger a function "onSelectValue"
const InputControl: React.FC<{
  selectedValue: "mkg" | "ftlbs";
  onSelectValue: (value: "mkg" | "ftlbs") => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
      props.onSelectValue(event.detail.value);
  };
  
  return (
    // Give every segment a value so in future you will be able to find out
    //  which button was selected.
    //instead of this "onIonChange={props.onSelectValue}" we write a function above and use it here
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="mkg">
        <IonLabel>m/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
