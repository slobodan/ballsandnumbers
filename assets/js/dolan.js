/* global d3, jQuery, ScrollMagic, window */
(function bnnDolan() {
  // const svgWidth = jQuery('#viz').width();
  // const svgHeight = jQuery(window).height() - jQuery('#viz').offset().top - 30;
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const svgHeight = jQuery(window).height()
  const svgWidth = svgHeight * 6;

  const primaryColor = '#006BB6';
  const secondaryColor = '#F58426';
  const tertiaryColor = '#BEC0C2';
  const blackColor = '#282828';

  const leagueRank = [
    { season: '1999-00', salaryRank: 2, winLossRank: 9, salary: 71.34, wins: 50, losses: 32 },
    { season: '2000-01', salaryRank: 2, winLossRank: 11, salary: 73.56, wins: 48, losses: 34 },
    { season: '2001-02', salaryRank: 1, winLossRank: 23, salary: 85.46, wins: 30, losses: 52 },
    { season: '2002-03', salaryRank: 2, winLossRank: 20, salary: 93.45, wins: 37, losses: 45 },
    { season: '2003-04', salaryRank: 2, winLossRank: 17, salary: 89.44, wins: 39, losses: 43 },
    { season: '2004-05', salaryRank: 1, winLossRank: 23, salary: 102.44, wins: 33, losses: 49 },
    { season: '2005-06', salaryRank: 1, winLossRank: 29, salary: 126.61, wins: 23, losses: 59 },
    { season: '2006-07', salaryRank: 1, winLossRank: 22, salary: 117.02, wins: 33, losses: 49 },
    { season: '2007-08', salaryRank: 2, winLossRank: 26, salary: 96.19, wins: 23, losses: 59 },
    { season: '2008-09', salaryRank: 1, winLossRank: 23, salary: 96.64, wins: 32, losses: 50 },
    { season: '2009-10', salaryRank: 3, winLossRank: 23, salary: 85.51, wins: 29, losses: 53 },
    { season: '2010-11', salaryRank: 17, winLossRank: 15, salary: 66.47, wins: 42, losses: 40 },
    { season: '2011-12', salaryRank: 16, winLossRank: 14, salary: 63.39, wins: 36, losses: 30 },
    { season: '2012-13', salaryRank: 4, winLossRank: 7, salary: 78.67, wins: 54, losses: 28 },
    { season: '2013-14', salaryRank: 2, winLossRank: 19, salary: 88.16, wins: 37, losses: 45 },
    { season: '2014-15', salaryRank: 4, winLossRank: 29, salary: 80.92, wins: 17, losses: 65 },
    { season: '2015-16', salaryRank: 16, winLossRank: 24, salary: 73.75, wins: 32, losses: 50 },
    { season: '2016-17', salaryRank: 11, winLossRank: 24, salary: 102.59, wins: 27, losses: 45 },
  ];

  const coaches = [
    // { name: 'Jeff Van Gundy', start: '1996/03/08', end: '2001/12/09', reason: 'Resigned', contract: '', interim: 'No' },
    { name: 'Jeff Van Gundy', start: '1999/08/30', end: '2001/12/09', reason: 'Resigned', contract: '', interim: 'No' },
    { name: 'Don Chaney', start: '2001/12/09', end: '2002/03/05', reason: 'Became full-time', contract: '', interim: 'Yes' },
    { name: 'Don Chaney', start: '2002/03/05', end: '2004/01/14', reason: 'Fired', contract: '2 years', interim: 'No' },
    { name: 'Herb Williams', start: '2004/01/14', end: '2004/01/14', reason: '', contract: '', interim: 'Yes' },
    { name: 'Lenny Wilkens', start: '2004/01/15', end: '2005/01/22', reason: 'Resigned', contract: '4 years', interim: 'No' },
    { name: 'Herb Williams', start: '2005/01/22', end: '2005/07/28', reason: '', contract: '', interim: 'Yes' },
    { name: 'Larry Brown', start: '2005/07/28', end: '2006/06/23', reason: 'Fired', contract: '5 years, $50m', interim: 'No' },
    { name: 'Isiah Thomas', start: '2006/06/23', end: '2008/04/18', reason: 'Fired', contract: '', interim: 'No' },
    { name: 'Mike D\'Antoni', start: '2008/05/13', end: '2012/03/14', reason: 'Resigned', contract: '4 years, $24m', interim: 'No' },
    { name: 'Mike Woodson', start: '2012/03/14', end: '2012/05/26', reason: '', contract: '', interim: 'Yes' },
    { name: 'Mike Woodson', start: '2012/05/26', end: '2014/04/21', reason: 'Fired', contract: '3 years, $10-12m', interim: 'No' },
    { name: 'Derek Fisher', start: '2014/06/10', end: '2016/02/08', reason: 'Fired', contract: '5 years, $25m', interim: 'No' },
    { name: 'Kurt Rambis', start: '2016/02/08', end: '2016/05/18', reason: '', contract: '', interim: 'Yes' },
    { name: 'Jerr Hornacek', start: '2016/05/18', end: '2017/04/01', reason: '', contract: '3 years, $15m', interim: 'No' },
  ];

  const GMs = [
    { name: 'Scott Layden', start: '1999/08/10', end: '2003/12/22', reason: 'Fired', interim: 'No' },
    { name: 'Isiah Thomas', start: '2003/12/22', end: '2008/04/02', reason: 'Fired', interim: 'No' },
    { name: 'Donnie Walsh', start: '2008/04/02', end: '2011/06/03', reason: 'Resigned', interim: 'No' },
    { name: 'Glen Grunnwald', start: '2011/06/04', end: '2012/04/24', reason: 'Became full-time', interim: 'Yes' },
    { name: 'Glen Grunwald', start: '2012/04/24', end: '2013/09/26', reason: 'Demoted', interim: 'No' },
    { name: 'Steve Mills', start: '2013/09/26', end: '2014/03/03', reason: 'Demoted', interim: 'No' },
    { name: 'Phil Jackson', start: '2014/03/03', end: '2017/04/01', reason: '', interim: 'No' },
  ];

  const events = [
    { date: '2000/09/20', title: 'Ewing traded' },
    { date: '2001/05/04', title: 'First round loss to Raptors' },
    { date: '2001/12/08', title: 'Jeff Van Gundy quits' },
    { date: '2002/04/17', title: 'Knicks miss the playoffs' },
    { date: '2002/06/26', title: 'McDyess trade' },
    { date: '2002/10/08', title: 'McDyess injured' },
    { date: '2003/12/22', title: 'Layden out, Thomas in' },
    { date: '2004/01/06', title: 'Stephon Marbury trade' },
    { date: '2004/04/25', title: 'Nets sweep Knicks' },
    { date: '2005/01/22', title: 'Lenny Wilkens resigns' },
    { date: '2005/07/28', title: 'Larry Brown hired' },
    { date: '2005/07/13', title: 'Jerome James signed' },
    { date: '2005/10/03', title: 'Eddy Curry trade' },
    { date: '2006/01/25', title: 'Sexual harassment suit' },
    { date: '2006/02/04', title: 'Jalen Rose trade' },
    { date: '2006/02/23', title: 'Francis trade' },
    { date: '2006/07/23', title: 'Larry Brown out' },
    { date: '2006/12/16', title: 'Knicks - Nuggets brawl' },
    { date: '2007/11/29', title: '104-59 loss to Celtics' },
    { date: '2007/12/10', title: 'Sexual harassment suit settled' },
    { date: '2008/04/02', title: 'Isiah Thomas fired' },
    { date: '2008/05/13', title: 'Mike D\'Antoni hired' },
    { date: '2009/02/24', title: 'Marbury bought out' },
    { date: '2010/01/24', title: '128-78 home loss to Mavericks' },
    { date: '2010/07/05', title: 'Stoudemire signed' },
    { date: '2011/02/22', title: 'Carmelo Anthony trade' },
    { date: '2011/06/03', title: 'Donnie Walsh steps down' },
    { date: '2011/12/11', title: 'Bibby signed' },
    { date: '2012/02/18', title: 'J.R. Smith signed' },
    { date: '2012/03/04', title: 'Mike D\'Antoni resigns' },
    { date: '2012/05/01', title: 'Amare vs fire extinguisher' },
    { date: '2012/05/03', title: '13th consecutive playoffs loss' },
    { date: '2012/08/01', title: 'Chris Smith signed' },
    { date: '2013/07/10', title: 'Bargnani trade' },
    { date: '2014/03/18', title: 'Phil Jackson named president' },
    { date: '2014/06/09', title: 'Derek Fisher hired' },
    { date: '2015/01/07', title: '13th consecutive loss' },
    { date: '2015/10/07', title: 'Fisher vs Barnes' },
    { date: '2016/02/08', title: 'Derek Fisher fired' },
    { date: '2016/06/22', title: 'Derrick Rose trade' },
    { date: '2016/06/30', title: 'Noah signed' },
    { date: '2016/10/05', title: 'Derrick Rose rape trial begins' },
    { date: '2017/01/09', title: 'Derrick Rose disappears' },
    { date: '2017/02/08', title: 'Oakley thrown out' },
  ];

  const parseTime = d3.timeParse('%Y/%m/%d');
  const timeScale = d3.scaleTime()
    .range([0, (svgWidth - margin.left)])
    .domain([parseTime('1999/08/30'), parseTime('2017/04/01')]);

  const rankScale = d3.scaleLinear()
    .range([300, svgHeight - 150])
    .domain([1, 30]);

  const salaryLine = d3.line()
    .x((d, i) => ((svgWidth - margin.left) / (leagueRank.length - 1)) * i)
    .y(d => rankScale(d.salaryRank));

  const winLossLine = d3.line()
    .x((d, i) => ((svgWidth - margin.left) / (leagueRank.length - 1)) * i)
    .y(d => rankScale(d.winLossRank));

  const svg = d3.select('#viz').append('svg')
    .attr('width', svgWidth)
    .attr('height', `${svgHeight}px`);

  const g = svg.append('g')
    .attr('class', 'viz-container')
    .attr('transform', `translate(${margin.left}, 0)`);

  const eventsGroup = g.append('g')
    .attr('class', 'events');

  const singleEvents = eventsGroup.selectAll('g.single-event')
    .data(events)
    .enter()
    .append('g')
    .attr('class', 'single-event')
    .attr('transform', () => `translate(0, ${(Math.random() * (200 - 20)) + 20})`);

  singleEvents.append('circle')
    .attr('cx', d => timeScale(parseTime(d.date)))
    .attr('cy', 0)
    .attr('r', 2)
    .style('fill', blackColor);

  singleEvents.append('text')
    .text(d => d.title)
    .attr('x', d => timeScale(parseTime(d.date)))
    .attr('y', -10)
    .style('text-anchor', 'middle')
    .style('fill', blackColor)
    .style('font-size', '16px');

  g.append('path')
      .datum(leagueRank)
      .attr('fill', 'none')
      .attr('stroke', secondaryColor)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 4)
      .attr('d', salaryLine);

  g.append('path')
      .datum(leagueRank)
      .attr('fill', 'none')
      .attr('stroke', secondaryColor)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 4)
      .attr('d', winLossLine);

  // Axis
  g.append('line')
    .attr('x1', 0)
    .attr('y1', svgHeight - 100)
    .attr('x2', svgWidth)
    .attr('y2', svgHeight - 100)
    .attr('stroke', blackColor)
    .attr('stroke-width', 3);

  const GMsGroup = g.append('g')
    .attr('class', 'gms');

  GMsGroup.selectAll('rect.gm')
    .data(GMs)
    .enter()
    .append('rect')
    .attr('data-name', d => d.Name)
    .attr('data-start', d => d.start)
    .attr('data-end', d => d.end)
    .attr('class', 'gm')
    .attr('x', d => timeScale(parseTime(d.start)) + 2)
    .attr('y', svgHeight - 70)
    .attr('width', d => (timeScale(parseTime(d.end)) - timeScale(parseTime(d.start))) - 2)
    .attr('height', 30)
    .style('fill', primaryColor);

  GMsGroup.selectAll('text')
    .data(GMs)
    .enter()
    .append('text')
    .text(d => d.Name);

  const coachesGroup = g.append('g')
    .attr('class', 'coaches');

  coachesGroup.selectAll('rect.coach')
    .data(coaches)
    .enter()
    .append('rect')
    .attr('data-name', d => d.Name)
    .attr('data-start', d => d.start)
    .attr('data-end', d => d.end)
    .attr('class', 'coach')
    .attr('x', d => timeScale(parseTime(d.start)) + 2)
    .attr('y', svgHeight - 30)
    .attr('width', (d) => {
      if ((timeScale(parseTime(d.end)) - timeScale(parseTime(d.start))) > 2) {
        return (timeScale(parseTime(d.end)) - timeScale(parseTime(d.start)) - 2);
      } else {
        return 2;
      }
    })
    .attr('height', 20)
    .style('fill', d => (d.interim === 'Yes' ? tertiaryColor : primaryColor));

    // ScrollMagic
    jQuery(function ($) {
      const controller = new ScrollMagic.Controller();
      new ScrollMagic.Scene({
        triggerElement: '#trigger-1',
        duration: 5000 - svgHeight,
      })
        .setPin('#viz')
        .addTo(controller)
        .triggerHook(0)
        .on('progress', (e) => {
          g.attr('transform', `translate(${-e.progress * 780}, 0)`);
        });
    });
}());
