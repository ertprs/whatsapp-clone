interface GroupState {}

const INITIAL_STATE: GroupState = {};

type Action = any;

export const groupReducer = (
  state = INITIAL_STATE,
  action: Action
): GroupState => {
  switch (action.type) {
    default:
      return state;
  }
};
