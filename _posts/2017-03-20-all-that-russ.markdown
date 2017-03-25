---
layout: post
title:  All That Russ
date:   2017-03-20 14:00:00 +0100
featured_image: russ.png
excerpt: Chucking at levels unreached by Kobe, Jordan and Iverson, dishing like Stockton. That's Russell Westbrook's 2016-17 season.
custom_js:
- lib/d3.v4.min
- lib/jquery-3.1.1.min
- russ
custom_css:
- russ
---
We're experiencing the golden era of basketball stats. Three point evolution, better offensive systems and physical capabilities of today's players have inflated the numbers so much, it seems like it will take years for defense to even begin catching up.

Russell Westbrook is thirteen games away from averaging a triple-double for the season, 55 years after Oscar Robertson became the first, and so far the only player to do so. If history taught us anything it's that this year nothing else matters. I remember Grant Hill flirting with a triple-double in 1996 and 1997 and then reading about this Big O guy who actually averaged one for an entire season. Who won the title that year? MVP? Anything? Doesn't matter, 1961-62 is "the triple-double season", the only one, until Westbrook joins the club in a month.

There's other Westbrook stats I find way more impressive, though. The guy is on pace to post by far the highest usage percentage (percentage of plays used by a player while he's on the floor) in history AND third highest assist percentage (percentage of teammate field goals he assisted while on the floor) ever, barely trailing only two peak-Stockton season.

Chucking at levels unreached by Kobe, Jordan and Iverson, dishing like Stockton. That's Russell Westbrook's 2016-17 season.

<div id="table-wrapper">
    <div style="float:left;width:48%">
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>USG%</th>
                </tr>
            </thead>
            <tr class="russ">
                <td>Russell Westbrook, 2016-17</td>
                <td>41.9</td>
            </tr>
            <tr>
                <td>Kobe Bryant, 2005-06</td>
                <td>38.7</td>
            </tr>
            <tr>
                <td>Russell Westbrook, 2014-15</td>
                <td>38.4</td>
            </tr>
            <tr>
                <td>Michael Jordan, 1986-87</td>
                <td>38.3</td>
            </tr>
            <tr>
                <td>Allen Iverson, 2001-02</td>
                <td>37.8</td>
            </tr>
        </table>
    </div>

    <div style="float:right;width:48%">
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>AST%</th>
                </tr>
            </thead>
            <tr>
                <td>John Stockton, 1990-91</td>
                <td>57.5</td>
            </tr>
            <tr>
                <td>John Stockton, 1989-90</td>
                <td>57.4</td>
            </tr>
            <tr class="russ">
                <td>Russell Westbrook, 2016-17</td>
                <td>56.6</td>
            </tr>
            <tr>
                <td>John Stockton, 1987-88</td>
                <td>54.8</td>
            </tr>
            <tr>
                <td>Chris Paul, 2008-09</td>
                <td>54.5</td>
            </tr>
        </table>
    </div>
    <p style="clear:both;font-size:14px">source basketball-reference.com</p>
</div>


Westbrook wasn't always like this, though. It took Durant's broken foot two seasons ago to shove Russell into "the guy" role, and for the world to get a sense of what could be. That season, Westbrook's usage percentage was 10 percentage points higher without Durant on the floor then it was while playing with KD, with offensive efficiency numbers also going up, dramatically (TS% up 5 percentage points, points per shot up 10%, etc). It was amazing, because it was one guy stepping up and saving the season for his team.

<div id="viz-russ-usg"></div>

This season is different. Russell dominating the ball like no other player in history, this year it was by design. Westbrook's 41.9% usage percentage is followed by Kanter's 26.8% and Oladipo's 21.2%, while assist percentage margin is even higher %mdash; among rotation players, second to Westbrook's 56.6% is Semaj Christon with 20.5%.

<div id="viz-scatter"></div>

How difficult would it be to pick Westbrook's dots if the chart wasn't color coded?

Why would an organization allow, even want something like this? Perhaps losing Durant last summer, combined with Westbrook's upcoming free agency, two years from now, scared the Thunder into giving Westbrook the keys to everyone's cars. Keep him extremely happy and he might stay. But maybe it was because the team around him sucks, badly. If you look at true shooting percentage of all Thunder players who logged at least 200 minutes both with and without Westbrook, finding a pattern is easy.

<div id="viz-ts"></div>

Playing with Russ is easier than playing without him.

This madness can't go on forever, though. Even Sam Presti has to luck into a dynamic guard Russ would truly enjoy playing and sharing ball handling duties with (if only they could get that guy from Houston). Or perhaps two years from now OKC will start their own version of Trust the Process, while Westbrook goes home to LA. Until then, stay you, Russ. History books will love you for it.