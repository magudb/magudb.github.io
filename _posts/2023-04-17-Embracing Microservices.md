---
layout: post
title: "Microservices: The Trade-offs Before the Architecture"
description: "When microservices help, what they cost, and which organisational capabilities should exist before you split the monolith."
comments: false
image: https://udbjorg.net/assets/images/microservices.png
category: "Management"
keywords: "microservices, monolith, modular architecture, distributed systems, team ownership, DevOps, software architecture"
---

![Microservices](/assets/images/microservices.png)

Microservices can solve real problems. They can also turn one understandable problem into forty smaller problems connected by a network.

That is not an argument against them. It is the trade-off.

I would not choose microservices because the architecture diagram looks modern or because a large technology company uses them. Their company, traffic, teams, and problems are probably not yours.

## Begin with the problem

Before choosing an architecture, ask what is currently difficult.

Are teams blocking each other's releases? Does one part of the system need to scale very differently? Are responsibilities impossible to separate? Does a failure in one area regularly take down everything? Is the codebase so coupled that a small change requires half the organisation?

Microservices may help with some of these. They will not repair unclear ownership, weak engineering practices, or an organisation where every decision still needs central approval.

The choice is also not simply monolith or microservices. A modular monolith, a few extracted services, or a monolith with clearer team ownership may give you most of the value without paying the full distributed-systems bill.

## What microservices can give you

### Stronger boundaries

A service can create a clear boundary around a business capability and its data. This is valuable when the boundary is real and the team can own it.

Splitting a poorly understood domain into services does not create understanding. It distributes the confusion.

### Independent delivery

Teams may be able to build, test, and deploy a service without coordinating a release across the whole product. This can reduce waiting and let different parts of the system change at different speeds.

The word "independent" is doing a lot of work. If every release requires coordinated API changes across six services, you have a distributed monolith with more YAML.

### Independent scaling and reliability choices

A heavily used capability can scale separately, and critical paths can receive different reliability investments. This can be useful when the system has genuinely different workloads.

Most startup systems do not need this on day one. A larger instance is often a fine architectural strategy for longer than engineers like to admit.

### Team autonomy

A team that owns a service from development through production can make decisions with less coordination. But the service boundary and the team boundary need to support each other. Shared ownership of every service creates all the operational cost without the autonomy.

## The bill arrives immediately

Inside a monolith, a function call is fast and usually succeeds or fails with the process. Across services, the network is slow, unavailable, duplicated, delayed, or only slightly broken in ways that are fun to debug.

You now have to deal with:

* timeouts, retries, and idempotency;
* partial failures and degraded behaviour;
* versioned contracts;
* distributed data and eventual consistency;
* authentication and authorisation between services;
* logs, metrics, and traces across boundaries;
* deployment and rollback of many units; and
* understanding the total cost of running them.

None of this is impossible. It is simply work that the monolith did not require.

## You need an operating model

Microservices are as much an organisational choice as a technical one.

"You build it, you run it" is useful only when teams have the skills, access, time, and authority to operate what they build. Giving a team an on-call rota without observability or control is not ownership. It is delegation of pain.

Before creating many services, I would want:

* automated and boring deployments;
* clear service ownership;
* useful monitoring, logging, and tracing;
* a workable incident process;
* tested backup and recovery;
* a way to manage secrets and service identity;
* agreed API and compatibility practices; and
* enough platform support that every team is not rebuilding the same machinery.

If the organisation struggles to deploy one application safely, creating twenty deployable applications is an ambitious treatment.

## Standardise the boring parts

Microservices allow teams to choose different languages and technologies. That does not mean they should.

Technology diversity has a cost in hiring, operations, security, tooling, and the ability to move people between teams. Use a small paved road for the common case: supported languages, deployment patterns, observability, security controls, and service templates.

Teams can leave the road when the benefit justifies the cost. "We wanted to try it" may be enough for an experiment; it is not always enough for a service the company must operate for ten years.

The aim is enabling constraints, not a golden cage. Standardise what removes repeated work and risk. Leave room where local decisions create real value.

## Split along ownership and change

If you decide to extract services, do not start by cutting the database into equal pieces or turning every class into an endpoint.

Look for a capability with:

* a reasonably clear business boundary;
* data that can have an owner;
* a different rate of change or scaling need;
* a team prepared to run it; and
* limited, understandable dependencies.

Extract one boundary and learn from operating it. The first service will expose gaps in deployment, observability, security, and ownership. Fix those before multiplying them.

Martin Fowler's [Monolith First](https://martinfowler.com/bliki/MonolithFirst.html) advice is still useful: boundaries are difficult to find early, and a monolith makes them cheaper to change while the product is learning.

## Trust and dependencies

Teams need to trust the services they depend on. That comes from clear contracts, compatibility, communication, and actual reliability—not from a slide saying teams are autonomous.

Avoid central approval for every service change, but make expectations visible. Who supports the service? How are breaking changes handled? What reliability does it promise? Where can consumers see incidents and upcoming changes?

Autonomy works when teams can move independently without surprising everybody downstream.

## The leadership decision

The CTO's job is to decide whether the organisation's constraint is actually something microservices address.

Sometimes the answer is yes. A growing company may need stronger boundaries and independent teams. A specific workload may need separate scaling. A critical capability may need isolation.

Sometimes the constraint is a slow test suite, unclear product ownership, manual releases, or too much work in progress. Microservices will carry those problems into a more complicated environment.

Start with the problem. Choose the smallest architectural change that creates useful independence. Build the operating capability before you create the operational burden.

Microservices are not the destination. They are one way of paying for a particular kind of organisational and technical flexibility. Make sure you need what you are buying.
