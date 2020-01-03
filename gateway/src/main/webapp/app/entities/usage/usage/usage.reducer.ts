import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUsage, defaultValue } from 'app/shared/model/usage/usage.model';

export const ACTION_TYPES = {
  SEARCH_USAGES: 'usage/SEARCH_USAGES',
  FETCH_USAGE_LIST: 'usage/FETCH_USAGE_LIST',
  FETCH_USAGE: 'usage/FETCH_USAGE',
  CREATE_USAGE: 'usage/CREATE_USAGE',
  UPDATE_USAGE: 'usage/UPDATE_USAGE',
  DELETE_USAGE: 'usage/DELETE_USAGE',
  RESET: 'usage/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUsage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UsageState = Readonly<typeof initialState>;

// Reducer

export default (state: UsageState = initialState, action): UsageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_USAGES):
    case REQUEST(ACTION_TYPES.FETCH_USAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USAGE):
    case REQUEST(ACTION_TYPES.UPDATE_USAGE):
    case REQUEST(ACTION_TYPES.DELETE_USAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_USAGES):
    case FAILURE(ACTION_TYPES.FETCH_USAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USAGE):
    case FAILURE(ACTION_TYPES.CREATE_USAGE):
    case FAILURE(ACTION_TYPES.UPDATE_USAGE):
    case FAILURE(ACTION_TYPES.DELETE_USAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_USAGES):
    case SUCCESS(ACTION_TYPES.FETCH_USAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_USAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'services/usage/api/usages';
const apiSearchUrl = 'services/usage/api/_search/usages';

// Actions

export const getSearchEntities: ICrudSearchAction<IUsage> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_USAGES,
  payload: axios.get<IUsage>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IUsage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USAGE_LIST,
  payload: axios.get<IUsage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUsage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USAGE,
    payload: axios.get<IUsage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUsage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUsage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USAGE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
