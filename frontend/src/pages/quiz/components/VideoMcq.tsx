import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface VideoPlayerProps {
  videoUrl: string;
  timeFrames: { time: number; question: string; answer: boolean }[];
  onSubmit: (answer: boolean) => void;
}

const VideoMcq: React.FC<VideoPlayerProps> = ({
  videoUrl,
  timeFrames,
  onSubmit,
}) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value === "true");
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      onSubmit(selectedAnswer);
      setSelectedAnswer(null);
      setCurrentFrameIndex(currentFrameIndex + 1);
      playVideo(); // Resume playing the video after submitting the answer
    }
  };

  const playVideo = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.paused) {
      videoElement.play();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = videoElement?.currentTime;

      if (
        currentTime &&
        timeFrames[currentFrameIndex] &&
        currentTime >= timeFrames[currentFrameIndex].time
      ) {
        videoElement?.pause();
        setSelectedAnswer(null);
      }
    };

    videoElement?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentFrameIndex, timeFrames]);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoPlay = () => {
      setIsVideoPlaying(true);
    };

    const handleVideoPause = () => {
      setIsVideoPlaying(false);
    };

    videoElement?.addEventListener("play", handleVideoPlay);
    videoElement?.addEventListener("pause", handleVideoPause);

    return () => {
      videoElement?.removeEventListener("play", handleVideoPlay);
      videoElement?.removeEventListener("pause", handleVideoPause);
    };
  }, []);

  useEffect(() => {
    if (currentFrameIndex >= timeFrames.length) {
      setSelectedAnswer(null);
    }
  }, [currentFrameIndex, timeFrames]);

  return (
    <Box>
      <video ref={videoRef} src={videoUrl} controls />
      {currentFrameIndex < timeFrames.length && (
        <Box mt={4}>
          <Typography variant="h6">
            {timeFrames[currentFrameIndex].question}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="answer"
              name="answer"
              value={selectedAnswer !== null ? selectedAnswer.toString() : ""}
              onChange={handleAnswerChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="True" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedAnswer === null}
            onClick={handleAnswerSubmit}
            sx={{ mt: 4 }}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VideoMcq;
