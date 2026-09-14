---
layout: post
title: "Technical Debt: A CTO's Guide for Startups"
description: "How to find, explain, and prioritise technical debt without turning it into an endless cleanup project."
comments: false
image: https://udbjorg.net/assets/images/totoro and the robots.jpg
category: "Management"
keywords: "technical debt, startup CTO, code churn, maintainability, engineering performance, prioritisation, software architecture"
---

Technical debt is easy to complain about and surprisingly difficult to manage.

Every team has some. Startups usually have quite a lot because they are learning, changing direction, and trying to get something useful in front of customers before the money runs out. That is not automatically bad engineering. Sometimes the shortcut is the correct decision.

The problem begins when nobody remembers that it was a shortcut, what it is costing, or when the decision should be revisited.

![Totoro working with technical debt](https://udbjorg.net/assets/images/sad-totoro.jpg)

## What I mean by technical debt

Technical debt is the extra cost we pay later because of a technical decision made earlier.

That decision may have been rushed, based on missing information, or entirely sensible at the time. The important part is the continuing cost: changes take longer, incidents become more common, people are afraid to touch an area, or a small product idea requires a tour through half the system.

Ugly code is not necessarily debt. Old technology is not necessarily debt. A system can be unfashionable and still cheap to understand, safe to change, and perfectly useful.

Refactoring is not the same thing either. Refactoring is one possible payment. Technical debt is the reason you may need to make it.

## Why the term helps

"We need three weeks to clean the code" is not a very useful business argument.

The language of debt helps explain that a decision has an ongoing cost. We took a loan to move faster, and now we are paying interest whenever we change or operate the system.

But the metaphor has limits. Technical debt does not arrive with a bank statement, and not all of it has to be repaid. Some code may disappear with a failed product idea before the interest matters. Other debt sits directly under the part of the business that is growing and becomes expensive very quickly.

The useful conversation is not "do we have technical debt?" Of course we do. It is:

* Where are we paying for it?
* How much does it slow us down or increase risk?
* What happens if we leave it alone?
* What would improve if we addressed it?

## Find the hotspots

Do not begin with a tour of the codebase looking for things engineers dislike. Begin where the business and the team feel pain.

I think of the codebase as a heatmap. A few signals are particularly useful:

* **Change frequency**: Which areas are touched again and again?
* **Lead time**: Where do small changes take a long time to reach production?
* **Failures**: Which components appear repeatedly in incidents and bug reports?
* **Fear**: Which parts of the system do engineers avoid changing?
* **Customer impact**: Where does technical friction block an important product improvement?

Code churn on its own is not a problem. A healthy part of the product may change often. Complexity on its own is not proof either. The interesting places are where several signals overlap: high change, high risk, and high business importance.

That is where debt is probably charging real interest.

## Make the cost visible

A technical-debt register can help, but only if it is more than a graveyard of tickets labelled `tech-debt`.

For each meaningful item, record:

1. The decision or condition creating the debt.
2. The cost we see today.
3. The risk of doing nothing.
4. The part of the product or business affected.
5. A possible next step—not necessarily a complete rewrite.

"The payment service is horrible" is not an actionable item. "Changes to subscription rules require coordinated edits in four services and caused two billing incidents this quarter" is much easier to discuss.

Make the register visible to product and business people. Debt should not be a secret engineering list that appears whenever a roadmap conversation becomes difficult.

## Prioritise value, not cleanliness

I use four questions when deciding what to address:

### Impact

Does the debt affect revenue, customer trust, resilience, security, or the team's ability to deliver an important change?

### Frequency

How often do we pay the cost? A painful release process used every day deserves more attention than an awkward component changed once a year.

### Effort

What is the smallest change that reduces the cost? The answer is often not "rewrite everything".

### Risk

Can we make the change safely, and what new problems could it introduce? Familiar bad code can still run a business. Replacing it without understanding its behaviour is not automatically an improvement.

These questions help move the discussion from engineering taste to shared value.

## Pay debt while doing real work

I do not believe in waiting for the mythical quarter when the roadmap is empty and the whole team can clean up. That quarter does not exist in startups.

Small debt payments should happen close to the work that exposes them. Improve a test boundary while changing the feature. Remove a dependency when you touch the integration. Add the missing observability before the next risky release.

Larger debt needs an explicit decision. Put it beside product work, explain the outcome, and fund it like any other investment. "Rewrite the platform" is difficult to support. "Reduce onboarding changes from three weeks to three days" gives the company something to choose.

Coding standards, reviews, automated tests, and continuous delivery can reduce new debt, but no practice removes trade-offs. The aim is not a debt-free codebase. The aim is a system where the team understands the compromises and can still change the product safely.

## The CTO's job

The CTO should make technical debt understandable without turning every rough edge into a crisis.

That means being honest in both directions. Engineers need to explain the actual cost, not use "debt" as a magic word for preferred work. Product and business leaders need to see maintainability and resilience as part of delivering the product, not a hobby engineering does after the features are finished.

Technical debt is not a moral failure. It is the memory of choices made under constraints. Keep that memory, watch where the interest appears, and pay the debt that is getting in the way.

![Totoro after dealing with the useful part of the debt](https://udbjorg.net/assets/images/totoro-happy.jpg)
