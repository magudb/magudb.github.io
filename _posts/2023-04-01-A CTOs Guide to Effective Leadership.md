---
layout: post
title: "On Leading Engineering Teams"
description: "The practical leadership work behind trust, useful one-to-ones, clear direction, healthy conflict, and meaningful team metrics."
comments: false
image: https://udbjorg.net/assets/images/metrics.jpg
category: "Management"
keywords: "CTO, engineering leadership, trust, empowered teams, one-to-one meetings, conflict resolution, psychological safety, team performance"
---

The CTO role changes with the company. In one startup you are writing code and choosing vendors. In another you are managing managers, explaining risk to the board, and trying to remember the last time you opened an editor.

The people part does not disappear. It just becomes easier to neglect because it rarely arrives as a tidy technical problem.

I think the job is to create the conditions where teams can make good decisions and do useful work without needing the CTO in every room.

## Trust needs boundaries

Trust is not telling a team, "You are empowered now", and walking away.

People need to know the outcome, the constraints, and which decisions they can make. Without that, autonomy becomes guessing. Some teams respond by waiting for permission; others move confidently in four different directions.

I try to be explicit about:

* the problem we are solving;
* the business and customer outcome;
* the constraints that are real;
* the decisions the team owns; and
* where I expect to be involved.

Then the important part: let the team make those decisions, including decisions I might have made differently.

If every disagreement ends with the CTO choosing the implementation, people learn that ownership is mostly decorative.

Trust also needs transparency. Share the context behind decisions when you can. Say what you know, what you do not know, and what may change. Leaders sometimes hide uncertainty because they think confidence requires certainty. I find the opposite is usually true. People can work with uncertainty; unexplained surprises are harder.

## Psychological safety is practical

Psychological safety can sound like a soft extra until you see a team without it.

Incidents are reported late. Difficult estimates become optimistic estimates. People agree in meetings and object afterwards. Everybody knows about the fragile component, but nobody wants to be the person who slows the roadmap down.

A safer team is not a team without conflict or standards. It is a team where people can say "I do not understand", "I disagree", or "I made a mistake" without being punished for the information.

Leaders set this tone in small moments. Ask curious questions before giving the answer. Thank the person who raises an uncomfortable risk. Admit your own mistakes without turning the admission into a performance. During incidents, examine the conditions that made the mistake easy instead of searching for the careless person.

## One-to-ones are not status meetings

![Ash doing a one-to-one](https://udbjorg.net/assets/images/1-1.jpg)

One-to-ones are for the person, not the project plan. If the entire meeting is a tour of tickets, you have built an expensive stand-up.

I use the time to understand:

* how the person is doing;
* what is making their work harder;
* where they want to grow;
* what feedback they have for me; and
* which conversations we are avoiding.

Keep them regular. The exact frequency depends on the team and the person, but a one-to-one that moves whenever the calendar gets busy is not really regular.

I like a shared note with topics and actions. It gives both people somewhere to add things between meetings and prevents every useful promise from disappearing into the next week. The note belongs to the relationship, not to an HR archive.

Not every meeting needs a breakthrough. The value comes from the accumulated context. You notice changes because you have a baseline.

## Skip-levels widen the picture

When you manage managers, their direct reports should still know who you are and have a way to share context with you.

Skip-level conversations can reveal patterns across teams, show where strategy is unclear, and help you understand how management decisions feel further down the organisation.

They should not become secret performance reviews of the manager. Be clear about the purpose, share themes rather than gossip, and avoid solving around the person who is actually responsible. The goal is a better information system, not a shadow hierarchy.

## Conflict is information

Engineering teams should disagree. Architecture, priorities, quality, and risk contain real trade-offs. A team that never disagrees may be unusually aligned, but it may also have learned that disagreement is not worth the cost.

When conflict becomes stuck, I try to separate positions from interests.

"We must build a service" and "we must keep it in the monolith" are positions. The interests may be independent deployment, clear ownership, lower operational cost, or simply meeting a customer deadline. Once those are visible, the team has more than two solutions.

As a leader:

1. Talk to the people involved and understand each view.
2. State the decision that actually needs to be made.
3. Agree on the criteria and constraints.
4. Make ownership of the decision clear.
5. Record the decision and when it should be revisited.

Do not force consensus forever. Some decisions need a named person to choose after listening. The team does not need to agree with every decision, but they should understand how it was made.

## Direction before goals

Goals are useful only when people understand the direction behind them.

"Reduce lead time by 20%" may produce a great improvement or a great spreadsheet trick. Why does lead time matter now? Which customer or business problem will improve? What must not be sacrificed to make the number move?

I prefer a small number of outcomes with clear context. Let teams help shape how to reach them. Review progress often enough to learn, but not so often that every week brings a new priority.

When circumstances change, say what changed. Do not pretend the old plan was always meant to lead to the new one.

## Diversity needs more than a job ad

Inclusive language in a job ad is a start, not a diversity strategy.

Look at who enters the process, who advances, who gets heard after joining, and who gets opportunities to lead. Standard interview criteria can reduce some arbitrary judgement. A range of interviewers can add perspectives. Neither helps if every interviewer is quietly selecting for "people like us".

Inside the team, pay attention to meeting dynamics, access to important work, feedback quality, promotion criteria, and whose ideas receive credit. Belonging is built in these ordinary systems.

You will get things wrong. The useful response is to listen, correct the system, and keep going—not to wait until you can present a perfect programme.

## Measure the system, not the developer

![Ash looking at metrics](https://udbjorg.net/assets/images/metrics.jpg)

Engineering metrics should help a team improve its system. They should not become a leaderboard for individuals.

Delivery data can show where changes wait and where failures appear. The [DORA software delivery metrics](https://dora.dev/guides/dora-metrics/) are useful at an application or service level when teams use them to examine throughput and instability over time.

The [SPACE framework](https://www.microsoft.com/en-us/research/publication/the-space-of-developer-productivity-theres-more-to-it-than-you-think/) is a good counterweight to the idea that productivity is a single output number. Satisfaction, performance, activity, communication, and efficiency each show only part of the picture.

Combine system data with conversations. Ask the team where work feels slow, which interruptions dominate, and whether they have the tools and context to do good work. A metric may show the symptom; the people doing the work usually know more about the cause.

Never use commits, pull requests, story points, or lines of code as a proxy for individual value. You will get more of the number and less of the collaboration that makes a team effective.

## What the CTO leaves behind

Good leadership should make the organisation less dependent on the leader.

Build managers who can lead without copying you. Give teams context and real decisions. Keep information moving. Make difficult conversations normal. Use metrics to learn, not to judge.

You will still be needed. Just, hopefully, for the problems that actually need a CTO.
