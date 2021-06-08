import {
  UPLOADFILES_RIGHT,
  CREATELINK_RIGHT,
  UPLOADFILES_WRONG,
  UPLOAD_FILE,
  CLEAN_STATE,
  ADD_PASSWORD,
  ADD_DOWNLOADS,
  VALIDATE_PASSWORD,
} from "../../Types";

const FileReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: true,
      };
    case UPLOADFILES_RIGHT:
      return {
        ...state,
        name: action.payload.name,
        original_name: action.payload.original_name,
        loading: false,
      };
    case CREATELINK_RIGHT:
      return {
        ...state,
        url: action.payload,
      };
    case UPLOADFILES_WRONG:
      return {
        ...state,
        loading: false,
      };
    case ADD_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case ADD_DOWNLOADS:
      return {
        ...state,
        downloads: action.payload,
      };
    case CLEAN_STATE:
      return {
        ...state,
        name: null,
        original_name: null,
        loading: false,
        downloads: 1,
        password: null,
        author: null,
        url: "",
        validate: true,
      };
    case VALIDATE_PASSWORD:
      return {
        ...state,
        validate: action.payload,
      };
    default:
      return state;
  }
};
export default FileReducer;
