---
layout: post
title: "Bugs, Root Causes, and Technical Debt"
description: "How recurring bugs expose debt across code, product decisions, and team processes—and what to do about it."
comments: false
image: https://udbjorg.net/assets/images/totoro and the robots.jpg
category: "Management"
keywords: "technical debt, bug management, root cause analysis, startup CTO, product engineering, customer feedback, 5 Whys"
---

Not every bug is technical debt.

People make mistakes, requirements are incomplete, and complex systems sometimes fail in genuinely new ways. Fix the bug, learn what you can, and move on.

But when the same kind of bug keeps returning, or a small defect takes days to change safely, the bug is probably telling you something about the system around it.

That is where bug management and technical-debt management meet.

![Totoro looking at technical debt](https://udbjorg.net/assets/images/confused.webp)

## A bug is a useful signal

Bug counts are a poor measure of team quality. A high number may mean the team has a problem, or it may mean people are finally reporting issues that were previously ignored. A low number may mean the product is stable, or that nobody trusts the bug tracker.

The pattern matters more than the count.

I look for:

* repeated failures in the same area;
* fixes that create another problem nearby;
* bugs that require one particular engineer;
* long delays between understanding and fixing an issue;
* customer confusion repeatedly classified as "user error"; and
* incidents where the technical fix does not address why the situation occurred.

These patterns point towards weak boundaries, missing knowledge, poor observability, unclear product behaviour, or a process that keeps producing the same mistake.

Closing the ticket is not the same as fixing the system.

## Start with the user's experience

Technical discussions quickly move towards logs, services, and data models. That is necessary, but begin with what happened to the user.

What were they trying to do? What did they expect? What did the product do instead? How often does it happen, and what does it cost them?

Engineers should occasionally hear this directly. Join a support call. Watch a user session. Read the full conversation instead of the two-line summary copied into Jira.

This is not about making developers feel guilty. It is about giving them the context needed to make a good decision. "Session token expired" describes a mechanism. "A customer lost twenty minutes of work while completing the main task in our product" describes why it matters.

## Ask why, then keep asking

The [5 Whys](https://en.wikipedia.org/wiki/Five_whys) is a simple root-cause technique. It is not magic, and five is not a sacred number. The useful habit is refusing to stop at the first technical explanation.

Imagine users are repeatedly logged out of a mobile application.

1. **Why were they logged out?** The session expired after a short period of inactivity.
2. **Why is the timeout short?** A security rule applies the same limit to every workflow.
3. **Why does that break this workflow?** Users regularly pause while collecting information elsewhere.
4. **Why was that not considered?** The policy was chosen without observing how this group uses the product.
5. **Why did the decision miss that context?** Security, product, and engineering made their parts of the decision separately.

The immediate fix may be changing the timeout. The lasting fix may involve a better authentication flow, clearer risk levels, improved session recovery, and bringing the right people into future policy decisions.

Do not force every investigation through exactly five questions. Sometimes the cause is obvious after two; sometimes there are several causes. The point is to examine the technical, product, and organisational conditions together.

## Blameless does not mean nobody is responsible

A good review avoids turning a system failure into a hunt for the person who typed the wrong thing. Blame makes people hide information, and hidden information makes the next failure harder to prevent.

But "blameless" cannot mean a pleasant meeting followed by no action.

Teams still need clear ownership of improvements. A useful review produces a small number of changes with owners and dates. Those changes might include:

* a safer default;
* an automated check;
* clearer ownership;
* better logging or alerting;
* a product decision that removes the confusing path; or
* a change to how work is reviewed.

The action should match the cause. Adding another test will not repair an unclear product rule. Scheduling training will not fix an interface that makes the safe path difficult.

## Bring the right people into the room

Recurring bugs often cross team boundaries. Support sees the impact, product understands the expected behaviour, design sees the interaction, security understands the risk, and engineering knows the implementation.

You do not need all of them in every bug review. You do need them when the cause crosses their decisions.

A short cross-functional review can answer:

1. What did the user experience?
2. Which conditions made it possible?
3. Where else could the same pattern exist?
4. What is the smallest change that prevents a repeat?
5. Which larger debt, if any, should enter planning?

That final distinction matters. Fix the immediate issue, but do not smuggle an unbounded platform rewrite into a bug ticket. If the durable solution is large, describe its value and prioritise it properly.

## Close the loop

After the fix reaches production, check whether the problem actually stopped.

Did support contacts fall? Did the failure pattern disappear? Can another engineer now change the area safely? Did the workaround simply move somewhere else?

Without that follow-up, root-cause analysis becomes another ceremony. We produce a thoughtful document, declare learning, and continue paying the same interest.

Technical debt is often visible in the distance between fixing a symptom and improving the conditions that created it. Bugs give you evidence. Use that evidence to make the product, the code, and the way the team works a little harder to break next time.

![Totoro after the useful fixes](https://udbjorg.net/assets/images/happy.webp)
