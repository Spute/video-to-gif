# Video to GIF

一个基于浏览器的视频转GIF工具，使用 [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) 在浏览器中直接处理视频转换。

网站demo：[https://video2gif.520233.best/](https://video2gif.520233.best/)

本项目基于[video-to-gif](https://github.com/mryhryki/video-to-gif)二次开发

## 功能特性

- 🎥 **完全在浏览器中处理** - 无需上传到服务器，保护隐私
- ⚙️ **丰富的转换设置** - 可调节帧率、尺寸、时间范围
- 📱 **拖拽上传** - 支持拖拽或粘贴视频文件
- 📊 **实时预览** - 视频预览和转换进度显示
- 💾 **历史记录** - 自动保存转换历史，支持下载
- 🔒 **隐私保护** - 所有处理都在本地完成

效果展示：
![GIF-demo](https://github.com/Spute/video-to-gif/raw/main/assets/demo.gif)

## 技术栈

- **前端框架**: Next.js 15.2.4 + React 19.1.0
- **样式**: Styled Components 6.1.16
- **语言**: TypeScript 5.8.2
- **视频处理**: ffmpeg.wasm (WebAssembly)
- **数据存储**: Dexie (IndexedDB)
- **构建工具**: Next.js 内置构建系统

## 转换设置

- **帧率 (Frame Rate)**: 1-30 FPS 可调节
- **尺寸 (Size)**: 按宽度或高度缩放，支持自动比例
- **时间范围 (Range)**: 精确设置开始和结束时间
- **淡入效果**: 自动添加0.05秒淡入过渡

## 部署方式

### 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 http://localhost:3000

### 静态部署

1. 构建项目：
```bash
npm run build
```

构建后的文件会生成在 `out` 文件夹中，包含：
- `index.html` - 主页面
- `assets/` - JavaScript 文件
- 静态资源文件
- 这个工具依赖跨源场景，需要设置如下响应头，如果你使用Cloudflare Pages部署。可以在项目根目录加一个 _headers 文件
```
/*
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
```

## 浏览限制与问题
- 大文件无法处理：因在内存中运行，转换大视频容易报错。
- 浏览器兼容性差：依赖 SharedArrayBuffer，在部分浏览器（如 IE）不可用。可以使用[caniuse](https://caniuse.com/?search=SharedArrayBuffer)查看浏览器是否支持SharedArrayBuffer
![浏览器兼容](https://github.com/Spute/video-to-gif/raw/main/assets/caniuse.png)

## 项目结构

```
  ├── components/          # React 组件
  │   ├── content.tsx      # 主要内容区域
  │   ├── drop_or_paste_video.tsx  # 拖拽上传组件
  │   ├── footer.tsx       # 页脚组件
  │   ├── header.tsx       # 头部组件
  │   ├── history.tsx      # 历史记录组件
  │   ├── select_video_file.tsx  # 视频文件选择组件
  │   ├── settings.tsx     # 转换设置组件
  │   └── status.tsx       # 状态显示组件
  ├── lib/                 # 工具函数
  │   ├── buffer_to_url.ts # 缓冲区转URL工具
  │   ├── checker.ts       # 检查器工具
  │   ├── datetime.ts      # 日期时间工具
  │   ├── ffmpeg.ts        # ffmpeg.wasm 封装
  │   └── hooks/           # React Hooks
  │       ├── use_convert_setting.ts  # 转换设置Hook
  │       └── use_history.ts          # 历史记录Hook
  ├── pages/               # Next.js 页面
  │   ├── _app.tsx         # Next.js应用组件
  │   ├── _document.tsx    # Next.js文档组件
  │   └── index.tsx        # 主页面
  ├── styles/              # 样式文件
  │   └── globals.css      # 全局CSS样式
  └── public/              # 静态资源
      └── ffmpeg.min.js    # ffmpeg.wasm 库
```

## 许可证

MIT License
