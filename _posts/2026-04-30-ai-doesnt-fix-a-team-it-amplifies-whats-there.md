---
layout: post
title: "AI Doesn't Fix a Team — It Amplifies What's There"
description: "The longer cut of my Engineering Managers Meetup talk, with the research that didn't fit on stage: the METR perception-reality gap, the DORA amplifier finding, Repenning and Sterman's capability trap, and why workslop is the visible symptom of management failure under AI pressure."
comments: false
category: "Engineering Leadership"
keywords: "AI adoption, engineering leadership, workslop, DORA 2025, METR study, pilot mindset, capability trap, Repenning Sterman, digital dexterity, grassroots AI, CTO, agency"
---
<!-- markdownlint-disable MD033 MD020 MD025-->

So I gave a talk yesterday at the [Engineering Managers Meetup](https://www.meetup.com/engineering-leadership-meetup-denmark/events/313793623/) in Copenhagen called *The Grassroots Revolution*. The short version is [already on this blog](https://udbjorg.net/2026/04/the-grassroots-revolution-building-ai-native-engineering-teams). This is the longer one, with all the things I didn't have time to walk through on stage.

My thesis is simple: AI adoption in engineering teams is already happening, top-down mandates make it worse, and your job as a leader is to amplify the experts you already have. If that were the whole story, the first post would do the job.

But the more I prepared, the more I felt the thesis didn’t go deep enough. The question isn’t “how do we adopt AI faster?” The question is: what kind of work, and what kind of workers, are we producing when we use it badly?

The answer pulls in two directions: empirical research that keeps undercutting the productivity hype, and a nearly-25-year-old MIT paper on why improvement programs fail. We’ll get to both.

## The illusion of speed

Start with the numbers, because the numbers are not what you've been told.

In a [randomised controlled trial](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) by the AI safety nonprofit METR, sixteen experienced open-source developers worked through 246 real issues from their own large repositories (22,000+ stars, over a million lines of code). For each issue, AI use was randomly allowed or disallowed. The developers used Cursor Pro with Claude 3.5 / 3.7 Sonnet, exactly the setup most of our teams are running.

The result:

- **Before** the study, developers expected AI to make them **24% faster**.
- **After** the study, they reported AI had made them **20% faster**.
- **Measured reality**: AI made them **19% slower**.

That gap between felt productivity and actual productivity is the finding I keep coming back to. The developers weren't lying. They genuinely *felt* accelerated. They were also genuinely slower. AI does something to our perception of work that is not what's actually happening to the work.

If you want a reality check at the org level, [DX's longitudinal study](https://getdx.com/news/new-data-ais-impact-on-engineering-velocity-is-more-modest-than-expected/) tracked 400+ companies from November 2024 through February 2026. AI usage in their codebases grew 65%. Median PR throughput rose 7.76%; mean rose 13.1%; the 90th percentile reached only ~44%; most organizations landed in the 5–15% range. That's real, useful movement. But it's an order of magnitude below the "2-3× productivity" claims that have been driving boardroom AI strategies. Coding is one piece of engineering work. Planning, alignment, code review, and coordination are the rest, and current AI doesn't move those needles much.

Stanford's [2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report) is consistent with this: AI lifts customer-service productivity by ~14% and software development by ~26%, but the gains do not appear in tasks that require judgment. AI raises the floor on routine work. It does not raise the ceiling on craft.

Where are we then? real but modest gains, badly mismatched to leaders' expectations, with a perception layer that makes everything feel faster than it is. Now what happens when you take that picture and add pressure?

## AI is an amplifier

The [2025 DORA Report](https://dora.dev/research/2025/dora-report/) (Google's annual study of software delivery performance) has the amplifier effect as its central thesis. Google Cloud's own [announcement post](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) puts it in a single sentence I think every engineering leader should keep visible:

> AI doesn't fix a team. It amplifies what's already there.

Strong teams use AI to get stronger. Struggling teams use AI to break things faster. Same tool, opposite outcomes.

CodeScene's research on agentic coding puts it more bluntly: ["speed amplifies both good design and bad decisions."](https://codescene.com/blog/agentic-ai-coding-best-practice-patterns-for-speed-with-quality) Their data shows AI agents struggle with the same patterns that confuse humans, and they recommend a Code Health threshold of around 9.5/10 before broad AI deployment. I think the plausible reading is this: the teams who get the celebrated 2-3× speedups are the ones whose codebases and practices were already disciplined enough to absorb the speed. The others get faster collapse.

DORA's 2025 [AI Capabilities Model](https://cloud.google.com/resources/content/2025-dora-ai-capabilities-model-report) identifies seven organisational and technical capabilities that amplify or unlock AI's benefits:

1. **Clear and communicated AI stance** — explicit expectations on use, experimentation, permitted tools.
2. **Strong version control practices** — boring, foundational, and exactly what fast AI-generated change needs to lean on.
3. **Quality internal platforms** — the shared capabilities AI needs to scale.
4. **Working in small batches** — a long-standing DORA principle, especially powerful with AI.
5. **Healthy data ecosystems** — data treated as a strategic asset.
6. **AI-accessible internal data** — connecting AI to repos, docs, decision logs.
7. **User-centric focus** — deep grounding in the end-user's experience.

Notice what's not on the list: tool selection. Vendor choice. Adoption rate. The seven capabilities are everything *around* AI. They are the team's existing condition. They are what gets amplified.

Which means the most important question for AI in your organisation isn't *which tool*. It's *which culture*.

## The capability trap

The mechanism behind that amplification has been documented in management research for decades. It just got renamed when AI showed up.

Nearly twenty-five years ago, in summer 2001, MIT's Nelson Repenning and John Sterman published a paper with one of the best titles in management research: ["Nobody Ever Gets Credit for Fixing Problems That Never Happened: Creating and Sustaining Process Improvement"](https://web.mit.edu/nelsonr/www/Repenning=Sterman_CMR_su01_.pdf). Their target was the **improvement paradox**: companies invest heavily in process improvement, and few efforts produce lasting results.

Their answer is the **capability trap** — a downward spiral with three loops:

- **Work Harder.** Managers under pressure push people to boost throughput now. Throughput goes up; quality of underlying work doesn't change.
- **Work Smarter.** Managers invest in capability — training, refactoring, problem-solving. Throughput dips short-term; capability rises long-term.
- **Shortcuts.** Under sustained pressure, people cut corners on improvement work to free up time for immediate output. Throughput temporarily holds. Capability gradually erodes. Because capability erodes slowly, managers blame motivation instead of structure. The cycle is self-confirming.

Map this onto AI adoption and the picture is uncomfortably clean.

A leadership team adopts AI tools (rational). A productivity mandate goes out: "use AI to ship more" (also rational, in isolation). Engineers feel the pressure. The shortcut path is *right there*: let the model write it, let the model review it, let the model summarise it, ship. Throughput rises in the short run. Bug rates rise too. Change-failure rates rise. Trust between teams erodes. Capability quietly drains while the dashboard says "adoption is up". By the time the second-order numbers are visible, leadership has moved on to the next initiative.

The capability trap doesn't need AI to operate. AI just makes it run faster, with more plausible-looking output, and with a perception layer (METR's "I felt 20% faster") that hides what's happening from the people inside it.

What's interesting, and slightly depressing, is how cleanly this maps onto something we already had a name for. We've just been calling it "AI productivity" instead of "the same trap with a chatbot in it."

This is the structural reason workslop exists.

## The workslop trap

Stanford Social Media Lab's Jeff Hancock and BetterUp's Kate Niederhoffer, with co-authors, named the artifact: [**workslop**](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity). AI-generated output that looks finished but shifts the real thinking onto someone else. The recipient ends up doing the work the model didn't.

The data, from a [BetterUp/Stanford survey](https://www.betterup.com/workslop) of 1,150 full-time U.S. desk workers in September 2025:

- **40%** of surveyed U.S. desk workers received workslop in the last month
- **42%** judged the sender as less trustworthy after receiving it
- **37%** judged them as less intelligent
- Estimated cost: **\$9M per year** for a 10,000-person company — \$186 per employee per month

Workslop is mostly lateral. [Reporting on the BetterUp/Stanford research](https://www.fastcompany.com/91410108/ai-si-creating-workslop) puts roughly 40% peer-to-peer, 18% flowing upward to managers, and 16% flowing downward from managers to teams. So it travels in every direction. This isn't a junior-employee problem. It's a management-system problem, exactly what Repenning and Sterman would predict from a capability trap with AI in it.

The implication is blunt. Niederhoffer, Hancock, and their co-authors put it directly in [the HBR piece](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity):

> Our research points to an uncomfortable answer: The proliferation of workslop is a management failure. Specifically, it is the result of unclear AI mandates and overwhelmed teams.

That second sentence is the capability trap, written in HR language. Unclear mandates set the direction. Overwhelmed teams take the shortcut. The model provides the polish.

The [World Economic Forum's 2026 framing](https://www.weforum.org/stories/2026/01/why-ai-performance-depends-on-how-we-think-talk-and-lead/) lands in the same place: workslop is "polished but hollow AI output that looks finished yet lacks substance, context or accuracy." The artifact is a symptom; the structure produces it.

## Pilots and passengers

[BetterUp and Stanford studied more than 10,000 workers](https://grow.betterup.com/pilots-passengers) across 18 industries and drew the cleanest line through the noise I've seen so far. They describe two archetypal modes. In any given AI interaction, people behave more like one than the other.

| | Passenger | Pilot |
|---|-----------|-------|
| **Loop** | Prompt → accept → send | Prompt → judge → edit → own |
| **Stance** | Discretion delegated to the model | Discretion preserved |
| **Optimisation target** | Volume | Quality |
| **Artifact** | Workslop | Craft |

The data on the population:

- **Only 28%** of the workforce are Pilots.
- Pilots are **3.6× more productive** and **3.1× more likely to stay**.
- When a *manager* models the Pilot mindset, their team is up to **3× more likely** to operate that way.
- Workers trained in relational skills (listening, asking questions, providing context) interact 30% more with AI tools and produce higher-quality work.

Two things from that data are worth holding onto.

First: the manager multiplier. AI culture cascades from how leaders use AI, visibly, with judgment, willing to share failed experiments, far more than from any AI strategy memo. People become Pilots through practice, feedback, and watching someone who already has it. When you model it, your team follows roughly three times faster.

Second: the relational-skills finding hints at something deeper. The people who get the most from AI are not the most technically sophisticated. They're the ones who already know how to be in a real relationship with another mind. They listen. They probe. They contextualise. They expect the conversation to push back. They treat the model the way a senior engineer treats a junior who might be wrong: respectfully, sceptically, and with their own judgment as the final word.

Which is exactly the kind of judgment that erodes first under throughput pressure.

## What gets lost

This is where METR's finding starts to ache. Developers felt 20% faster while being 19% slower. Notice the structure of that gap: the *experience* of judgment has been replaced by the *appearance* of judgment. The model is fluent. The session feels engaged. There's something to react to on every screen. But the actual two-way pushback (the work resisting your idea, your idea reshaping under that resistance) has been hollowed out. You're getting the feeling without the reality.

If you stay in passenger mode long enough, you stop noticing the difference. That's the quiet face of the capability trap: the people inside it can't tell.

The cost of workslop, in this frame, isn't only the \$9M per 10,000 employees. The cost is what happens to people who spend years feeling fast and being slow: their judgment atrophies. Not their skills, their capacity to tell when the answer is good. Teams in pure passenger mode produce more output, work faster, and burn out earlier. The work stops mattering to them, because they've stopped doing the part of the work that made it theirs.

That's not a productivity story. It's a capability story, and Repenning and Sterman saw it coming a quarter-century before LLMs.

The connection back to BetterUp's framework is direct:

- **Passenger mode** = discretion delegated to the model = workslop is the artifact, eroded judgment is the side effect.
- **Pilot mode** = discretion preserved = friction kept alive = quality is the artifact, sustained capability is the side effect.

Workslop isn't just bad output. It's the visible symptom of a team where the people producing the work are no longer being changed by it.

## The leadership reframe

Putting the pieces together:

- Most teams are in a capability trap. AI sharpens the slope.
- Adoption produces real but modest gains (5–15%) wildly mismatched to expectations.
- The perception layer makes those gains feel larger than they are.
- AI amplifies whatever culture is already in place.
- Workslop is the artifact of bad culture under AI pressure.
- The cost compounds: in dollars short-term, in agency long-term.

If you take this seriously, the question for engineering leaders gets bigger than "how do we adopt AI faster":

> How do we use AI in a way that preserves, and ideally deepens, the judgment people bring to their work?

That changes what counts as a good AI rollout. It's not measured by adoption rate or PR velocity. It's measured by whether the engineers using AI are still *thinking*, still owning, still being changed by the work they do.

Pilots stay engaged with the work. Passengers don't.

So concretely, the leader's job is to set up the conditions where Pilot mode is the path of least resistance, and to treat the friction that produces craft and agency as a feature, not a bug.

## What grassroots adoption actually looks like

In every team, one or two people are already deep into AI tools. They've built intuition: when to use the model, when to override, when to throw the answer away. Their colleagues learn from them by watching, asking, copying prompts, riffing in code review.

This peer-to-peer learning works for four specific reasons:

1. **Contextual** — same codebase, same trade-offs.
2. **Trusted** — a peer, not a vendor or a mandate.
3. **Continuous** — happens in standups, reviews, Slack, pairing.
4. **Pull-based** — people learn when they're ready to solve a real problem.

The most useful parallel I've found is [Toyota](https://cloud.google.com/blog/topics/hybrid-cloud/toyota-ai-platform-manufacturing-efficiency), the company that invented lean manufacturing. The Toyota story is *not* "no structure". It's the right kind of structure. Toyota built an internal AI Platform so factory-floor employees could create models without being AI specialists. Nearly 1,200 active users went on to create around 10,000 manufacturing models (up from 8,000 the year before), saving more than 10,000 man-hours annually across 10 factories, with around 400 employees trained internally each year. The lesson is not "no center". It's capability put into the hands of the people closest to the work, supported by the platform and learning that lets them use it.

DORA's framing matters here too: the value comes not from the tools themselves but from the practices and cultural environment around them. Your experts aren't a resource you tap. They're part of the environment. The job is to make sure that environment isn't toxic for Pilot-mode work.

## Five daily behaviours

This is the operational heart of the whole thing. Not slogans. Not strategy decks. Five things you can actually change about how the team works day to day.

| # | Behaviour | What it sounds like |
|---|-----------|---------------------|
| 1 | **Ask for data first** | "What does the data say?" replaces "I think…" |
| 2 | **Start from customer pain** | Every AI experiment ties to a real problem. No demo theatre. |
| 3 | **Pair across functions** | AI-fluent engineers pair with domain experts. The translation is where the value sits. |
| 4 | **Make learning visible** | "What AI thing did you try this week?" — failures celebrated. |
| 5 | **Give permission to rethink** | "Could AI change how we do this?" should feel safe to ask. |

Each of these is, in Repenning and Sterman's vocabulary, a **Work Smarter** loop investment. Asking for data preserves the friction of real evidence. Starting from customer pain preserves the friction of real consequence. Pairing across functions preserves the friction of having to translate. Making learning visible turns mistakes into shared signal instead of private shame. Permission to rethink keeps the work from calcifying into rote.

These are the things that get cut first under throughput pressure. They are also the only things that produce sustainable capability. Defending them is the job.

These are not behaviours you can mandate. They are behaviours you can model. The manager multiplier does the rest.

## Three guardrails

Behaviours are the engine. Guardrails are the rails the engine doesn't jump.

1. **Protect data.** No customer data in unvetted services. This is the only hard rule.
2. **Pilot before scale.** Test on real work before broad rollout. CodeScene's research is unambiguous here: AI performs proportionally to the health of the code it operates in. Deploying agents into a low-Code-Health codebase makes the codebase worse, faster.
3. **Share what you learn.** Knowledge hoarding is the only anti-pattern. Failed experiments need to be cheap to admit.

Trust is the #1 predictor of reducing workslop. Guardrails create the safety for experts to thrive, and for everyone else to start learning from them.

## Replace these instincts

If you find yourself doing the things on the left, you're killing Pilot mode. Try the things on the right instead.

| ❌ Instinct | Why it kills Pilot mode | ✅ Do this instead |
|-----------|-----------------------|-------------------|
| Mandate AI use + expect more output | Recipe for workslop | Set quality bars; define what "good" looks like |
| Standardise one tool for everyone | People adopt what fits their work | Standardise guardrails; let people pick tools |
| Train everyone in a classroom | Doesn't transfer to daily work | Enable peer pairing on real work |
| Approve every use case via committee | Bottleneck + signals distrust | Run small pilots and report back |
| Measure adoption rate | Goodhart's law: gets gamed with slop | Measure speed, quality, customer impact |

The throughline is one sentence: **when you measure adoption, people optimise the metric. When you measure outcomes, people optimise the work.** Outcomes can resonate. Metrics generally cannot.

## A 90-day plan

If you want a single concrete program out of this post, here it is. The trick is not to scale a program. The trick is to nurture a movement.

| Phase | Duration | What you do |
|-------|----------|-------------|
| **See** | Weeks 1–2 | Who are your experts? What are they already doing? Who do people go to? |
| **Connect** | Weeks 3–4 | Bring them together informally. Ask: what's working? What would you do with more time? |
| **Grow** | Month 2 | Create one ritual: bi-weekly 30-minute experiment-sharing. Celebrate useful failures. |
| **Spread** | Month 3+ | Pair experts with non-adopters on *real work*, not training. Measure outcomes, not usage. |

That's the program. No mandatory training. No tooling RFP. No committee. The Pilots already in your team carry the cultural transmission. You provide the venue, the guardrails, and the air cover.

## Wrapping up

The first version of this post said: leaders, your job isn't to be the expert. Make experts visible, connected, and empowered. Still true.

The deeper version, with METR, DX, DORA, and Repenning and Sterman in the room, is more uncomfortable.

Your job isn't only to amplify experts. It's to defend the conditions in which capability can survive contact with AI. That means defending the friction in your team's work. Defending the time it takes to actually judge an AI output. Defending the pairing where one engineer asks the other "are we sure this is right?" Defending the kinds of work where the answer isn't obvious to the model, where the human still has to think.

If you don't, you'll get the picture from the top of this post. Faster shipping, more incidents, higher change-failure rates. Engineers who feel productive while drifting into the slow erosion of capability. A strategy deck nobody believes. AI will have amplified exactly what was already there.

There's a line in Repenning and Sterman's paper that I keep coming back to. *Nobody ever gets credit for fixing problems that never happened.* No one will thank you for the workslop your team didn't ship, the bugs your culture didn't introduce, the burnout you avoided by protecting friction. You'll have to do that work anyway.

The grassroots are already growing. The Pilots are already there. Your job is to see them, grow them, let them spread, and not let the rest of your team drift into the slow erosion of passenger mode.

> **Water the grassroots. Protect the agency. Measure the outcomes, not the usage.**

All this is of course not as simple as I've put it here. Every team is its own animal, and the capability trap looks different in a 6-person startup than in a 600-person org. But I think the direction is right, and I'd rather get the direction right and the details wrong than the other way around.

If you've got a take that disagrees, send it. I'd rather be wrong about this than ship the wrong post. mlu@testaviva.dk, or [the usual places](https://www.linkedin.com/in/magnusudbjorg).

---

**Further reading:**

*Empirical research:*

- METR — [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). Randomised controlled trial: 19% measured slowdown vs. 20% perceived speedup. See also their [2026 update on experiment design](https://metr.org/blog/2026-02-24-uplift-update/) — the perception gap is the durable finding, not the slowdown number.
- DX — [New data: AI's impact on engineering velocity is more modest than expected](https://getdx.com/news/new-data-ais-impact-on-engineering-velocity-is-more-modest-than-expected/) and [AI Productivity Gains Are 10%, Not 10×](https://newsletter.getdx.com/p/ai-productivity-gains-are-10-not). Longitudinal study across 400+ companies: median PR throughput +7.76%, mean +13.1%, 90th percentile ~44%.
- DORA — [2025 State of AI-Assisted Software Development](https://dora.dev/research/2025/dora-report/) and [Google Cloud's announcement post](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) (which contains the verbatim "AI doesn't fix a team. It amplifies what's already there.").
- DORA — [AI Capabilities Model Report](https://cloud.google.com/resources/content/2025-dora-ai-capabilities-model-report). The seven organisational capabilities.
- CodeScene — [Agentic AI Coding: Best-Practice Patterns for Speed with Quality](https://codescene.com/blog/agentic-ai-coding-best-practice-patterns-for-speed-with-quality). "Speed amplifies both good design and bad decisions." Vendor research, but directionally consistent with DORA.
- Stanford HAI — [2026 AI Index Report — Economy](https://hai.stanford.edu/ai-index/2026-ai-index-report/economy). Productivity gains strongest in structured, measurable work; weaker in reasoning-heavy tasks.
- Hancock, Niederhoffer & co-authors in HBR — [AI-Generated 'Workslop' Is Destroying Productivity](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity).
- BetterUp Labs — [Workslop: The Hidden Cost of AI-Generated Busywork](https://www.betterup.com/workslop). 1,150 U.S. desk worker survey (Sept 2025).
- World Economic Forum — [Workslop at Work: Are You an AI Pilot or a Passenger?](https://www.weforum.org/stories/2026/01/why-ai-performance-depends-on-how-we-think-talk-and-lead/) (2026).
- BetterUp — [Pilots vs Passengers research](https://grow.betterup.com/pilots-passengers). 10,000+ workers across 18 industries.

*The structural mechanism:*

- Repenning, N. & Sterman, J. (2001). [Nobody Ever Gets Credit for Fixing Problems That Never Happened: Creating and Sustaining Process Improvement](https://cmr.berkeley.edu/2001/08/43-4-nobody-ever-gets-credit-for-fixing-problems-that-never-happened-creating-and-sustaining-process-improvement/). *California Management Review*, 43(4), 64–88. The capability trap. ([Authors' MIT copy here](https://web.mit.edu/nelsonr/www/Repenning=Sterman_CMR_su01_.pdf).)
- McKinsey — [Reconfiguring Work: Change Management in the Age of Gen AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/reconfiguring-work-change-management-in-the-age-of-gen-ai). The middle-out approach.
- MIT Sloan Management Review — [Why Digital Dexterity Is Key to Transformation](https://sloanreview.mit.edu/article/why-digital-dexterity-is-key-to-transformation/).

If the "feeling fast while being slow" pattern interests you beyond the management literature: sociologist Hartmut Rosa's *[The Uncontrollability of the World](https://www.politybooks.com/bookdetail?book_slug=the-uncontrollability-of-the-world--9781509543168)* (Polity 2020) makes a related argument about what gets lost when modern life becomes fully optimisable. It's where I started before deciding it didn't belong in the body of this post.

And the talk's earlier post: [The Grassroots Revolution: Building AI-Native Engineering Teams From Within](https://udbjorg.net/2026/04/the-grassroots-revolution-building-ai-native-engineering-teams).

Co-speakers at the same meetup whose work informed parts of this thinking: [Jakob Wolman & Benny Andrén — *AI Won't Work Until You Make It*](https://wolman.se/slides/EM-meetup-2026-04-29-slides.pdf).
