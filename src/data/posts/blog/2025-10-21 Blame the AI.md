---
title: Blame the AI
summary: Why I find myself blaming the AI tool instead of the person using it
date: "2025-10-21T00:00:00.000-04:00"
update_date: "2025-10-21T00:00:00.000-04:00"
slug: blame-the-ai
draft: false
tags:
  - personal
  - ai
---

My workplace uses Anthropic's Claude AI tool and recently I've found myself blaming the AI tool for mistakes it made instead of the person using the tool. Every dev I work with uses it to some degree, some have fully embraced it as a way of life, while others (like myself), use it sparingly for menial tasks. Recently, I discovered an issue in our developer tooling that prevented running an application locally; a coworker had put up and merged a PR that was overhauling some related code and in the process broke the local configuration.

In fairness to my coworker, I reviewed the PR and approved it, but I know it was Claude that wrote the actual change that broke the configuration. So when they said they weren't sure how it got broken, my immediate reaction was to blame Claude.

> Just Claude being Claude. Old Claude, hallucinating again.

In reality, Claude is the name of a program that's reasonably good at guessing what code will meet the prompt it is given, not a member of my team. It cannot write anything, and the coworker that put up the PR is ultimately responsible for breaking the build and not adequately testing their code. Yet, because we _love_ to anthropomorphize AI tools and because it was an easy way to avoid the social friction of placing blame upon someone on the team, my immediate reaction was to blame Claude.

The more I use AI tools, the less faith I have in them. Sometimes they produce astonishingly good results in a fraction of the time it would take me to write the code, but mostly it's a mixed bag of hallucinations, inconsistent coding standards, and repeated anti-patterns mixed with a mostly working end result. And though a better tool might make it easier to produce a better result, it is a poor craftsman that blames their tools, and our mistake for replacing careful work with fast results.
