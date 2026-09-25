---
layout: post
title: "Curated insights Q4"
description: ""
comments: false
category: "Curated Insights"
keywords: ""
---
<!-- markdownlint-disable MD033 MD020 MD025-->
# My favorites<a name="favorites"></a>
- [Bold take on why code review is the wrong place for knowledge-sharing and quality checks — shift pairing and design discussion left instead.](https://martinfowler.com/rachels-ramblings/code-review.html){:target="_blank"}
- [An open-source CLI agent that autonomously reads papers, writes ML code, and ships models via the Hugging Face ecosystem — worth a spin if you're prototyping ML pipelines.](https://github.com/huggingface/ml-intern){:target="_blank"}
- [A reminder that psychological safety and trust beat any AI tool—if leadership treats AI as a headcount excuse, you'll tank the culture that actually drives output.](https://newsletter.eng-leadership.com/p/good-culture-is-the-biggest-productivity){:target="_blank"}

## Agile, Leadership and Product<a name="agile"></a>
- [A sharp take on why decision-making, not coding, is now the bottleneck — and why decision-empowerment beats endless alignment meetings.](https://dpereira.substack.com/p/the-art-of-simplifying-decisions){:target="_blank"}

## Architecture, Development & Software development practices <a name="development"></a>
- [One dev approval plus an AI reviewer beat mandatory double human review — a pragmatic fix worth stealing before PR queues drown your team.](https://spin.atomicobject.com/pr-reviews-teams-focus/){:target="_blank"}
- [Blender's going all-in on making small studios capable of full-length films — worth a read if you ever wonder how far open source tooling can stretch.](https://code.blender.org/2026/09/small-teams-ambitious-projects/){:target="_blank"}
- [A CSS performance deep-dive turned meditation on frontend's shrinking audience — worth reading for the style-recalculation debugging tips alone.](https://nolanlawson.com/2026/08/23/the-asteroid-currently-hitting-frontend-web-development/){:target="_blank"}
- [Fun rabbit hole for anyone who forgets what a 'monad' or 'currying' means mid-conversation — an interactive glossary that turns FP jargon into a browsable graph.](https://hemanth.github.io/functional-programming-jargon/){:target="_blank"}

## AI, LLM & Machine Learning<a name="ai"></a>
- [Layer streaming trains an 8B model on a 4GB laptop GPU by paging frozen layers off VRAM — clever trick, though verify their bit-exactness claims before betting production on it.](https://github.com/MakazhanAlpamys/Soup){:target="_blank"}
- [A hands-on walkthrough of building an on-device OCR receipt scanner with LiteRT.js and Gemma — no cloud API, your data never leaves the browser.](https://blog.logrocket.com/building-browser-based-receipt-scanner-litert-js/){:target="_blank"}
- [An open-source stack that turns raw docs into RAG, a ReAct agent with tool/sandbox access, and a self-maintaining wiki with knowledge graphs — worth a look if you're tired of rebuilding retrieval pipelines from scratch.](https://github.com/Tencent/WeKnora){:target="_blank"}
- [A practical breakdown of engineering reliable agent loops from scratch — worth watching if you're building anything beyond a simple prompt-response AI feature.](https://www.youtube.com/watch?v=xIt_mTQp6mY){:target="_blank"}
- [Honest retrospective on building an internal AI agent that went from ClickHouse queries to company-wide use — great read on what actually drives adoption.](https://oioannou.com/blog/internal-company-agent-lessons/){:target="_blank"}
- [A grounded look at why 'move data to the cloud' never actually solved the data-readiness problem — and why AI is about to repeat that same mistake.](https://www.thoughtworks.com/insights/blog/machine-learning-and-ai/ai-ready-data-part-1){:target="_blank"}
- [A free, open-source AI chat interface that auto-picks the best open model for your prompt — handy for testing without vendor lock-in.](https://huggingface.co/chat/){:target="_blank"}
- [Colibri streams MoE experts straight from disk, letting a 2.8T-parameter model like Kimi-K3 run on consumer hardware — no fine-tuning, no massive VRAM required.](https://justvugg.github.io/colibri/){:target="_blank"}
- [A 27B-class reasoning model squeezed to ~6GB via ternary weights, retaining 98% of FP16 quality — worth a look if you're serving LLMs on constrained hardware.](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf){:target="_blank"}

## DevOps, Observability & Security<a name="devops"></a>
- [Great read on why user-level A/B tests break in two-sided marketplaces — budget cannibalization skews results, and splitting budgets per variant fixes it cleanly.](https://engineering.zalando.com/posts/2026/09/scaling-reliable-experimentation-in-two-sided-adtech-marketplace.html){:target="_blank"}

## Tools and things from Github <a name="tools"></a>
- [An agent skill that turns a codebase description into self-contained, interactive architecture diagrams—useful for grounding PR reviews with real before/after topology diffs.](https://github.com/tt-a1i/archify){:target="_blank"}
- [A local-first agent workspace that logs every model message, tool call, and permission decision as an append-only record — worth a look if you care about auditable AI workflows.](https://github.com/apache/maka){:target="_blank"}
- [Swap port numbers for stable .localhost URLs in local dev — small DX win, especially handy for keeping agent and human workflows sane across multiple running apps.](https://github.com/vercel-labs/portless){:target="_blank"}
- [A local-first CRM for founders running a fundraising round—investor scoring with sources shown, pipeline tracking, and outreach, all in one SQLite file you own.](https://github.com/lalalune/outreachr){:target="_blank"}
- [A dbt package that unifies ad spend, clicks, and impressions across a dozen platforms into one reporting model—handy if you're tired of stitching marketing dashboards by hand.](https://github.com/fivetran/dbt_ad_reporting){:target="_blank"}
- [A free, no-watermark alternative to Screen Studio for polished demo videos — auto-zoom, on-device captions, and full commercial use. Now archived, but a community fork carries it forward.](https://github.com/siddharthvaddem/openscreen){:target="_blank"}
- [Open-source guidelines that stop AI agents from writing outdated Go — teaches them max(), slices.Contains, cmp.Or, and other idioms your linter shouldn't have to flag.](https://github.com/JetBrains/go-modern-guidelines){:target="_blank"}
- [Record slick terminal demo GIFs from a simple text script — great for README docs or PR walkthroughs without wrestling with screen recorders.](https://github.com/charmbracelet/vhs){:target="_blank"}
- [An AI-powered data exploration tool that branches your questions into visual threads instead of burying them in chat history — worth a look if you're tired of losing context mid-analysis.](https://github.com/microsoft/data-formulator){:target="_blank"}
- [OpenAI's spec for turning tickets into autonomous coding runs with proof-of-work attached — worth a read even if you just steal the harness-engineering pattern.](https://github.com/openai/symphony){:target="_blank"}
- [Nice writeup on squeezing a 27B Qwen model onto a single 24GB card with vLLM patches and speculative decoding — solid read if you're GPU-poor and tired of paying for API tokens.](https://github.com/syv-ai/HyperQwen){:target="_blank"}
- [Turn a project into a polished launch video with one command — a fun way to close out a build and actually share it instead of letting it die in a repo.](https://github.com/latent-spaces/brag){:target="_blank"}
- [Google's open-source runtime for running millions of agent sandboxes with 10x container density and sub-500ms resume — worth a look if you're scaling agentic workloads on k8s.](https://github.com/agent-substrate/substrate){:target="_blank"}
- [Google's new agent orchestrator treats agents as first-class workloads — sandboxed, network-fenced, and resumable. Worth a look if you're tired of duct-taping agent infra yourself.](https://github.com/google/ax){:target="_blank"}
- [Alibaba's battle-tested internal code reviewer, now open source — line-precise LLM review with a built-in ruleset for NPE, XSS, and SQL injection, 9x leaner on tokens than Claude Code.](https://github.com/alibaba/open-code-review){:target="_blank"}
- [A native desktop app in ~6MB, no Electron bloat, no Rust build step. If you're sick of shipping 150MB wrappers for a webview, this is worth a look.](https://tinyjs.app/){:target="_blank"}
