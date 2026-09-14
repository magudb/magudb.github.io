---
layout: post
title: "Technology Strategy Is a Set of Choices"
description: "A practical way for CTOs to connect business, product, and engineering strategy without producing another decorative roadmap."
comments: false
image: https://udbjorg.net/assets/images/mindmao.jpg
category: "Management"
keywords: "CTO, technology strategy, engineering strategy, product strategy, innovation, strategic planning, organisational learning"
---

Strategy is one of those words that gets invited into every presentation and asked to do very little work.

A list of goals is called a strategy. A roadmap is called a strategy. "Use AI" is called a strategy, usually with a gradient background.

For me, strategy is a connected set of choices about where we will focus, how we expect to succeed, and what we will not do. A technology strategy explains how technology supports those choices.

If it does not help somebody decide, it is probably decoration.

![A map of strategy](/assets/images/mindmao.jpg)

## The CTO belongs in the strategy conversation

Any company that builds software is making strategic technology decisions, whether it admits it or not.

Some decisions create options: a faster way to test ideas, better access to data, or an architecture that lets teams change independently. Others quietly remove options through cost, coupling, risk, or dependence on scarce skills.

The CTO does not own the company strategy alone. But the CTO should understand the market, customers, product, finances, and operating model well enough to explain those consequences before the decision is already made.

Technology strategy cannot be written in isolation and later "aligned" with the business using arrows.

## Begin with a diagnosis

Richard Rumelt's *Good Strategy/Bad Strategy* describes a useful kernel: diagnosis, guiding policy, and coherent actions. I like it because it forces strategy away from slogans.

The diagnosis explains what is happening and which part matters most.

For a CTO, useful inputs include:

* customer conversations and product usage;
* market and competitor changes;
* the business model and financial constraints;
* delivery, reliability, security, and cost data;
* the capabilities and limits of the team; and
* the technical choices already shaping what is possible.

Do not turn this into a six-month research programme. You need enough information to frame the challenge, not enough slides to avoid choosing.

A diagnosis should reduce complexity. "We need to modernise our technology" does not. "Enterprise customers are leaving because onboarding takes months, and each integration requires work from three teams" gives us something to solve.

## Make a guiding choice

The guiding policy describes how the company will approach the challenge.

Using the onboarding example, the policy might be:

> We will make the common integrations self-service and concentrate specialist engineering support on the few customers whose complexity justifies it.

That choice gives product and engineering a direction. It also says no to something: bespoke engineering support for every integration.

Good strategy is uncomfortable because choices close doors. When every market, customer type, platform, and initiative remains a priority, the organisation has postponed strategy until scheduling—and the loudest request usually wins.

## Turn it into coherent action

Actions make the policy real. They should reinforce each other rather than form a shopping list of projects.

For the same example, coherent actions could include:

* standardising the integration model;
* building documentation and tooling for the common path;
* assigning one product team to the onboarding outcome;
* changing sales qualification for bespoke requests; and
* measuring time to first successful integration.

Notice that only some of these are technical. A technology strategy that assumes engineering can compensate for every product and commercial decision is not credible.

![Creating a strategy step by step](/assets/images/Creating%20a%20Strategy%20Step-by-Step%20Process.png)

## Connect business, product, and engineering

I think of the three strategies as different levels of the same argument.

**Business strategy** chooses where the company will compete and how it expects to create value.

**Product strategy** chooses which customers and problems the product will focus on.

**Engineering strategy** chooses which technical and organisational capabilities are needed to deliver that product reliably and at a sustainable cost.

The connection should be visible. If the business is moving towards larger regulated customers, the product may need stronger administrative workflows and audit features. Engineering may need to prioritise identity, traceability, data boundaries, and a more predictable delivery process.

"Move to Kubernetes" is not an engineering strategy unless it can explain how that choice supports the product and business direction better than the alternatives.

## Balance exploration and exploitation

Companies need to improve what works and explore what may work next.

The first is exploitation: making the current product more efficient, reliable, and valuable. The second is exploration: testing new markets, technologies, and business models.

Startups often claim to explore while committing every engineer to the current roadmap. Larger companies can do the opposite and fund an innovation theatre safely separated from customers.

Make the allocation explicit. Decide how much capacity, money, and leadership attention goes to each. Give experiments a question and a limit. If an exploration succeeds, decide how it moves into the real product. If it fails, stop it and keep the learning.

An experiment without a decision attached is just an interesting activity.

## Decentralise decisions with context

Strategy should let more people make decisions without waiting for the executive team.

That requires more than telling teams to be autonomous. They need the diagnosis, the guiding choices, and the boundaries. They need to know which outcomes matter and which constraints are real.

I like short written strategy documents because people can challenge them and return to them later. A useful document answers:

1. What has changed or what have we learned?
2. What is the central challenge?
3. Which choice are we making?
4. What are we choosing not to do?
5. Which actions follow now?
6. How will we know whether the strategy is working?

Teams can then make local decisions inside that context. Escalation is for decisions that change the strategy or cross its boundaries, not every implementation detail.

## Keep strategy alive, but not restless

Annual strategy exercises create documents that age quietly in a shared drive. Updating strategy every week creates a company with no memory.

Review it on a regular cadence and when an important assumption changes. Look at outcomes, customer evidence, delivery data, and what teams are learning. Ask whether the diagnosis still holds.

Double-loop learning is useful here: do not only ask whether the actions worked; ask whether the assumptions behind the actions were correct.

Changing strategy when the evidence changes is not failure. Changing it whenever a senior person reads a new book is something else.

## Frameworks are tools, not ingredients

Porter's Five Forces, the Business Model Canvas, Jobs to Be Done, Wardley Mapping, SWOT, and many other frameworks can help expose a particular part of the problem.

Use the one that helps answer the question in front of you. Do not mix all of them into a strategy smoothie and assume the number of canvases proves rigour.

Frameworks organise thought. They do not make the choice for you.

## A small example: CarrotSaaS

Imagine CarrotSaaS sells precision-agriculture software to carrot farmers. It wants to grow with medium-sized farms, but onboarding is designed for large customers with consultants and generous budgets.

**Diagnosis:** Medium-sized farms see value in the product but abandon onboarding because setup is slow, specialised, and difficult to price.

**Guiding policy:** Make the standard product useful without consultancy and reserve custom work for customers who pay for it.

**Coherent actions:** Simplify setup, create a standard data import, test pricing with the target segment, improve onboarding guidance, and measure activation and time to first value.

Engineering now has useful strategic questions. Which parts of onboarding create the most variation? What can become self-service? Where is the architecture coupled to assumptions from large customers?

That is more actionable than "increase MRR by 25%". The goal still matters, but the strategy explains how the company intends to move it.

## Strategy should make work clearer

A good strategy does not predict the future. It gives the organisation a sensible way to act while the future remains uncertain.

Name the challenge. Make the choice. Connect the actions. Share enough context that teams can decide. Then pay attention to what reality says back.

That is the strategy work. The canvas is optional.

## Further reading

* *Good Strategy/Bad Strategy* by Richard Rumelt
* *The Art of Action* by Stephen Bungay
* *The Lean Startup* by Eric Ries
* *Competing Against Luck* by Clayton Christensen
* *EMPOWERED* by Marty Cagan and Chris Jones
* *The Ambidextrous Organization* by Charles A. O'Reilly III and Michael L. Tushman
