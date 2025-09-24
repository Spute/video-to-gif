const getFFmpeg = () => {
  if (typeof window === "undefined") {
    throw new Error("FFmpeg can only be used in browser environment.");
  }
  if (!("FFmpeg" in window)) {
    throw new Error("FFmpeg could not be loaded.");
  } else if (!("SharedArrayBuffer" in window)) {
    throw new Error("SharedArrayBuffer could not be used.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).FFmpeg;
};

let ffmpeg = null;
const loadFFmpeg = async () => {
  if (ffmpeg == null) {
    const { createFFmpeg } = getFFmpeg();
    ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();
  }
  return ffmpeg;
};

export interface ConvertSetting {
  frameRate: number;
  sizeType: "height" | "width";
  sizePixel: number;
  rangeStart: number;
  rangeEnd: number;
}

export const convVideoToGif = async (file: File, settings: ConvertSetting): Promise<Blob> => {
  const ffmpeg = await loadFFmpeg();
  const { frameRate, sizeType, sizePixel, rangeStart, rangeEnd } = settings;

  const { fetchFile } = getFFmpeg();
  // 使用固定的文件名避免中文路径问题
  const inputFileName = "input_video";
  const outputFileName = "output.gif";

  ffmpeg.FS("writeFile", inputFileName, await fetchFile(file));

  await ffmpeg.run(
    "-i",
    inputFileName,
    "-r",
    `${frameRate}`,
    "-ss",
    `${rangeStart}`,
    "-to",
    `${rangeEnd}`,
    "-vf",
    `scale=${sizeType === "width" ? sizePixel : -1}:${
      sizeType === "height" ? sizePixel : -1
    },fade=t=in:st=${rangeStart}:d=0.05`,
    outputFileName
  );
  return ffmpeg.FS("readFile", outputFileName).buffer;
};

export const checkCanUseFFmpeg = (): /* errorMessage: */ string | null => {
  if (typeof window === "undefined") {
    return "FFmpeg can only be used in browser environment.";
  }
  try {
    getFFmpeg();
    return null;
  } catch (err) {
    return err.message;
  }
};
