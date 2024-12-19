import { Place } from "@/types/place";
import { createSlice } from "@reduxjs/toolkit";



interface PlaceState {
  places: Place[];
  createPlace: Place | null;
}

const initialState: PlaceState = {
  places: [],
  createPlace: null,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    addPlaces(state, action) {
      state.places.push(action.payload);
    },
    removePlaces(state, action) {
      state.places = state.places.filter((place) => place.place_name !== action.payload);
    },
  },
});

export const { addPlaces, removePlaces } = placeSlice.actions;
export default placeSlice.reducer;
