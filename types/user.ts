export interface User {
    account_email: string; // 계정 이메일
    nickname: string; // 닉네임
    phone_number: string; // 전화번호
    register_place_count: number; // 등록된 장소 개수
    created_at?: Date; // 생성 시간 (옵션, 생성 시 자동 설정 가능)
    penalty_count: number; // 벌점 개수
    penalty_state: boolean; // 벌점 상태
  }
  