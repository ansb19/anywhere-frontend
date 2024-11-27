import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Root Layout이 렌더링된 후 리디렉션 실행
    const timeout = setTimeout(() => {
      router.replace("/auth/login");
    }, 0);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [router]);

  return null;
}
