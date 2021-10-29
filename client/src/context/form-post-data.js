import React, { useReducer, createContext } from "react";
import AppReducer from './app-reducer';
// import * as _D from './sample-data';


//Create Context Object
let initialState = { 'curStep': 'basicInfo'};

//FOR DEBUG PURPOSES
// initialState = _D.SampleData();
// console.log(initialState.dateObj)


export const FormDataContext = createContext(initialState);
//It returns an obj => { Provider, Consumer }


//Provider here...
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addFormData(data) {
    dispatch({
      type: 'ADD_FORM_DATA',
      payload: data
    });
  };

  function editReport(data) {
    dispatch({
      type: 'EDIT_REPORT',
      payload: data
    });
  };


  return (<FormDataContext.Provider value={{
    formData: state,
    addFormData,
    editReport
  }}>
    {children}
  </FormDataContext.Provider>)
};


//Don't need Consumer in functional components