import { React, useContext } from "react";
import alertContext from "../context/notes/alertContext";

export default function Alert() {
  const { alert } = useContext(alertContext);

  return (
    <div>
      {alert.show && (
        <div className={`alert fixed-bottom alert-${alert.type} m-0`} role="alert">
          {alert.msg}
        </div>
      )}
    </div>
  );
}
