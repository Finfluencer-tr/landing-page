"use client";

import React, { useEffect, useState } from "react";

interface InfluencerImageProps {
    src: string;
    alt: string;
    className?: string;
    fallback?: string;
}

export const InfluencerImage = ({ src, alt, className, fallback }: InfluencerImageProps) => {
    const [imageSrc, setImageSrc] = useState<string>(src);

    useEffect(() => {
        // If it's a default dicebear URL, don't fetch-process it, just use it.
        if (src.includes("dicebear")) {
            setImageSrc(src);
            return;
        }

        let isMounted = true;
        const fetchImage = async () => {
            try {
                const res = await fetch(src);
                if (!res.ok) throw new Error("Failed to load image");

                const contentType = res.headers.get("content-type");

                // If it's json, it might be the "buffer" format user mentioned
                if (contentType?.includes("application/json")) {
                    const data = await res.json();

                    // Check for buffer-like structure, e.g., { type: 'Buffer', data: [...] }
                    if (data && data.type === 'Buffer' && Array.isArray(data.data)) {
                        const buffer = Uint8Array.from(data.data);
                        const blob = new Blob([buffer], { type: "image/jpeg" }); // Assume jpeg or detect
                        const url = URL.createObjectURL(blob);
                        if (isMounted) setImageSrc(url);
                    } else {
                        // Fallback: maybe the JSON provided a url? or it's an error.
                        // console.warn("Unknown JSON image format", data);
                    }
                } else if (contentType?.includes("image")) {
                    // If it's already an image, we can usually just use the URL.
                    // But if we fetched it as blob to check headers, we can use the blob.
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    if (isMounted) setImageSrc(url);
                }

            } catch (err) {
                // Keep original src (or fallback) on error
                // console.error(err);
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
        };
    }, [src]);

    return (
        <img src={imageSrc} alt={alt} className={className} onError={(e) => {
            // Fallback on load error
            if (fallback) {
                e.currentTarget.src = fallback;
            } else {
                e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${alt}`;
            }
        }} />
    );
};
