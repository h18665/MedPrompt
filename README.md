# MedPrompt 项目主页

Dynamic Semantic Aware Prompt Encoding for Medical Image Segmentation with MedSAM-2

作者：Jiaxi Hu

展示仓库：https://github.com/h18665/MedPrompt

项目主页：https://h18665.github.io/MedPrompt/ （已部署 GitHub Pages）。

这是 MedPrompt 学术介绍页，包含真实点提示分割 GIF、81 秒中文演示视频、英文/中文 Abstract 与 Introduction。界面参考 ScribblePrompt 的简洁学术排版，素材来自本项目实际预测。

## 发布到 GitHub Pages

1. 创建或打开用于主页的 GitHub 仓库。免费方案使用公开仓库。
2. 将发布包解压，把本目录的文件和 assets 文件夹上传到仓库根目录。index.html 必须在根目录；不能只上传 ZIP。
3. 打开 Settings → Pages，在 Source 选择 Deploy from a branch，分支选择 main（或实际上传分支），目录选择 /(root)，保存。
4. 等待 GitHub 的 Pages 部署完成，使用 Settings → Pages 显示的实际网址分享。该网址不按一周到期；需要保留仓库及 Pages 设置。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 内容修改

- index.html：项目介绍、作者、GIF 标签、双语摘要与 Introduction。
- styles.css：排版。
- config.json：视频、封面和在线 Demo 地址。
- assets/gifs/ 与 assets/videos/：已复制的真实素材；不需要学校服务器提供这些文件。

Paper 和 Code & Data 按要求暂时移除。Demo 已连接固定 HTTPS 入口：https://spoof-retrieval-tipper.ngrok-free.dev/ 。当前免登录进入，不需要用户名或密码。ngrok 免费版首次访问可能需要点击 Visit Site；固定域名不按一周到期，但学校服务器、独立演示服务和网关须持续运行，并受免费账户使用额度限制。Video 按钮可直接观看操作视频，无需登录。

GitHub Pages 只提供 HTML/CSS/JavaScript 等静态内容，不运行 PyTorch、CUDA 或模型权重。这个主页仓库仅包含介绍与素材，不冒充完整科研代码仓库。实时模型运行在学校服务器上，由非 root 演示账户提供；按项目所有者要求，网页与推理 API 对匿名访客开放；低权限运行、上传与请求限额、串行推理和文件下载限制继续保留。仅提供指定展示图像和当前预测输出，科研权重、系统目录及访问凭据不能通过 Demo 下载。

## 来源、协议与限制

DSPE 引入局部方向上下文 ACEM、可学习前景原型和动态门控融合，校准 MedSAM-2 的点表示。主线视频为真实 ACDC 左心室操作，末尾展示 ACDC、ISIC2016 和 REFUGE；采用单正点替换协议。

GIF 顺序为 ACDC LV、ACDC MYO、ISIC2016 皮肤病灶、REFUGE 视杯。ISIC2016 指定旧权重的 FiLM 为恒等；REFUGE 使用五折中的 fold_0 单模型。单图展示不等同于论文五图一组传播主结果，也不是五折平均指标。没有将 GT 或固定形状冒充预测。

来源记录见 assets/sources.json、assets/video-sources.json 及 publish_manifest.json。数据来源为 ACDC、ISIC 和 REFUGE；公开展示许可状态仍为“未核实”，不声称素材已获得额外授权。该项目用于科研与辅助标注演示，没有临床部署或商业验证声明。

上游 MedSAM-2 项目：https://github.com/MedicineToken/Medical-SAM2 。保留原仓库 LICENSE；影像数据许可独立于代码许可。
