'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NFT() {
  const router = useRouter();

  useEffect(() => {
    router.push('/nft/create');
  }, []);

  return null;
}
