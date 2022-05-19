import React, {
  useState,
  useLayoutEffect,
} from 'react';

import { Router } from "react-router-dom";

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => {
    history.listen(setState)
  }, [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}      
    />
  );
};


export default CustomRouter;