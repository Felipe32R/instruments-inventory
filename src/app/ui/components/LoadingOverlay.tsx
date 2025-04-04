// components/LoadingOverlay.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cx from "./LoadingOverlay.module.scss";

export function LoadingOverlay() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (!isLoading) return null;

  return <div className={cx.overlay} />;
}
