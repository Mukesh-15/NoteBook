import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
  const [alert, setAlertState] = useState({ show: false, type: "", msg: "" });

  const setAlert = (type, msg) => {
    setAlertState({ show: true, type, msg });
    setTimeout(() => {
      setAlertState({ show: false, type: "", msg: "" });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ setAlert, alert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
