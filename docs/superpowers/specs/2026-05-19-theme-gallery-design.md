# ThemeGallery 本地主题工作台设计

日期：2026-05-19

## 背景

ThemeGallery 当前是一个轻量素材库：`themes/` 中存放完整主题 Markdown，`palettes/` 中存放小红书等来源的色卡 Markdown。目标是做一个本地 React 工具，把这些 Markdown 自动读取、解析、补齐为可预览主题，让前端主题选择从“读文档想象效果”变成“点击后直接看真实 UI 气质”。

首版定位为本地开发和审美资料库，不做可部署 CMS、不做后端、不做浏览器内编辑。

## 目标

- 自动读取 `themes/*.md` 和 `palettes/*.md`。
- 将完整主题和色卡统一规范化为 `NormalizedTheme`。
- 点击主题后，在固定产品场景中即时可视化效果。
- 同时展示 token、色板、字体、组件配置和 Markdown 设计说明。
- 保持收藏文件轻量：色卡文件不需要手动补完整主题字段。

## 非目标

- 不在首版中编辑或保存 Markdown。
- 不提供后端服务或生产环境运行时文件夹扫描。
- 不导出 Tailwind、CSS 或 token package。
- 不做 AI 主题生成。
- 不做多主题并排对比板。
- 不把 `themes/tailwind.css` 作为主题输入解析；它先视为导出物。

## 产品形态

首版采用三栏工作台布局。

左侧 `Library`：

- 自动列出 `themes/*.md` 和 `palettes/*.md`。
- 支持名称、文件名、标签、正文关键词搜索。
- 支持 `All / Themes / Palettes` 类型筛选。
- 每个条目显示名称、来源类型、主要色板、标签和简短说明。

中间 `Stage`：

- 点击左侧条目后，当前主题立即应用到所有预览。
- 提供 `Dashboard`、`Landing`、`Mobile`、`Components` 四个 tab。
- tab 切换只改变预览场景，不改变当前主题。

右侧 `Inspector`：

- 展示色板、渐变、字体、圆角、间距、组件 token。
- 展示 Markdown 正文中的设计说明、感受、Do and Don't。
- 展示解析 warning，例如缺失字段、无效颜色、无法解析的引用。

## 数据来源

完整主题来自 `themes/*.md`。文件结构预期为 frontmatter 加 Markdown 正文。frontmatter 可包含：

- `name`
- `colors`
- `typography`
- `rounded`
- `spacing`
- `components`

色卡来自 `palettes/*.md`。文件结构预期为 frontmatter 加 Markdown 正文。frontmatter 可包含：

- `name`
- `tags`
- `mood`
- `source`
- `colors`
- `gradients`

## 数据读取

React/Vite 侧使用 `import.meta.glob` 读取 Markdown 原文：

```ts
import.meta.glob('../../themes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
```

`palettes/*.md` 使用同样方式读取。Markdown 原文由 `gray-matter` 拆成 frontmatter 和 body。body 原样保留，供 Inspector 展示。

## 统一模型

应用内部使用一个统一模型：

```ts
type ThemeKind = 'theme' | 'palette-derived';

interface NormalizedTheme {
  id: string;
  kind: ThemeKind;
  filePath: string;
  name: string;
  tags: string[];
  source?: string;
  mood?: string;
  colors: Record<string, string>;
  gradients: Array<{ from: string; to: string }>;
  typography: Record<string, TypographyToken>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
  components: Record<string, ComponentToken>;
  markdownBody: string;
  warnings: string[];
}
```

完整主题会尽量保持原始字段。色卡主题会通过 `Base UI Foundation` 补齐结构。

## 完整主题规范化

对 `themes/*.md`：

- `colors`、`typography`、`rounded`、`spacing`、`components` 直接进入 normalized theme。
- 对缺失字段使用中性默认值补齐，并记录 warning。
- 对组件字段中的引用进行解析，例如 `{colors.primary}`、`{typography.label-sm}`。
- 引用无法解析时保留原始值，并记录 warning，避免页面崩溃。

## 色卡派生主题

对 `palettes/*.md`：

- 不修改原 Markdown 文件。
- 运行时生成 `palette-derived theme`。
- `typography`、`spacing`、`rounded`、`components` 来自固定中性 `Base UI Foundation`。
- 色卡只负责注入视觉情绪和色彩角色。

色彩映射规则：

- `role: background` 映射到 `background`、`surface-dim`。
- `role: surface` 映射到 `surface`、`surface-container`。
- `role: primary` 映射到 `primary`。
- `role: secondary` 映射到 `secondary`。
- `role: accent` 映射到 `tertiary` 或强调色。

派生逻辑会根据颜色明暗推导：

- `on-background`
- `on-surface`
- `on-primary`
- `outline`
- `outline-variant`
- container 层级色
- hover/active 色
- muted text 色

