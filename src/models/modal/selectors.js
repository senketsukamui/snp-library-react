import { createSelector } from "reselect";

export const modalFieldsSelector = createSelector(
  (state) => state.modal.modalInputState
);
