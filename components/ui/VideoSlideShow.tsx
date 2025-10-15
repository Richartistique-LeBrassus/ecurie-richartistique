"use client";
import React, { useState, useEffect, useRef } from "react";
import { ColourfulText } from "@/components/ui/ColourfulText";
import Image from "next/image";
import Link from "next/link";

interface Video {
  src: string;
  genre: string;
  title: string;
  titleColour: string[];
  ariaLabel: string;
  url: string;  
}

interface VideoSlideshowProps {
  videos: Video | Video[];
  interval?: number;
}

const VideoSlideshow: React.FC<VideoSlideshowProps> = ({ videos, interval = 5000 }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const intervalRef = useRef<number | null>(null);

  const videoList = Array.isArray(videos) ? videos : [videos];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (video.tagName.toLowerCase() === "video") {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => prev + 100 / (interval / 100));
    }, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentVideo, interval]);

  useEffect(() => {
    if (progress >= 100) {
      setCurrentVideo((prev) => (prev + 1) % videoList.length);
      setProgress(0);
      setLoading(true);
    }
  }, [progress, videoList.length]);

  return (
    <Link
      href={videoList[currentVideo].url}
      prefetch={true}
      className="relative w-full h-full block hover:cursor-pointer 
       rounded-xs"
      aria-label={videoList[currentVideo].ariaLabel}
    >
      {videoList.map((video, index) => {
        const isImage = /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(video.src);
        const isVideo = /\.(mp4|webm|ogg|mov|mkv)$/i.test(video.src);
        return (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 bg-neutral-50 ${
              index === currentVideo ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {loading && index === currentVideo && (
              <div className="absolute inset-0 bg-neutral-50 animate-pulse rounded-2xl z-0" />
            )}

            {isVideo ? (
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={video.src}
                muted
                loop
                playsInline
                preload={index === 0 ? "auto" : "none"} 
                className="w-full h-full object-cover rounded-3xl relative z-10"
                onLoadedData={() => setLoading(false)}
              />
            ) : isImage ? (
              <Image
                src={video.src}
                alt={video.title}
                width={1280}
                height={720}
                className="w-full h-full object-cover rounded-xs relative z-10"
                priority={index === 0} 
                onLoadingComplete={() => setLoading(false)}
              />
            ) : null}
          </div>
        );
      })}

      <div className="absolute inset-0 flex flex-col justify-end items-center bottom-7 pointer-events-none z-20">
        {videoList.map((video, index) => (
          <div
            key={index}
            className={`absolute w-full h-full ${
              index === currentVideo ? "block" : "hidden"
            } flex justify-center items-end`}
          >
            <div className="pb-10 text-center px-4 max-w-[230px]">
              <p className="text-xs text-center text-amber-50 uppercase drop-shadow-2xl mb-2">
                {video.genre}
              </p>
              <ColourfulText text={video.title} colors={video.titleColour} />
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
};

export default VideoSlideshow;