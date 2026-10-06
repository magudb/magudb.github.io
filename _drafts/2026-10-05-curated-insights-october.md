---
layout: post
title: "Curated insights -October"
description: ""
comments: false
category: "Curated Insights"
keywords: ""
---
<!-- markdownlint-disable MD033 MD020 MD025-->
# My favorites<a name="favorites"></a>
- [Etienne argues the real 2027 risk isn't your team's AI adoption but customers quietly delegating to agents and vanishing from your dashboards. Worth reading before your next planning cycle.](https://ctosub.com/p/the-ctos-2027-reckoning?utm_source=post-email-title&publication_id=1951306&post_id=218812432&utm_campaign=email-post-title&isFreemail=true&r=6hw23p&triedRedirect=true&utm_medium=email){:target="_blank"}
- [Zalando open-sources an identity broker that lets AI agents act for users without ever holding their provider tokens. Worth reading for the delegation-chain design and the user-agent permission intersection model.](https://engineering.zalando.com/posts/2026/09/agentic-platform-open-sourcing-agentic-identity-broker.html){:target="_blank"}
- [A jury just held Meta and Google liable for addictive design, and this MIT research shows good-faith design thinking can walk teams into the same trap. Useful ideas for guardrails: values-first KPIs and pausing before you scale.](https://sloanreview.mit.edu/article/why-design-thinking-needs-a-responsibility-reboot/){:target="_blank"}

## Agile, Leadership and Product<a name="agile"></a>
- [Practical walkthrough of syncing a React design system (shadcn/ui, Tailwind v4, Storybook) into Claude Design with /design-sync, so it uses your real components instead of inventing lookalikes.](https://nitayneeman.com/blog/how-to-sync-a-design-system-with-claude-design/){:target="_blank"}
- [Agents can fill in domain gaps, but they can't replace seeing the work. A practical case for getting your whole dev team hands-on with users' real workflows early, especially in high-stakes domains.](https://spin.atomicobject.com/walk-the-halls-better-product/){:target="_blank"}
- [Most of us won't become AI-native, and that's fine. This frames AI-first as a deliberate redesign of workflows and autonomy boundaries, with a useful shift from execution to judgment.](https://www.thoughtworks.com/insights/articles/path-to-ai-first-organization){:target="_blank"}
- [Figma makes the case for students building real products instead of slide decks. The takeaways translate to teams: shared workspaces, structured critique, and iterating on feedback beat describing ideas.](https://www.figma.com/blog/the-power-of-product-based-learning/){:target="_blank"}
- [A team skipped code reviews to move faster, then watched agents copy one "passable" implementation everywhere. Worth reading before you decide what review means when agents write the code.](https://www.manager.dev/newsletter/the-broken-windows-theory-of-coding-agents){:target="_blank"}
- [A talk on why software factories fail. I couldn't pull the transcript, so I'm going by the title: worth a watch if you're building process-heavy delivery pipelines and want to avoid the usual traps.](https://www.youtube.com/watch?v=Ib5GBkD555M){:target="_blank"}
- [Camille Fournier, author of The Manager's Path, on what AI changes for managers in 2026: technical skills, signal processing, and people skills. A grounded take, not sci-fi hype.](https://skamille.medium.com/the-managers-path-in-the-age-of-ai-279cb6611d66){:target="_blank"}

## Architecture, Development & Software development practices <a name="development"></a>
- [Offline support and real-time sync turn out to be the same problem: client IDs, optimistic mutations, conflict resolution. Hands-on notes from building with Verdant and TanStack DB. Read before adopting local-first.](https://marmelab.com/blog/2026/09/09/real-time-and-offline-are-the-same-problem.html){:target="_blank"}
- [GitHub moved Primer off CSS-in-JS to CSS Modules without breaking the site, using feature flags and visual regression tests. A solid playbook for incremental migrations, and a reminder that native CSS often wins.](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/){:target="_blank"}
- [Martin Fowler and Eric Evans sit down at DDD Europe 2026. I couldn't pull a transcript, but if you care about domain modeling, an hour with these two is worth it.](https://www.youtube.com/watch?v=fndU_B5rmPE){:target="_blank"}

## AI, LLM & Machine Learning<a name="ai"></a>
- [Imprint's year of AI adoption, ending in a Linear-driven agent loop that audits goals, metrics and issues, then ships PRs. A practical blueprint if you're figuring out the software factory pattern.](https://lethain.com/software-factory-experiment/?utm_source=substack&utm_medium=email){:target="_blank"}
- [Stripe's homegrown coding agents merge over a thousand PRs a week, with humans still reviewing. A rare look at what one-shot, end-to-end agents look like in production, not a demo.](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents){:target="_blank"}
- [StrongDM's team ditched hand-written and human-reviewed code, using holdout-style scenarios instead of tests to keep agents honest. Provocative, but the scenario-vs-test distinction is worth stealing.](https://factory.strongdm.ai/){:target="_blank"}
- [Pi 1.0 is a deliberately minimal, extensible coding-agent harness that only adds features once they've proven themselves. Worth a read for the Codemode and deferred tool loading ideas, and Pi Durable for long-running agents.](https://earendil.com/posts/pi-1-0/){:target="_blank"}
- [Define your agent team in YAML and boot Claude Code and Codex as one persistent, role-based system. Worth a look if you're tired of juggling loose terminal sessions.](https://github.com/mvschwarz/openrig?utm_source=substack&utm_medium=email){:target="_blank"}
- [A Microsoft hackathon built with Copilot coding agents, where non-developers shipped real features. The takeaway is that tests, repo instructions and PR reviews keep prompt-driven development from becoming vibe coding.](https://deanhume.com/prompt-driven-development-building-with-github-copilot-coding-agents/){:target="_blank"}
- [A practical framework for judging the quality of context you feed AI agents, tying bad context to real costs: tokens, liability, and security. Worth reading before your next agent rollout.](https://www.atlassian.com/blog/ai-at-work/cafes-framework){:target="_blank"}

## DevOps, Observability & Security<a name="devops"></a>

## Tools and things from Github <a name="tools"></a>
- [Agents acting on a user's behalf need more than a shared API key. This broker covers consent, an encrypted token vault, and RFC 8693 token exchange. Worth reading if you're building agent auth.](https://agenticidentitybroker.dev/){:target="_blank"}
- [Self-hosted, AGPLv3 search engine that indexes the pages and files you actually read, with no telemetry. The MCP integration lets your AI assistant search your own knowledge, which is the part I'm keen to try.](https://hister.org/){:target="_blank"}
- [A skill pack that gives your coding agent real design vocabulary (/polish, /distill, /clarify) so it stops shipping beige, card-in-card AI slop. Works across Claude Code, Cursor, Copilot and more. Free, worth trying.](https://impeccable.style/){:target="_blank"}
- [A GPU-accelerated, native (no Electron) IDE and terminal multiplexer written in Go, with e2e-encrypted peer networking and a headless Docker mode. Worth a look if you hop between machines.](https://github.com/unstablebuild/rune){:target="_blank"}
