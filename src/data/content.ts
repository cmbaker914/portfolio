// Edit this file with your real information — everything here is placeholder
// content carried over from the design mockup.

import { asset } from '../lib/asset.js'

export interface SiteMeta {
  name: string
  role: string
  cvSubtitle: string
  email: string
  terminalUser: string
  version: string
}

export interface NavItem {
  label: string
  to: string
}

export interface Project {
  n: string
  slug: string
  title: string
  tag: string
  year: string
  fig: string
  image?: string
  link?: string
  blurb: string
  long: string
}

export interface Post {
  slug: string
  date: string
  kicker: string
  title: string
  read: string
  author: string
  body: string[]
  pullQuote?: string
  bodyAfterQuote?: string[]
  figureCaption?: string
  closing?: string
}

export interface ExperienceEntry {
  org: string
  location: string
  title: string
  year: string
  bullets?: string[]
  // Optional single-paragraph alternative to `bullets`, rendered by CVView.
  body?: string
}

export interface EducationEntry {
  org: string
  location: string
  title: string
  year: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export const site: SiteMeta = {
  name: 'Casey Baker, PhD',
  role: 'Machine Learning Researcher',
  cvSubtitle: 'Machine learning · neuroscience · remote sensing',
  email: 'cmbaker191@gmail.com',
  terminalUser: 'casey.baker@lab:~$ ./portfolio',
  version: 'v0.0.1 · 2026',
}

export const nav: NavItem[] = [
  { label: "Projects", to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'CV', to: '/cv' },
  { label: 'Home', to: '/' },
]

export const projects: Project[] = [
  {
    n: '01',
    slug: 'lidar-detection',
    title: 'Object Detection on Streaming LiDAR Data with Active Learning',
    tag: 'active learning',
    year: '2025',
    fig: 'scatter',
    image: asset('lidar.jpg'),
    link: 'https://www.exptechinc.com/wp-content/uploads/2025/05/Baker_MSS_Paper_AprilMay_2025_Approved.pdf',
    blurb:
      'Published in Military Sensing Symposia Active E-O Systems',
    long: 'Developed a diversity-based active learning method for object detection on streaming LiDAR point clouds, addressing the limitations of previous methods that were restricted to non-streaming 2D data. Normalized Object Distribution Entropy (NODE) outperformed standard uncertainty-based approaches by achieving higher detection accuracy with fewer labeled samples, thereby improving labeling efficiency for remote sensing and other computer vision applications.',
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

export const posts: Post[] = [
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

export const experience: ExperienceEntry[] = [
  {
    org: 'Expedition Technology',
    location: 'Herndon, VA',
    title: 'Machine Learning Engineer, Scrum Master',
    year: '2024 — Present',
    bullets: [
      'Designed an active learning metric for imbalanced 3D point cloud data streams, improving object detection accuracy by 25% on rare classes, maintaining performance on common classes, and reducing manual labeling by 10%.',
      'Developed a pipeline to reduce speckle noise from commercial radar images and train a transformer-based masked autoencoder for object detection in radar images with varying resolutions.',
      'Collaborated in teams of 4–7 developers to design and evaluate deep learning pipelines for trajectory data and remote sensing image analysis, including anomaly detection, adversarial robustness, self-supervised pretraining, and 2D/3D object detection.',
    ],
  },
  {
    org: 'Duke University',
    location: 'Durham, NC',
    title: 'PhD Candidate, NSF Graduate Research Fellow',
    year: '2020 — 2023',
    bullets: [
      'Built a deep learning pipeline to predict underlying neural activity using spatiotemporal information from fluorescence videos, improving detection of low signal-to-noise events and spike rate prediction by 14%.',
      'Designed a semi-supervised deep learning pipeline for neuron segmentation using ¼ as many ground truth labels as fully supervised methods, while maintaining accuracy on par with human labeling.',
      'Developed a computational model of the visual cortex and applied machine learning to identify network properties of optimal pattern completion neurons.',
    ],
  },
  {
    org: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    title: 'Senior Research Support Associate',
    year: '2018 — 2020',
    bullets: [
      'Performed and analyzed experiments testing the behavioral effects of activating and silencing neurons in C. elegans.',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    org: 'Duke University',
    location: 'Durham, NC',
    title: 'PhD, Biomedical Engineering · Certificate in College Teaching · GPA 4.0',
    year: '2020 — 2023',
  },
  {
    org: 'University of Virginia',
    location: 'Charlottesville, VA',
    title: 'B.S. Biomedical Engineering, B.A. Psychology · GPA 3.91',
    year: '2014 — 2018',
  },
]

export const publications: string[] = [
  'Baker, C., Daniel, B., Immel, E., Bogart, C. (2025). Object Detection on Streaming LiDAR Data with Active Learning. Military Sensing Symposia — Active E-O Systems.',
  'Baker, C., Gong, Y. (2023). A semi-supervised pipeline for accurate neuron segmentation with fewer ground truth labels. eNeuro.',
  'Baker, C., Gong, Y. (2023). Identifying properties of pattern completion neurons in a computational model of the visual cortex. PLoS Computational Biology.',
  'Huang, Y-C., Luo, J., Huang, W., Baker, C., Gomes, M., Byrne, A., Flavell, S. (2023). A single neuron in C. elegans orchestrates multiple motor outputs through parallel modes of transmission. Current Biology.',
  'Beltzer, M., Moulder, R., Baker, C., Comer, K., Teachman, B. (2022). Effects of mass shootings on mental illness stigma in the United States. Personality and Social Psychology Bulletin.',
  'Ji, N., Madan, G., Fabre, G., Dayan, A., Baker, C., Kramer, T., Nwabudike, I., Flavell, S. (2021). A neural circuit for flexible control of persistent behavioral states. eLife.',
]

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['Python', 'MATLAB', 'R'] },
  {
    label: 'Frameworks / libraries',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NetworkX', 'NumPy', 'Pandas', 'Ray'],
  },
  { label: 'MLOps', items: ['CI/CD', 'Docker', 'Git', 'MLflow', 'Airflow'] },
]
