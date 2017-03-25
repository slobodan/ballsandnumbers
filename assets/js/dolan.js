/* global d3, jQuery, window */
(function bnnDolan() {
  const svgHeight = jQuery(window).height() - jQuery('#viz').offset().top;
  const svgWidth = '2000px';

  const leagueRank = [
    { Season: '1999-00', salaryRank: 2, winLossRank: 9, salary: 71.34, wins: 50, losses: 32 },
    { Season: '2000-01', salaryRank: 2, winLossRank: 11, salary: 73.56, wins: 48, losses: 34 },
    { Season: '2001-02', salaryRank: 1, winLossRank: 23, salary: 85.46, wins: 30, losses: 52 },
    { Season: '2002-03', salaryRank: 2, winLossRank: 20, salary: 93.45, wins: 37, losses: 45 },
    { Season: '2003-04', salaryRank: 2, winLossRank: 17, salary: 89.44, wins: 39, losses: 43 },
    { Season: '2004-05', salaryRank: 1, winLossRank: 23, salary: 102.44, wins: 33, losses: 49 },
    { Season: '2005-06', salaryRank: 1, winLossRank: 29, salary: 126.61, wins: 23, losses: 59 },
    { Season: '2006-07', salaryRank: 1, winLossRank: 22, salary: 117.02, wins: 33, losses: 49 },
    { Season: '2007-08', salaryRank: 2, winLossRank: 26, salary: 96.19, wins: 23, losses: 59 },
    { Season: '2008-09', salaryRank: 1, winLossRank: 23, salary: 96.64, wins: 32, losses: 50 },
    { Season: '2009-10', salaryRank: 3, winLossRank: 23, salary: 85.51, wins: 29, losses: 53 },
    { Season: '2010-11', salaryRank: 17, winLossRank: 15, salary: 66.47, wins: 42, losses: 40 },
    { Season: '2011-12', salaryRank: 16, winLossRank: 14, salary: 63.39, wins: 36, losses: 30 },
    { Season: '2012-13', salaryRank: 4, winLossRank: 7, salary: 78.67, wins: 54, losses: 28 },
    { Season: '2013-14', salaryRank: 2, winLossRank: 19, salary: 88.16, wins: 37, losses: 45 },
    { Season: '2014-15', salaryRank: 4, winLossRank: 29, salary: 80.92, wins: 17, losses: 65 },
    { Season: '2015-16', salaryRank: 16, winLossRank: 24, salary: 73.75, wins: 32, losses: 50 },
    { Season: '2016-17', salaryRank: 11, winLossRank: 24, salary: 102.59, wins: 27, losses: 45 },
  ];

  const coaches = [
    // { Name: 'Jeff Van Gundy', start: '1996/03/08', end: '2001/12/09', reason: 'Resigned', contract: '', interim: 'No' },
    { Name: 'Jeff Van Gundy', start: '1999/08/30', end: '2001/12/09', reason: 'Resigned', contract: '', interim: 'No' },
    { Name: 'Don Chaney', start: '2001/12/09', end: '2002/03/05', reason: 'Became full-time', contract: '', interim: 'Yes' },
    { Name: 'Don Chaney', start: '2002/03/05', end: '2004/01/14', reason: 'Fired', contract: '2 years', interim: 'No' },
    { Name: 'Herb Williams', start: '2004/01/14', end: '2004/01/14', reason: '', contract: '', interim: 'Yes' },
    { Name: 'Lenny Wilkens', start: '2004/01/15', end: '2005/01/22', reason: 'Resigned', contract: '4 years', interim: 'No' },
    { Name: 'Herb Williams', start: '2005/01/22', end: '2005/07/28', reason: '', contract: '', interim: 'Yes' },
    { Name: 'Larry Brown', start: '2005/07/28', end: '2006/06/23', reason: 'Fired', contract: '5 years, $50m', interim: 'No' },
    { Name: 'Isiah Thomas', start: '2006/06/23', end: '2008/04/18', reason: 'Fired', contract: '', interim: 'No' },
    { Name: 'Mike D\'Antoni', start: '2008/05/13', end: '2012/03/14', reason: 'Resigned', contract: '4 years, $24m', interim: 'No' },
    { Name: 'Mike Woodson', start: '2012/03/14', end: '2012/05/26', reason: '', contract: '', interim: 'Yes' },
    { Name: 'Mike Woodson', start: '2012/05/26', end: '2014/04/21', reason: 'Fired', contract: '3 years, $10-12m', interim: 'No' },
    { Name: 'Derek Fisher', start: '2014/06/10', end: '2016/02/08', reason: 'Fired', contract: '5 years, $25m', interim: 'No' },
    { Name: 'Kurt Rambis', start: '2016/02/08', end: '2016/05/18', reason: '', contract: '', interim: 'Yes' },
    { Name: 'Jerr Hornacek', start: '2016/05/18', end: '2017/04/01', reason: '', contract: '3 years, $15m', interim: 'No' },
  ];

  const GMs = [
    { Name: 'Scott Layden', start: '1999/08/10', end: '2003/12/22', reason: 'Fired', interim: 'No' },
    { Name: 'Isiah Thomas', start: '2003/12/22', end: '2008/04/02', reason: 'Fired', interim: 'No' },
    { Name: 'Donnie Walsh', start: '2008/04/02', end: '2011/06/03', reason: 'Resigned', interim: 'No' },
    { Name: 'Glen Grunnwald', start: '2011/06/04', end: '2012/04/24', reason: 'Became full-time', interim: 'Yes' },
    { Name: 'Glen Grunwald', start: '2012/04/24', end: '2013/09/26', reason: 'Demoted', interim: 'No' },
    { Name: 'Steve Mills', start: '2013/09/26', end: '2014/03/03', reason: 'Demoted', interim: 'No' },
    { Name: 'Phil Jackson', start: '2014/03/03', end: '2017/04/01', reason: '', interim: 'No' },
  ];

  const salaryLine = d3.line()
    .x((d, i) => (2000 / (leagueRank.length - 1)) * i)
    .y(d => d.salaryRank * 10);

  const winLossLine = d3.line()
    .x((d, i) => (2000 / (leagueRank.length - 1)) * i)
    .y(d => d.winLossRank * 10);

  const parseTime = d3.timeParse('%Y/%m/%d');
  const timeScale = d3.scaleTime()
    .range([0, 2000])
    .domain([parseTime('1999/08/30'), parseTime('2017/04/01')]);

  const svg = d3.select('#viz').append('svg')
    .attr('width', svgWidth)
    .attr('height', `${svgHeight}px`);

  svg.append('path')
      .datum(leagueRank)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 4)
      .attr('d', salaryLine);

  svg.append('path')
      .datum(leagueRank)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 4)
      .attr('d', winLossLine);

  svg.append('line')
    .attr('x1', 0)
    .attr('y1', 300)
    .attr('x2', svgWidth)
    .attr('y2', 300)
    .attr('stroke', '#ccc')
    .attr('stroke-width', 1);

    const GMsGroup = svg.append('g')
      .attr('class', 'gms');

    GMsGroup.selectAll('rect.gm')
      .data(GMs)
      .enter()
      .append('rect')
      .attr('data-name', d => d.Name)
      .attr('class', 'gm')
      .attr('x', d => timeScale(parseTime(d.start)))
      .attr('y', (d, i) => (i * 12) + 400)
      .attr('width', d => (timeScale(parseTime(d.end)) - timeScale(parseTime(d.start))))
      .attr('height', 10)
      .style('fill', '#383831');

  const coachesGroup = svg.append('g')
    .attr('class', 'coaches');

  coachesGroup.selectAll('rect.coach')
    .data(coaches)
    .enter()
    .append('rect')
    .attr('data-name', d => d.Name)
    .attr('class', 'coach')
    .attr('x', d => timeScale(parseTime(d.start)))
    .attr('y', (d, i) => (i * 12) + 500)
    .attr('width', d => (timeScale(parseTime(d.end)) - timeScale(parseTime(d.start))))
    .attr('height', 10)
    .style('fill', '#383831');
}());
