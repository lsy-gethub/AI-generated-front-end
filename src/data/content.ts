import {
  BrainCircuit,
  Cpu,
  Globe2,
  Layers,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export const NAV_LINKS = [
  { label: '首页', href: '#hero' },
  { label: '产品', href: '#product' },
  { label: '技术', href: '#tech' },
  { label: '解决方案', href: '#features' },
  { label: '案例', href: '#cases' },
  { label: '关于我们', href: '#footer' },
] as const

export const STATS = [
  { value: 2400000, suffix: '+', label: '全球开发者', format: 'compact' },
  { value: 12, suffix: 'ms', label: '平均响应延迟', format: 'raw' },
  { value: 86, suffix: '个', label: '全球服务节点', format: 'raw' },
  { value: 99.99, suffix: '%', label: '模型推理准确率', format: 'decimal' },
] as const

export interface Feature {
  icon: LucideIcon
  title: string
  desc: string
  accent: string
}

export const FEATURES: Feature[] = [
  {
    icon: BrainCircuit,
    title: '自适应大模型引擎',
    desc: '多模态推理内核，毫秒级上下文理解，随业务持续进化。',
    accent: '#00d4ff',
  },
  {
    icon: Cpu,
    title: '异构算力调度',
    desc: 'GPU / NPU 统一编排，算力利用率提升至 92% 以上。',
    accent: '#a855f7',
  },
  {
    icon: Globe2,
    title: '全球边缘网络',
    desc: '86 个边缘节点就近推理，让智能触达世界的每一个角落。',
    accent: '#2dd4bf',
  },
  {
    icon: ShieldCheck,
    title: '零信任安全体系',
    desc: '端到端加密与可信执行环境，守护每一比特数据资产。',
    accent: '#00d4ff',
  },
  {
    icon: Layers,
    title: '数字孪生中台',
    desc: '物理世界的实时镜像，仿真、预测与决策一体化。',
    accent: '#a855f7',
  },
  {
    icon: Workflow,
    title: '智能体工作流',
    desc: '可视化编排自主智能体，让复杂业务流程自动运转。',
    accent: '#2dd4bf',
  },
] as const

export const BRANDS = [
  'QUANTUM',
  'STELLARIS',
  'ORBITAL',
  'HELIX',
  'NOVAPAY',
  'AETHER',
  'ZENITH',
  'PULSAR',
  'VERTEX',
  'IONGRID',
] as const

export const CASES = [
  {
    company: 'STELLARIS 航天',
    field: '卫星星座 · 遥感智能',
    quote: '在轨数据处理延迟从分钟级压缩到秒级，让每一颗卫星都成为实时感知节点。',
    metric: '38×',
    metricLabel: '数据处理加速',
  },
  {
    company: 'NOVAPAY 金融',
    field: '实时风控 · 反欺诈',
    quote: '毫秒级图推理引擎让欺诈交易在发生之前被拦截，年挽回损失超十亿元。',
    metric: '99.7%',
    metricLabel: '欺诈拦截率',
  },
  {
    company: 'IONGRID 能源',
    field: '电网数字孪生 · 调度优化',
    quote: '整座城市电网的实时孪生体，让调度决策从经验驱动变为智能驱动。',
    metric: '21%',
    metricLabel: '能耗降低',
  },
] as const

export interface ArchNode {
  id: string
  label: string
  desc: string
  x: number
  y: number
  accent: string
}

export const ARCH_NODES: ArchNode[] = [
  { id: 'edge', label: '边缘接入层', desc: '全球 86 节点就近接入，毫秒级采集终端与 IoT 数据流。', x: 10, y: 50, accent: '#2dd4bf' },
  { id: 'gateway', label: '智能网关', desc: '协议适配、流量治理与零信任鉴权的统一入口。', x: 30, y: 20, accent: '#00d4ff' },
  { id: 'stream', label: '实时数据流', desc: '每秒千万级事件的流式处理与特征计算管线。', x: 30, y: 80, accent: '#00d4ff' },
  { id: 'core', label: 'AI 推理核心', desc: '多模态大模型推理集群，自适应算力调度中枢。', x: 55, y: 50, accent: '#a855f7' },
  { id: 'twin', label: '数字孪生引擎', desc: '物理资产的实时镜像，仿真推演与预测性决策。', x: 78, y: 22, accent: '#a855f7' },
  { id: 'app', label: '行业应用层', desc: '面向航天、金融、能源的智能应用与开放 API。', x: 88, y: 62, accent: '#2dd4bf' },
] as const

export const ARCH_EDGES: Array<[string, string]> = [
  ['edge', 'gateway'],
  ['edge', 'stream'],
  ['gateway', 'core'],
  ['stream', 'core'],
  ['core', 'twin'],
  ['core', 'app'],
  ['twin', 'app'],
]