文本色和描边色必须以对比度为先。若色卡缺少关键 role，则从已有颜色中按亮度和饱和度选择最合适的替代，并记录 warning。

## Base UI Foundation

色卡主题的基础模板保持中性，避免把所有色卡强行变成某个品牌风格。

基础模板默认：

- 字体：Inter，系统字体 fallback。
- 间距：8px grid。
- 圆角：按钮 10-12px，卡片 12px，输入框 10px。
- 组件：primary button、ghost button、card、input、badge、table row、modal、sidebar item。
- 阴影：轻量，主要靠 surface 层级和 border 建立深度。

未来可以增加“手动选择基础骨架”，例如把某个色卡套到 Linear、Apple、Craft 等结构上，但首版不做。

## 预览场景

`Dashboard` 场景：

- 左侧导航。
- 顶部工具栏和指标。
- 图表卡片。
- 表格。
- 活动流。
- 筛选和状态标签。

这个场景检验信息密度、层级、边框、表格可读性、状态色和长时间使用舒适度。

`Landing` 场景：

- 顶部导航。
- hero 标题和 CTA。
- 产品截图式面板。
- 功能内容区。

这个场景检验第一眼品牌气质、标题尺度、CTA 吸引力、背景与卡片节奏。

`Mobile` 场景：

- 手机壳或窄屏容器。
- 顶部栏。
- 列表卡片。
- 主行动按钮。
- 底部 tab。

这个场景检验小屏可读性、触控间距、圆角强度和色彩压迫感。

`Components` 场景：

- primary/ghost/destructive buttons。
- input/search/select。
- cards。
- badges。
- table rows。
- modal。
- empty state。
- 字体样张。
- 色板和渐变。

这个场景检验 token 原子能力和缺字段 fallback。

## 代码结构

建议结构：

```text
src/
  data/
    themeLoader.ts
    parseTheme.ts
  theme/
    baseFoundation.ts
    normalizeTheme.ts
    derivePaletteTheme.ts
    resolveReferences.ts
    cssVars.ts
    colorMath.ts
  components/
    workbench/
      ThemeLibrary.tsx
      PreviewStage.tsx
      ThemeInspector.tsx
      SearchAndFilters.tsx
    previews/
      DashboardPreview.tsx
      LandingPreview.tsx
      MobilePreview.tsx
      ComponentsPreview.tsx
  types/
    theme.ts
```

`App.tsx` 只负责组合工作台、当前主题状态和当前预览 tab，不承载解析逻辑或大型预览实现。

## 样式策略

首版使用普通 CSS 和 CSS variables，不引入重 UI 框架。

理由：

- 预览目标是判断主题自身效果，外部 UI 框架会带入太多默认审美。
- CSS variables 能直接表达 normalized theme。
- 预览场景可以稳定复用同一套 DOM，只替换变量。

主题应用流程：

1. `NormalizedTheme` 转为 CSS variable map。
2. `Stage` 根节点设置这些 variables。
3. 预览组件只消费 CSS variables，不直接读取 theme object。
4. Inspector 读取 theme object，用于展示原始 token 和 warnings。

## 响应式行为

桌面端使用三栏布局。

移动端或窄宽度下折叠为：

1. 顶部主题选择和搜索。
2. 预览 tab。
3. 当前预览。
4. Inspector 下移为可折叠区域。

首版不要求移动端达到完整生产工具体验，但不能出现横向溢出、文本重叠或主要操作不可用。

## 错误处理

解析失败的文件不应让整个应用崩溃。

处理方式：

- 文件级解析失败：在 Library 中显示错误条目，Inspector 展示错误信息。
- 字段缺失：补默认值并记录 warning。
- 无效颜色：跳过该颜色，使用 fallback 并记录 warning。
- 引用无法解析：保留原始值或 fallback，并记录 warning。

## 验证计划

单元测试覆盖：

- 完整主题解析。
- 色卡主题派生。
- 缺字段补齐。
- `{colors.*}` 和 `{typography.*}` 引用解析。
- 颜色明暗判断和文本色推导。

真实数据验证：

- Linear：深色、高密度 Dashboard。
- Apple：浅色、Landing first impression。
- Atmospheric Glass：透明/玻璃风格和特殊 alpha 值。
- Soft Mauve：色卡派生主题。

浏览器验证：

- 桌面宽度下三栏布局稳定。
- 移动宽度下无横向溢出。
- 四个预览 tab 都能随主题切换。
- Inspector 能显示 Markdown 正文和 warnings。

## 首版完成标准

- 本地运行 React/Vite 后能看到主题工作台。
- `themes/*.md` 和 `palettes/*.md` 都能出现在 Library。
- 点击任一条目能切换 Stage 主题。
- 四个预览 tab 都可用。
- 色卡能以中性基础模板派生为完整主题。
- 至少现有全部 Markdown 文件不会导致应用崩溃。
- 解析 warning 可见，不隐藏数据质量问题。
