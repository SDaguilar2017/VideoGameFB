export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_DETAIL = "GET_DATAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const PAGINATE = "PAGINATE";
export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const FILTER_ORIGIN = "FILTER_ORIGIN";

import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/videogames");

      if (data) dispatch({ type: GET_VIDEOGAMES, payload: data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      if (data) dispatch({ type: GET_DETAIL, payload: data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function cleanDetail() {
  return async function (dispatch) {
    const data = {};
    dispatch({ type: GET_DETAIL, payload: data });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames/name?name=${name}`
      );
      if (data) dispatch({ type: GET_BY_NAME, payload: data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}
export function postVideogames(state) {
  return async function (dispatch) {
    try {
      const result = await axios.post(
        `http://localhost:3001/videogames`,
        state
      );
      alert(result.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/genres");
      if (data) dispatch({ type: GET_GENRES, payload: data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}
export function getPlatforms() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/platforms");
      if (data) dispatch({ type: GET_PLATFORMS, payload: data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}
export function page(order) {
  return function (dispatch) {
    dispatch({
      type: PAGINATE,
      payload: order,
    });
  };
}
export function order(order) {
  return function (dispatch) {
    dispatch({
      type: ORDER,
      payload: order,
    });
  };
}
export function filter(order) {
  return function (dispatch) {
    dispatch({
      type: FILTER,
      payload: order,
    });
  };
}
export function filterOrigin(order) {
  return function (dispatch) {
    dispatch({
      type: FILTER_ORIGIN,
      payload: order,
    });
  };
}
