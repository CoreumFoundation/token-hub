'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FT() {
  const router = useRouter();

  useEffect(() => {
    router.push('/ft/create');
  }, []);

  return null;
}
