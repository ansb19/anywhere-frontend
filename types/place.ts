export interface Place {
  place_id: number | null;
  place_name: string;
  user_id: number;
  lat: number;
  lon: number;

  category_id: number;
  subcategory_id : number;
  start_date: Date;
  end_date: Date;
  photo_s3_url: string[];
  place_charge: number[];
  week : string[];
  comment: string;
  tag: string[];
  exist_count: number;
  non_exist_count: number;
  owner: boolean; // 제보자: false, 작성자: true
 


}



export const placeData= {
  place_id: null,
  place_name: "Default Place",
  user_id: 1,
  lat: 37.5665,
  lon: 126.9780,
  category_id: 0,
  subcategory_id : 0,
  start_date: new Date(), // 시작 날짜를 현재 날짜로 초기화
  end_date: new Date(), // 끝 날짜를 현재 날짜로 초기화
  photo_s3_url: [],
  place_charge: [],
  week: [],
  comment: "",
  tag: [],
  exist_count: 0,
  non_exist_count: 0,
  owner: false,
};




//     latitude: 37.5665, // 서울 위도
//     longitude: 126.9780, // 서울 경도
export const examplePlaces: Place[] = [
  {
    place_id: 1,
    place_name: "서울 야시장",
    user_id: 101,
    lat: 37.5665,
    lon: 126.978,
    category_id: 1,
    subcategory_id: 1,
    start_date: new Date("2023-12-01"),
    end_date: new Date("2023-12-15"),
    photo_s3_url: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
    place_charge: [5000, 10000],
    week: ["월", "화", "수", "목", "금"],
    comment: "서울의 대표적인 야시장입니다.",
    tag: ["야시장", "전통", "길거리음식"],
    exist_count: 15,
    non_exist_count: 2,
    owner: true,
  },
  {
    place_id: 2,
    place_name: "부산 푸드트럭존",
    user_id: 102,
    lat: 35.1796,
    lon: 129.0756,
    category_id: 2,
    subcategory_id: 2,
    start_date: new Date("2023-12-05"),
    end_date: new Date("2023-12-20"),
    photo_s3_url: ["https://example.com/photo3.jpg"],
    place_charge: [7000],
    week: ["금", "토", "일"],
    comment: "부산 해변에서 즐기는 다양한 음식.",
    tag: ["푸드트럭", "해변", "음식"],
    exist_count: 20,
    non_exist_count: 5,
    owner: false,
  },
  {
    place_id: 3,
    place_name: "홍대 버스킹 존",
    user_id: 103,
    lat: 37.5561,
    lon: 126.9238,
    category_id: 3,
    subcategory_id: 3,
    start_date: new Date("2023-12-10"),
    end_date: new Date("2023-12-25"),
    photo_s3_url: ["https://example.com/photo4.jpg", "https://example.com/photo5.jpg"],
    place_charge: [],
    week: ["토", "일"],
    comment: "홍대 거리에서 다양한 공연을 볼 수 있습니다.",
    tag: ["버스킹", "공연", "홍대"],
    exist_count: 10,
    non_exist_count: 1,
    owner: true,
  },
  {
    place_id: 4,
    place_name: "제주 문화 축제",
    user_id: 104,
    lat: 33.4996,
    lon: 126.5312,
    category_id: 4,
    subcategory_id: 4,
    start_date: new Date("2024-01-01"),
    end_date: new Date("2024-01-10"),
    photo_s3_url: ["https://example.com/photo6.jpg"],
    place_charge: [10000],
    week: ["월", "화", "수", "목", "금", "토", "일"],
    comment: "제주도에서 열리는 전통 문화 축제입니다.",
    tag: ["제주", "문화", "축제"],
    exist_count: 30,
    non_exist_count: 0,
    owner: false,
  },
  {
    place_id: 5,
    place_name: "강남 플리마켓",
    user_id: 105,
    lat: 37.4979,
    lon: 127.0276,
    category_id: 7,
    subcategory_id: 7,
    start_date: new Date("2024-02-01"),
    end_date: new Date("2024-02-10"),
    photo_s3_url: ["https://example.com/photo7.jpg"],
    place_charge: [2000, 3000],
    week: ["토", "일"],
    comment: "강남의 핸드메이드 상품을 만나보세요.",
    tag: ["플리마켓", "핸드메이드", "쇼핑"],
    exist_count: 25,
    non_exist_count: 3,
    owner: true,
  },
  {
    place_id: 6,
    place_name: "송도 야외 공연장",
    user_id: 106,
    lat: 37.3823,
    lon: 126.6569,
    category_id: 6,
    subcategory_id: 6,
    start_date: new Date("2024-03-15"),
    end_date: new Date("2024-03-30"),
    photo_s3_url: ["https://example.com/photo8.jpg", "https://example.com/photo9.jpg"],
    place_charge: [0],
    week: ["금", "토", "일"],
    comment: "송도에서 열리는 무료 공연입니다.",
    tag: ["공연", "야외", "송도"],
    exist_count: 18,
    non_exist_count: 2,
    owner: false,
  },
  {
    place_id: 7,
    place_name: "대구 핸드메이드 마켓",
    user_id: 107,
    lat: 35.8714,
    lon: 128.6014,
    category_id: 7,
    subcategory_id: 7,
    start_date: new Date("2024-04-01"),
    end_date: new Date("2024-04-15"),
    photo_s3_url: ["https://example.com/photo10.jpg"],
    place_charge: [5000],
    week: ["토", "일"],
    comment: "대구에서 열리는 핸드메이드 마켓입니다.",
    tag: ["대구", "마켓", "핸드메이드"],
    exist_count: 12,
    non_exist_count: 1,
    owner: true,
  },
];
