import { compose, createStore } from 'redux'
import { statePrototype } from 'utils/constants';

export const store1Reducer = (state = {}, action) => {
  switch (action.type) {
    case "FORM1_RESPONSES":
      return Object.assign({}, state, {
        ...state,
        form1Responses: {...action.values}
      });
    case "FORM2_RESPONSES":
      return Object.assign({}, state, {
        ...state,
        form2Responses: {...action.values}
      });
    case "UPDATE_ASK_MODEL":
      return Object.assign({}, state, {
        ...state,
        askModel: {...action.value}
      })
    default:
      return state;
  }
};

const finalCreateStore = compose()(createStore)
export default function configureStore(initialState = statePrototype) {
  return finalCreateStore(store1Reducer, initialState)
}

export const actions = {
  writeForm1Responses: function(responses) {
    console.log("Actions dispaching")
    return {
      type: "FORM1_RESPONSES",
      values: responses
    }
  },
  writeForm2Responses: function(responses){
    return {
      type: "FORM2_RESPONSES",
      values: responses
    }
  },
  updateAskForModel: function(shouldAskModal){
    return {
      type: "UPDATE_ASK_MODEL",
      value: parseInt(shouldAskModal)
    }
  }
}

// const action = {
//   type: "NEW_CONTACT",
//   payload: {
//     name: this.name.current.value,
//     age: this.age.current.value
//   }
// };
// const newState = contactReducer(this.state, action);
// this.setState(newState);
  
