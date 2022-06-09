import React from "react";
import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { prependOnceListener } from "process";

{
  /*
We should let TypeScript to know which kind of props we want to support in this functonal component.
It means that the type is a fucntion which receives no arguments and returns nothin(void).
So it is just a type defenition.
This custom component will receive props
also instead of () we use props
*/
}
const BmiControls: React.FC<{
  onCalculate: () => void;
  onReset: () => void;
}> = props => {
  return (
    <IonRow>
      <IonCol className="ion-text-left">
        {/* 
            if we add parenthesis, the function would executed automatically,
              and the value of the fucntion will be pass to the onclick. 
              that's not what we want! we want to pass the fucntion itself.
             we want to pass on the function object to onClick prop,
              so react and browser will revoke the fucntion for us when a click happens
             */}
        <IonButton onClick={props.onCalculate}>
          <IonIcon slot="start" icon={calculatorOutline} />
          Calculate
        </IonButton>
      </IonCol>
      <IonCol className="ion-text-right">
        <IonButton onClick={props.onReset}>
          <IonIcon slot="start" icon={refreshOutline} />
          Reset
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default BmiControls;
