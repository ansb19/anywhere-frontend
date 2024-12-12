interface KakaoLoginResult {
    accessToken: string;
    refreshToken: string;
    scopes: string[];
}

interface KakaoUserProfile {
    id: string;
    nickname: string;
    email?: string;
    profileImageUrl?: string;
    thumbnailImageUrl?: string;
}
