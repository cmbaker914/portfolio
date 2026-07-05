// Edit this file with your real information — everything here is placeholder
// content carried over from the design mockup.

export const site = {
  name: 'Iris Calderón',
  role: 'Biomedical ML researcher',
  email: 'iris@fieldnotes.bio',
  terminalUser: 'iris.calderón@lab:~$ ./portfolio',
  version: 'v2.6 · 2026',
}

export const nav = [
  { label: "Things I've made", to: '/projects' },
  { label: 'Field notes', to: '/blog' },
  { label: 'CV', to: '/cv' },
  { label: 'Hi', to: '/' },
]

export const projects = [
  {
    n: '01',
    slug: 'latent-anatomies',
    title: 'Latent anatomies',
    tag: 'representation learning',
    year: '2025',
    fig: 'scatter',
    blurb:
      'Self-supervised embeddings of whole-slide pathology — what a tumor looks like before anyone labels it.',
    long: 'Self-supervised embeddings of whole-slide pathology images. The model learns tissue structure with no labels, then a thin classifier on top matches supervised baselines with a fraction of the annotation.',
  },
  {
    n: '02',
    slug: 'arrhythmia-atlas',
    title: 'The arrhythmia atlas',
    tag: 'signal models',
    year: '2025',
    fig: 'ecg2',
    blurb: 'A foundation model for 12-lead ECG that triages by feel, then explains itself.',
    long: 'A foundation model for 12-lead ECG. Pretrained on millions of unlabeled traces, it triages by similarity and surfaces the beats that drove each call — so a cardiologist can argue with it.',
  },
  {
    n: '03',
    slug: 'counterfactual-cohorts',
    title: 'Counterfactual cohorts',
    tag: 'causal inference',
    year: '2024',
    fig: 'bars',
    blurb: 'Causal ML for ICU treatment effects, built to survive a skeptical clinician.',
    long: 'Causal machine learning for ICU treatment effects. Doubly-robust estimators with honest confidence intervals, validated against a held-out trial so the numbers mean what they say.',
  },
  {
    n: '04',
    slug: 'folding-quietly',
    title: 'Folding, quietly',
    tag: 'structural biology',
    year: '2024',
    fig: 'contour2',
    blurb: 'Structure priors for antibody design that prefer being right over being clever.',
    long: 'Structure priors for antibody design. A small, conservative model that prefers being right over being clever — fewer hallucinated loops, more candidates that actually express.',
  },
]

export const posts = [
  {
    slug: 'what-a-umap-can-tell-you',
    date: 'May 2026',
    kicker: 'methods',
    title: 'What a UMAP can and can’t tell you',
    read: '9 min',
    author: 'Iris Calderón',
    body: [
      'Every few weeks someone sends me a UMAP and asks what it means. The honest answer is: less than you’d hope, and a little more than nothing.',
      'A dimensionality reduction is a compression. It throws away most of what it was given and keeps whatever made the optimizer happiest. The clusters you see are real in the sense that the algorithm found them — not in the sense that the distance between them means anything in particular.',
    ],
    pullQuote: 'A projection is a sentence about your data, not a photograph of it.',
    bodyAfterQuote: [
      'So here are the rules I actually follow. Trust local neighborhoods; distrust global geometry. Color by something you didn’t train on. And run it three times with different seeds before you put it in a slide.',
    ],
    figureCaption: 'fig. 1 — the same embedding, three seeds. drop a real figure here.',
    closing:
      'None of this makes the plot useless. It makes it a sketch — a fast, cheap way to ask whether your representation noticed the thing you hoped it would. Just don’t mistake the sketch for the territory.',
  },
  {
    slug: 'trained-on-wrong-labels',
    date: 'Apr 2026',
    kicker: 'confession',
    title: 'I trained on the wrong labels for three weeks',
    read: '6 min',
    author: 'Iris Calderón',
    body: ['Placeholder post — replace with the real write-up.'],
  },
  {
    slug: 'notes-on-calibration',
    date: 'Feb 2026',
    kicker: 'opinion',
    title: 'Notes on calibration, for people who hate calibration',
    read: '11 min',
    author: 'Iris Calderón',
    body: ['Placeholder post — replace with the real write-up.'],
  },
]

export const miniKinds = [
  { kind: 'scatter', label: 'embeddings' },
  { kind: 'ecg2', label: 'signals' },
  { kind: 'bars', label: 'benchmarks' },
  { kind: 'heat', label: 'attention' },
  { kind: 'contour2', label: 'loss surface' },
  { kind: 'hist', label: 'calibration' },
]

export const tools = ['PyTorch', 'JAX', 'numpy', 'R', 'SQL', 'Slurm', 'Rust', 'D3']

export const experience = [
  {
    year: '2024',
    title: 'Research intern, Health AI',
    body: 'Uncertainty calibration for clinical triage models. Shipped a thing clinicians actually trusted.',
  },
  {
    year: '2020—2026',
    title: 'Graduate researcher, ML & Medicine Lab',
    body: 'Self-supervised representation learning for pathology and ECG. First-author work at NeurIPS, ICML, Nat. Mach. Intell.',
  },
]

export const education = [
  {
    year: '2026',
    title: 'PhD, Biomedical Informatics',
    body: 'Dissertation: honest representations for clinical machine learning.',
  },
  { year: '2019', title: 'BS, Computer Science & Biology' },
]

export const awards = ['NeurIPS 2025 — Oral', 'NSF Graduate Fellowship', 'Best Paper, ML4H 2024']

export const talks = [
  '“Honest embeddings” — NeurIPS',
  '“Calibration for skeptics” — ML4H',
  '“Reading the body” — invited keynote',
]
