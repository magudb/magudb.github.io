---
layout: post
title: "Using Gavel and Docker to handle judging at Hackathons"
description: "Using Gavel and Docker to handle judging at Hackathons"
comments: true
category: "Hackathon"
keywords: "LEGO, Hackathon, Me, Gavel"
---

# Hackathon and Judging #
In january i did my second hackathon for LEGO, It went well. But this post is not about Hackathon, this is about using Docker to enable judges to vote.
In my search for how to make the best hackathons in the world, I found [Gavel](http://www.anishathalye.com/2016/09/19/gavel-an-expo-judging-system/) and i really like the idea that you are force to always judging between the last project you saw and the current. 
It seems to be a more fair solution that can eliminate some bias in the judges and force them to think about the current experience.

# I kinda i like Docker #
So to make things a little easier for myself, I decided to create a setup based on Docker.

It is based on 3 containers:
* Python - Gavel 
* Postgres - Data store
* Mailhog - Handling mail delivery

So if you need a voting system for a hackathon, you are welcome to use my setup to make stuff a little more simple.

You find everything you need right here - https://github.com/magudb/Gavel-Docker-Compose

## Start 
`$>docker-compose up`
browse to `http://localhost:8184/admin` 