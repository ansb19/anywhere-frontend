export interface Place {
    place_id: number; // Primary Key, Auto Increment
    place_name: string; // 장소 이름 (최대 40자)
    nickname: string; // 닉네임 (Foreign Key, 최대 20자)
    lat: number; // 위도
    lon: number; // 경도
    category_id: number; // 카테고리 ID (Foreign Key)
    created_at: Date; // 생성 일시
    start_date: Date; // 시작 일시
    end_date: Date; // 종료 일시
    photo_s3_url: string[]; // S3 URL 배열 (최대 500개)
    charge_id: number[]; // 요금 ID (Foreign Key)
    comment: string; // 코멘트 (최대 1000자)
    tag: string[]; // 태그 배열 (최대 1000개)
    exist_count: number; // 존재 확인 수
    not_exist_count: number; // 존재하지 않음 확인 수
    owner: boolean; // true: 가게 주인, false: 제보자
  }