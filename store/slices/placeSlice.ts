import { createSlice } from "@reduxjs/toolkit";

interface Place {
  id: string;
  name: string;
}

interface PlaceState {
  places: Place[];
}

const initialState: PlaceState = {
  places: [],
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    addPlace(state, action) {
      state.places.push(action.payload);
    },
    removePlace(state, action) {
      state.places = state.places.filter((place) => place.id !== action.payload);
    },
  },
});

export const { addPlace, removePlace } = placeSlice.actions;
export default placeSlice.reducer;
