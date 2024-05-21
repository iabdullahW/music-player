import { useState, useRef } from 'react';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const audioRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setCurrentTrack(fileURL);
      audioRef.current.src = fileURL;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStreamURLChange = (event) => {
    setCurrentTrack(event.target.value);
  };

  const playStream = () => {
    if (currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-8">Music Player</h1>
      <div className="w-full max-w-md space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="p-2 rounded bg-gray-800 text-white w-full"
        />
        <input
          type="text"
          placeholder="Enter streaming URL"
          value={currentTrack}
          onChange={handleStreamURLChange}
          className="p-2 rounded bg-gray-800 text-white w-full"
        />
        <button
          onClick={playStream}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-700 w-full"
        >
          Play Stream
        </button>
        <audio ref={audioRef} className="w-full" controls autoPlay={isPlaying}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default Player;
