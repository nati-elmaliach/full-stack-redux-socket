import { List, Map } from "immutable";

export const INITAIL_STATE = Map();

export const setEntries = (state, entries) => {
  return state.set("entries", List(entries));
};

export const getWinners = (vote) => {
  if (!vote) return [];
  const [a, b] = vote.get("pair");
  const aVotes = vote.getIn(["tally", a], 0);
  const bVotes = vote.getIn(["tally", b], 0);

  if (aVotes > bVotes) return [a];
  else if (bVotes > aVotes) return [b];
  else return [a, b];
};

export const next = (state) => {
  const entries = state.get("entries").concat(getWinners(state.get("vote")));
  if (entries.size === 1) {
    return state
      .remove("vote")
      .remove("entries")
      .set("winner", entries.first());
  } else {
    return state.merge({
      vote: Map({ pair: entries.take(2) }),
      entries: entries.skip(2),
    });
  }
};

export const vote = (voteState, entry) => {
  /**
   * Using updateIn makes this pleasingly succinct.
   * What the code expresses is "reach into the nested data structure path
   * ['vote', 'tally', 'Trainspotting']
   * and apply this function there.
   * If there are keys missing along the path, create new Maps in their place.
   * If the value at the end is missing, initialize it with 0".
   */

  return voteState.updateIn(["tally", entry], 0, (tally) => tally + 1);
};
