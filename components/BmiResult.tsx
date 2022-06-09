import React from "react";
import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react";


// Here the value is not a function and just a number or string- > {result: number | string}
// Also this is the way to define multiple types in TypeScript with a sinle pipe
const BmiResult: React.FC<{result: number}> = props => {
  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardContent className="ion-text-center">
              <h2>Your Body-Mass-Index</h2>
              {/* we should just number above so we can use toFixed attribute.
              it prints the result in a format of specified decimal points. here it's 2 */}
            <h2>{props.result.toFixed(2)}</h2>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmiResult;
