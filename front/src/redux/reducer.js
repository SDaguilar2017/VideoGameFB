import {
  GET_VIDEOGAMES,
  GET_DETAIL,
  CLEAN_DETAIL,
  GET_BY_NAME,
  GET_GENRES,
  GET_PLATFORMS,
  PAGINATE,
  ORDER,
  FILTER,
  FILTER_ORIGIN,
} from "./action";

const initialState = {
  allVideogames: [],
  genres: [],
  platforms: [],
  allVideogamesBackup: [],
  allVideogamesFiltered: [],
  currentPage: 0,
  filters: false,
  detailVg: {},
};

const rootReducer = (state = initialState, action) => {
  const ITEMS_PER_PAGE = 15;
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: [...action.payload].slice(0, ITEMS_PER_PAGE),
        allVideogamesBackup: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case GET_DETAIL:
      return { ...state, detailVg: action.payload };
    case CLEAN_DETAIL:
      return { ...state, detailVg: action.payload };
    case GET_BY_NAME:
      return {
        ...state,
        allVideogames: action.payload,
      };
    case PAGINATE:
      const next_page = state.currentPage + 1;
      let prev_page = state.currentPage - 1;
      if (!isNaN(action.payload)) prev_page = action.payload;
      const firstIndex =
        action.payload === "next"
          ? next_page * ITEMS_PER_PAGE
          : prev_page * ITEMS_PER_PAGE;
      if (
        action.payload === "next" &&
        firstIndex >= state.allVideogamesBackup.length
      )
        return state;
      else if (action.payload === "prev" && prev_page < 0) return state;

      return {
        ...state,
        allVideogames: [...state.allVideogamesBackup].splice(
          firstIndex,
          ITEMS_PER_PAGE
        ),
        currentPage: action.payload === "next" ? next_page : prev_page,
      };
    case FILTER_ORIGIN:
      let toFilter = state.filters
        ? state.allVideogamesFiltered
        : state.allVideogamesBackup;
      let auxfilterO = true;
      let vgBackupO = [];

      switch (action.payload) {
        case "All":
          auxfilterO = false;
          break;
        case "API":
          toFilter = toFilter.filter((vg) => vg.created === false);
          break;
        case "BD":
          toFilter = toFilter.filter((vg) => vg.created === true);
          break;
        default:
          auxfilterO = false;
      }
      if (!state.filters) vgBackupO = [...state.allVideogamesBackup];
      else vgBackupO = state.allVideogamesFiltered;
      return {
        ...state,
        allVideogames: [...toFilter].slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
        allVideogamesBackup: toFilter,
        allVideogamesFiltered: vgBackupO,
        filters: auxfilterO,
      };

    case FILTER:
      let vgBackup = [];
      let auxfilter = true;
      let filtered = state.filters
        ? state.allVideogamesFiltered
        : state.allVideogamesBackup;
      if (action.payload === "All") auxfilter = false;
      else {
        filtered = filtered.filter((Vg) => Vg.genres.includes(action.payload));
      }
      if (!state.filters) vgBackup = [...state.allVideogamesBackup];
      else vgBackup = state.allVideogamesFiltered;
      return {
        ...state,
        allVideogames: [...filtered].slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
        allVideogamesBackup: filtered,
        allVideogamesFiltered: vgBackup,
        filters: auxfilter,
      };
    case ORDER:
      const orderVG = [...state.allVideogamesBackup].sort((a, b) => {
        switch (action.payload) {
          case "AZ":
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
          case "ZA":
            return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
          case "RA":
            return b.rating - a.rating;
          case "RD":
            return a.rating - b.rating;
          default:
            break;
        }
      });
      console.log(orderVG);
      return {
        ...state,
        allVideogames: [...orderVG].slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
        allVideogamesBackup: [...orderVG],
      };
    default:
      return { ...state };
  }
};
export default rootReducer;
