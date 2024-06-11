import React, { createContext, useReducer, useContext } from "react";


const initialState = {
  isChanged: false,
};


const ProfilePictureContext = createContext(initialState);


const profilePictureReducer = (state, action) => {
  switch (action.type) {
    case "ISCHANGE":
      return {
        ...state,
        isChanged: true,
      };
    case "RESETSTATUS":
      return {
        ...state,
        isChanged: false,
      };
    default:
      return state;
  }
};


export const PictureProfilProvider = ({ children }) => {
  const [isChague, dispatchPicturProfile] = useReducer(profilePictureReducer, initialState);

  return (
    <ProfilePictureContext.Provider value={{ isChague, dispatchPicturProfile }}>
      {children}
    </ProfilePictureContext.Provider>
  );
};


export const useProfilePictureContext = () => useContext(ProfilePictureContext);
