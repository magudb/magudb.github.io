---
layout: post
title: "Technical Debt Is a Product Problem"
description: "A practical way to treat technical debt as shared product work instead of a private engineering backlog."
comments: false
image: https://udbjorg.net/assets/images/hero-techdebt.png
category: "Management"
keywords: "technical debt, product management, startup CTO, software maintenance, product teams, engineering strategy, prioritisation"
---

![Technical debt](/assets/images/hero-techdebt.png)

I previously wrote about finding and prioritising technical debt from the codebase outwards. I still agree with it, but it misses an important part: technical debt is rarely only a technical problem.

The bill arrives in the product.

Customers wait longer for improvements. Support sees the same failures. Product managers quietly avoid ideas that are too difficult to build. Engineers add another workaround because the proper change will not fit into the quarter.

If only engineering can see the debt, the organisation cannot make a sensible decision about it.

## Look for the product cost

The most useful description of debt is not what is wrong with the code. It is what the condition prevents or makes expensive.

Compare these two versions:

> The permissions module needs refactoring.

> Adding a new customer role takes several weeks, touches three systems, and regularly creates access bugs.

The second version connects the technical condition to delivery time, customer risk, and a product capability. Now there is a decision to make.

I usually look for costs in four places:

* **Product**: useful changes are delayed, reduced, or avoided.
* **Customers**: reliability, performance, or usability suffers.
* **Engineering**: changes require more coordination, testing, or specialist knowledge.
* **Business**: growth, compliance, cost, or strategic options are constrained.

The labels are less important than the shared view. Some people will call a confusing workflow "product debt" rather than technical debt. Fine. The company still has to decide what to do with the cost.

## Debt is often a system problem

Code gets the blame because it is easy to point at. The cause may be elsewhere.

Perhaps teams are rewarded for starting features but not maintaining them. Perhaps deadlines are fixed before anybody understands the work. Perhaps ownership changes every six months. Perhaps customer feedback never reaches the people making technical decisions.

Cleaning the code without changing those conditions is like drying the floor while the tap is still running.

This is why product managers, designers, support, and the relevant business owner should be part of the debt conversation. They see different parts of the cost and may know that an apparently important system is about to be retired—or that the awkward edge case is used by the company's largest customer every day.

## Four decisions, not one

When debt is visible, there are at least four reasonable choices.

### Repay it

Change the design, code, infrastructure, or process so the recurring cost disappears. Do this when the area matters and the interest is high.

### Reduce it

Remove the most expensive part without rebuilding everything. Better tests, a stable interface, or a small separation of responsibilities may create enough room.

### Accept it

Keep the debt and make the decision explicit. This is perfectly valid when the cost is low, the component is stable, or other work matters more.

### Remove the thing carrying it

Sometimes the best refactoring is deleting the feature, integration, or service. Before rebuilding an old system, check whether the company still needs it.

The mistake is not choosing to live with debt. The mistake is living with it by accident.

## A register people can use

I still like a technical-debt register, but I would keep it small and connect it to product planning.

Each item should answer:

* What is the observed problem?
* Who feels the cost?
* How often does it happen?
* Which outcome or risk does it affect?
* What options do we have?
* Who owns the next decision?

Do not fill the register with every missing test and untidy class. Teams should fix small issues while working in the area. The shared register is for debt that needs prioritisation across people, teams, or budgets.

Review it regularly and delete items that no longer matter. A hundred ageing tickets create the comforting appearance of control while telling you very little.

## Put it beside product work

Technical debt should compete for attention using the same language as other investments.

Instead of asking for "20% for engineering", explain the change you expect. Faster onboarding. Fewer failed payments. Safer releases. Less time waiting for the one person who understands the old integration.

There is no universal percentage that makes this healthy. Some teams can improve the system continuously as part of product work. Other problems require a concentrated investment. The right mix depends on the cost, risk, and direction of the product.

What matters is that product and engineering make the choice together. If product owns all visible value and engineering owns all invisible cost, the roadmap will always be biased.

## Make the decision reversible

Startups learn. A technical decision that looks sensible now may be wrong in six months, so record the assumptions behind large compromises.

For example:

> We are keeping the manual reconciliation process while transaction volume is below X. If it takes more than Y hours a week or delays month-end reporting, we will automate it.

That is much more useful than pretending the compromise does not exist. It also creates a trigger for revisiting the decision without relying on somebody remembering an old architecture conversation.

## Shared responsibility, clear ownership

Calling technical debt a product problem does not mean everybody owns every line of code. Engineering still owns technical judgement and implementation quality. Product still owns product discovery and prioritisation. Clear responsibilities matter.

Shared responsibility means the trade-off is visible and the decision uses all the relevant information.

The code may carry the debt, but the whole product pays the interest.
