---
layout: post
title:  "Jersey Numbers in the NBA"
date:   2017-03-06 14:00:00 +0100
categories: dataviz
featured_image: nba-jersey-numbers.png
excerpt: Remember the 90's, when everyone wanted to be like Mike? Me too, except it didn't really happen if you're judging by his peers. If you look at number of NBA players who wore 23 on their backs 1989-90 was Peak Jordan, with 18 total players, highest in the league. It's fair to say it was all downhill for MJ after that season, right?
custom_js:
- d3.v4.min
- jquery-3.1.1.min
- jerseys
---
<p>Remember the 90's, when everyone wanted to <a href="https://www.youtube.com/watch?v=b0AGiq9j_Ak" rel="nofollow">be like Mike</a>? Me too, except it didn't really happen if you're judging by his peers. If you look at number of NBA players who wore 23 on their backs 1989-90 was Peak Jordan, with 18 total players, highest in the league. It's fair to say it was all downhill for MJ after that season, right?</p>

<p>Chart below shows popularity of every NBA jersey number, in every season since 1946-47. Click Totals / Percentage toggles above the chart to change the unit, mouseover a field to see list of players.</p>

<div id="viz" style="margin: 1rem 0 2rem; min-height: 800px;"></div>

<p>A few more random facts I found interesting:</p>

<ul>
	<li>No one ever wore 58, 59, 64, 69, 74, 75, 78, 79, 80, 81, 82, 87 and 97.</li>
	<li>Johnny Jorgensen was a man ahead of his time, donning 0 in the one game he played for Chicago Stags in 1947-48. Next guy with a zero (or double zero) on his jersey was Robert Parish, 29 years later. These days single zero is quickly becoming one of the most popular jersey numbers in the NBA.</li>
	<li>NBA players were superstitious back in the day. Few people dared to pick 13 in the 60's and 70's, even with a superstar like Wilt dominating with it.</li>
	<li>Single digit number with a leading zero is extremely rare. Only three players did this, and they all played for Rochester Royals between 1948-49 and 1954-55. No, the version without leading zero was not taken. Pep Saul, Paul Noel and Bobby Wanzer, I wish I could talk to you guys.</li>
</ul>

<p>Stats source Basketball Reference. Chart inspired by <a href="http://graphics.wsj.com/infectious-diseases-and-vaccines/" rel="nofollow">WSJ vaccination graphic</a> by Tynan DeBold and Dov Friedman. Built with D3.js.</p>

<p>Note: Players with unknown jersey numbers were not included in total number of players in a season.</p>