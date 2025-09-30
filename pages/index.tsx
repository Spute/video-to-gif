import React from "react";
import Head from "next/head"; // 用于设置页面的 <head> 标签内容（SEO、社交分享等）
import { DropOrPasteVideo } from "../components/drop_or_paste_video"; // 拖拽或粘贴视频的组件
import { SelectVideoFile } from "../components/select_video_file"; // 选择视频文件的组件
import { checkCanUseFFmpeg, convVideoToGif } from "../lib/ffmpeg"; // ffmpeg相关工具函数
import { useState, useEffect } from "react"; // React的状态和生命周期钩子
import { useHistory } from "../lib/hooks/use_history"; // 自定义hook，管理转换历史
import { Header } from "../components/header"; // 页面头部组件
import { Content } from "../components/content"; // 页面内容组件
import { History } from "../components/history"; // 历史记录组件
import { Footer } from "../components/footer"; // 页面底部组件
import { useConvertSetting } from "../lib/hooks/use_convert_setting"; // 自定义hook，管理转换设置
import { Settings } from "../components/settings"; // 转换参数设置组件
import { Status } from "../components/status"; // 状态显示组件

// Home 是页面的主组件
const Home = () => {
  // status 用于显示当前转换状态（如“Converting...”或错误信息）
  const [status, setStatus] = useState(null);
  // FFmpegErrorMessage 用于显示ffmpeg相关的错误信息
  const [FFmpegErrorMessage, setFFmpegErrorMessage] = useState<string | null>(null);
  // 使用自定义hook获取和设置视频文件、转换参数等
  const { setVideoFile, videoFile, videoUrl, convertSetting, updateConvertSetting } = useConvertSetting();
  // 使用自定义hook获取和添加历史记录
  const { addHistory, histories } = useHistory();

  // 页面加载时动态加载ffmpeg脚本，并检测是否可用
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/ffmpeg.min.js";
    script.onload = () => {
      setFFmpegErrorMessage(checkCanUseFFmpeg()); // 检查ffmpeg是否可用
    };
    script.onerror = () => {
      setFFmpegErrorMessage("Failed to load FFmpeg script"); // 加载失败时显示错误
    };
    document.head.appendChild(script);

    return () => {
      // 卸载组件时清理脚本
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // 转换视频为GIF的主逻辑
  const transcode = async (): Promise<void> => {
    if (status != null || videoFile == null) return; // 如果正在转换或没有视频文件则不执行
    setStatus("Converting..."); // 设置状态为转换中
    try {
      const gifData = await convVideoToGif(videoFile, convertSetting); // 调用ffmpeg转换
      setStatus(null); // 转换成功后清空状态
      await addHistory(gifData); // 保存到历史记录
    } catch (err) {
      setStatus(`ERROR: ${err.message}`); // 转换失败时显示错误信息
      console.error(err);
    }
  };

  // 页面渲染内容
  return (
    <>
      <Head>
        {/* SEO和社交分享相关的meta标签 */}
        <meta property="og:title" content="Video to GIF" />
        <meta property="og:description" content="Convert video to gif on browser. powered by ffmpeg.wasm." />
        <meta property="og:image" content="https://video-to-gif.vercel.app/logo_1200x1200.png" />
        <meta property="og:url" content="https://video-to-gif.vercel.app/" />
        <meta property="og:site_name" content="Video to GIF" />
        <meta property="og:locale" content="ja-JP" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Video to GIF" />
        <meta name="twitter:description" content="Convert video to gif on browser. powered by ffmpeg.wasm." />
        <meta name="twitter:image" content="https://video-to-gif.vercel.app/logo_1200x1200.png" />
        <meta name="twitter:site" content="@mryhryki" />
        <title>Video to GIF</title>
      </Head>

      {/* 主体内容区域 */}
      <DropOrPasteVideo onVideoFileDrop={setVideoFile}>
        <Header />
        <Content errorMessage={FFmpegErrorMessage} isConverting={status === "Converting..."}>
          {/* 根据是否有视频文件显示不同内容 */}
          {status === "Converting..." ? (
            <Status>{status}</Status>
          ) : (
            <>
              {videoFile == null ? (
                <SelectVideoFile onVideoFileSelected={setVideoFile} />
              ) : (
                <Settings
                  convertSetting={convertSetting}
                  updateConvertSetting={updateConvertSetting}
                  videoUrl={videoUrl}
                  onConvert={transcode}
                  isConverting={status === "Converting..."}
                />
              )}
              <Status>{status}</Status> {/* 显示转换状态 */}
            </>
          )}
        </Content>
        <History histories={histories} /> {/* 显示历史记录 */}
        <Footer /> {/* 页脚 */}
      </DropOrPasteVideo>
    </>
  );
};

export default Home; // 导出主页面组件
