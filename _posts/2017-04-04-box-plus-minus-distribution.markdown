---
layout: post
title:  "Box Plus Minus Distribution"
date:   2017-04-04 20:00:00 +0100
featured_image: box-plus-minus-distribution.png
excerpt: Which teams have the worst best player? Which ones are dominated by one player, other than OKC? How good is Nikola Jokic, according to BPM?
custom_js:
- lib/d3.v4.min
- lib/jquery-3.1.1.min
- bpm
---
BPM, or Box Plus Minus, is an advanced stat created by Daniel Myers. What it essentially does is estimate a player's performance relative to league average. Players with BPM of zero are average, negative value means the player does more damage than good, and positive value is, well, good.

Without getting into details of BPM for every single player (other than Westbrook, who, with 15.2 BPM is about to destroy old single season BPM record of 12.99 set by LeBron in 2008/09) let's take a look at "wealth distribution" within NBA franchises.

Which teams have the worst best player? Which ones are dominated by one player, other than OKC? How good is Nikola Jokic, according to BPM?

Each circle represents one player. Circle size indicates total minutes played, position on the x-axis represents player's BPM.

<div id="viz"></div>

Data source: Basketball Reference.