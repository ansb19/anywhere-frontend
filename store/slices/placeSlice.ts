import { examplePlaces, Place } from "@/types/place";
import { createSlice } from "@reduxjs/toolkit";

interface PlaceState {
  places: Place[];
  createPlace: Place | null;
}

const initialState: PlaceState = {
  places: examplePlaces,
  createPlace: null,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    addPlaces(state, action) {
      const index = state.places.findIndex(
        (place) => place.place_id === action.payload.place_id
      );
      if (index !== -1) {
        // 같은 place_id가 있으면 기존 데이터 덮어쓰기
        state.places[index] = action.payload;
      } else {
        // 같은 place_id가 없으면 새로 추가
        state.places.push(action.payload);
      }
    },
    removePlaces(state, action) {
      state.places = state.places.filter(
        (place) => place.place_name !== action.payload
      );
    },
  },
});

export const { addPlaces, removePlaces } = placeSlice.actions;
export default placeSlice.reducer;
