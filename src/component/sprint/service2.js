import {
  fetchSprintRequest,
  fetchSprintSuccess,
  fetchSprintFail,
} from './actions';

const fetchSprintService = () => async (dispatch) => {
  try {
    dispatch(fetchSprintSuccess(difficulty));
  } catch (error) {
    dispatch(fetchSprintFail(error));
  }
};

export { fetchSprintService as default };
