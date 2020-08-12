import { setEntries, next, vote, INITAIL_STATE } from "./core";

const reducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case "SET_ENTRIES":
      return setEntries(state, action.entries);
    case "NEXT":
      return next(state);
    case "VOTE":
      return state.update("vote", (voteState) => vote(voteState, action.entry));
  }
  return state;
};

export default reducer;
