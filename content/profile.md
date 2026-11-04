---
name: Hanning Wang
tagline: Building data pipelines and systems for large-scale LLM pretraining.
title: Undergrad @
institution: SJTU ACM Class
email: theunknownthing@sjtu.edu.cn
github: theunknownthing
twitter: Hanning__Wang
cv: ./cv
avatar: assets/avatar.jpg
updated: November 2026
---

I am an undergraduate in the [ACM Honors Class](https://acm.sjtu.edu.cn) at [Shanghai Jiao Tong University](https://www.sjtu.edu.cn) and a research intern at the [Shanghai Innovation Institute](https://sii.edu.cn), co-advised by [Dr. Pengfei Liu](https://scholar.google.com/citations?user=oIz_CYEAAAAJ&hl=en) and [Dr. Siyuan Feng](https://syfeng.net). I work on **data and systems for large-scale LLM pretraining**.

I contributed to [**801-30B-A3B-Base**](https://github.com/GAIR-NLP/801-30B), a 30B-parameter mixture-of-experts model trained from scratch on 11.8T tokens. My work spans large-scale data acquisition and processing, retrieval and synthesis, and efficient long-context training. See our [technical report](https://github.com/GAIR-NLP/801-30B/blob/main/report.pdf).

## Research Experience

<div class="research-experience-list">
  <div class="research-experience">
    <a class="research-experience-logo" href="https://sii.edu.cn" aria-label="Shanghai Innovation Institute">
      <img src="assets/sii-icon.png" alt="Shanghai Innovation Institute logo">
    </a>
    <div class="research-experience-content">
      <div class="research-experience-heading">
        <div>
          <strong><a href="https://sii.edu.cn">Shanghai Innovation Institute</a></strong>
          <span class="research-experience-role">Research Intern</span>
        </div>
        <span class="research-experience-date">Summer 2026&ndash;Present</span>
      </div>
      <p class="research-experience-advisors">Co-advised by <a href="https://scholar.google.com/citations?user=oIz_CYEAAAAJ&amp;hl=en">Dr. Pengfei Liu</a> and <a href="https://syfeng.net">Dr. Siyuan Feng</a>.</p>
      <p>Building pretraining data pipelines and training infrastructure for thousands of GPUs, with contributions to <a href="https://github.com/GAIR-NLP/801-30B">801-30B-A3B-Base</a>.</p>
      <ul>
        <li><strong>Attention-balanced sampling:</strong> Implemented a sampler that balances attention workloads across data-parallel ranks, achieving 2.26&times; training throughput with 256K context; authored <a href="https://github.com/GAIR-NLP/801-30B/blob/main/report.pdf#page=22">&sect;7.1 of the technical report</a>.</li>
        <li><strong>Data acquisition and retrieval:</strong> Crawled hundreds of terabytes of raw PDF data and helped scale the midtraining data retrieval pipeline.</li>
        <li><strong>Data processing and synthesis:</strong> Built PDF and code data processing and retrieval pipelines, and capability-oriented data synthesis pipelines.</li>
        <li><strong>Training infrastructure:</strong> Optimized context parallelism and developed faster training kernels. Worked closely with the pretraining team to investigate training issues and implement features.</li>
        <li><strong>Vision-language training:</strong> Contributed dataloader and model support and reviewed related pull requests.</li>
      </ul>
    </div>
  </div>
  <div class="research-experience">
    <a class="research-experience-logo" href="https://plms.ai" aria-label="GAIR Lab">
      <img src="assets/sjtu-logo.svg" alt="Shanghai Jiao Tong University logo">
    </a>
    <div class="research-experience-content">
      <div class="research-experience-heading">
        <div>
          <strong><a href="https://plms.ai">GAIR Lab</a></strong>
          <span class="research-experience-role">Research Intern</span>
        </div>
        <span class="research-experience-date">Summer 2025</span>
      </div>
      <p class="research-experience-advisors">Advised by <a href="https://scholar.google.com/citations?user=oIz_CYEAAAAJ&amp;hl=en">Dr. Pengfei Liu</a>.</p>
      <p>Researched LLM mid-training and post-training, focusing on efficient training data that improves agentic capabilities.</p>
    </div>
  </div>
</div>

## Publications & Technical Reports

- **No Second Run: Does RSI Stop at Frontier Pre-training?**
  SII & Xinxu AI (**Hanning Wang**, contributor).
  *Technical report, 2026.* [Report](https://github.com/GAIR-NLP/801-30B/blob/main/report.pdf) · [Project](https://github.com/GAIR-NLP/801-30B)

- **davinci-dev: Agent-native mid-training for software engineering**  
  Ji Zeng, Dayuan Fu, Tiantian Mi, Yumin Zhuang, Yaxing Huang, Xuefeng Li, Lyumanshan Ye, Muhang Xie, Qishuo Hua, Zhen Huang, Mohan Jiang, **Hanning Wang**, Jifan Lin, Yang Xiao, Jie Sun, Yunze Wu, Pengfei Liu.  
  *ICML'26 Spotlight.* [Paper](https://arxiv.org/pdf/2601.18418) · [Code](https://github.com/GAIR-NLP/daVinci-Dev)

## Navigate

<ul class="profile-nav">
  <li><a href="./cv">CV <svg class="inline-arrow-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></a></li>
  <li><a href="publications.html">Publications <svg class="inline-arrow-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></a></li>
  <li><a href="https://theunknownth.ing/">Blog <svg class="inline-arrow-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></a></li>
  <li><a href="projects.html">Projects <svg class="inline-arrow-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></a></li>
</ul>
