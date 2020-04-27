import fetchHealth from '../../api/fetchHealth';
import { types } from '../../store/makeReducer';

async function fetchHealthAndSetHealthy(dispatch) {
  function setHealthy(error, response) {
    if (error) {
      console.log(error);
      dispatch({ type: types.SET_HEALTHY, value: false });
    }
    if (response) {
      console.log(response);
      dispatch({
        type: types.SET_HEALTHY,
        value: !response.error
      });
    }
  }

  try {
    const response = await fetchHealth();
    setHealthy(null, response);
  } catch (error) {
    setHealthy(error);
  }
}

export default fetchHealthAndSetHealthy;
