export interface Place {
  place_id: number;
  place_name: string;
  user_id: number;
  lat: number;
  lon: number;
  category_id: number;
  start_date: Date;
  end_date: Date;
  photo_s3_url: string[];
  charge_id: number;
  comment: string;
  tag: string[];
  exist_count: number;
  non_exist_count: number;
  owner: boolean; // 제보자: false, 작성자: true
 

}


  export const examplePlace: Place = {
    place_id: 1,
    place_name: "영석이의 붕엉빵 가게",
    user_id: 23,
    lat: 37.5665,
    lon: 126.9780,
    category_id: 2,
    start_date: new Date("2024-12-04"),
    end_date: new Date("2024-12-31"),
    photo_s3_url: [
        "https://example-bucket.s3.amazonaws.com/photo1.jpg",
        "https://example-bucket.s3.amazonaws.com/photo2.jpg"
    ],
    charge_id: 1,
    comment: "This is a beautiful park for picnics and outdoor activities.",
    tag: ["park", "nature", "relax"],
    exist_count: 10,
    non_exist_count: 2,
    owner: true, // 작성자인 경우
   

};
export const examplePlaces: Place[] = [
  {
    place_id: 1,
    place_name: "영석이의 붕엉빵 가게",
    user_id: 23,
    lat: 37.5665,
    lon: 126.9780,
    category_id: 2,
    start_date: new Date("2024-12-04"),
    end_date: new Date("2024-12-31"),
    photo_s3_url: [
      "https://example-bucket.s3.amazonaws.com/photo1.jpg",
      "https://example-bucket.s3.amazonaws.com/photo2.jpg"
    ],
    charge_id: 1,
    comment: "This is a beautiful park for picnics and outdoor activities.",
    tag: ["park", "nature", "relax"],
    exist_count: 10,
    non_exist_count: 2,
    owner: true,
  },
  {
    place_id: 2,
    place_name: "햄버거 천국",
    user_id: 45,
    lat: 37.5788,
    lon: 126.9897,
    category_id: 3,
    start_date: new Date("2024-01-01"),
    end_date: new Date("2024-12-31"),
    photo_s3_url: [
      "https://example-bucket.s3.amazonaws.com/photo3.jpg",
      "https://example-bucket.s3.amazonaws.com/photo4.jpg"
    ],
    charge_id: 2,
    comment: "Delicious burgers for every occasion.",
    tag: ["food", "burger", "fast-food"],
    exist_count: 25,
    non_exist_count: 3,
    owner: false,
  },
  {
    place_id: 3,
    place_name: "캠핑의 숲",
    user_id: 67,
    lat: 36.3504,
    lon: 127.3845,
    category_id: 4,
    start_date: new Date("2024-03-15"),
    end_date: new Date("2024-10-31"),
    photo_s3_url: [
      "https://example-bucket.s3.amazonaws.com/photo5.jpg",
      "https://example-bucket.s3.amazonaws.com/photo6.jpg"
    ],
    charge_id: 3,
    comment: "Perfect spot for camping and outdoor activities.",
    tag: ["camping", "nature", "outdoor"],
    exist_count: 15,
    non_exist_count: 1,
    owner: true,
  },
  {
    place_id: 4,
    place_name: "바닷가 풍경 카페",
    user_id: 89,
    lat: 34.7325,
    lon: 128.7483,
    category_id: 5,
    start_date: new Date("2024-06-01"),
    end_date: new Date("2024-08-31"),
    photo_s3_url: [
      "https://example-bucket.s3.amazonaws.com/photo7.jpg",
      "https://example-bucket.s3.amazonaws.com/photo8.jpg"
    ],
    charge_id: 4,
    comment: "Enjoy coffee with a stunning ocean view.",
    tag: ["coffee", "ocean", "relax"],
    exist_count: 8,
    non_exist_count: 0,
    owner: false,
  },
  {
    place_id: 5,
    place_name: "역사의 박물관",
    user_id: 101,
    lat: 35.1796,
    lon: 129.0756,
    category_id: 6,
    start_date: new Date("2024-09-01"),
    end_date: new Date("2024-12-31"),
    photo_s3_url: [
      "https://example-bucket.s3.amazonaws.com/photo9.jpg",
      "https://example-bucket.s3.amazonaws.com/photo10.jpg"
    ],
    charge_id: 5,
    comment: "Dive into history with our amazing exhibitions.",
    tag: ["museum", "history", "education"],
    exist_count: 30,
    non_exist_count: 5,
    owner: true,
  },
];

//     latitude: 37.5665, // 서울 위도
//     longitude: 126.9780, // 서울 경도
