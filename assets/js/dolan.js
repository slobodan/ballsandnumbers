/* global d3, jQuery, ScrollMagic, window */
(function bnnDolan() {
  // const svgWidth = jQuery('#viz').width();
  // const svgHeight = jQuery(window).height() - jQuery('#viz').offset().top - 30;
  const wrapperWidth = jQuery('#viz-wrapper').width();
  // const wrapperHeight = jQuery('#viz-wrapper').height();
  const margin = { top: 50, right: 0, bottom: 0, left: 150 };
  const svgHeight = jQuery(window).height();
  const svgWidth = svgHeight * 3 > 2000 ? svgHeight * 3 : 2000;
  // const svgWidth = wrapperWidth;

  const primaryColor = '#006BB6';
  const secondaryColor = '#F58426';
  const tertiaryColor = '#BEC0C2';
  const blackColor = '#282828';

  const gmsTop = svgHeight - 40;
  const axisVerticalPlacement = svgHeight - 120;

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

  const GMs = [
    // { name: 'Scott Layden', start: '1999/08/10', end: '2003/12/22', reason: 'Fired' },
    { name: 'Scott Layden', start: '1999/08/30', end: '2003/12/22', reason: 'Fired' },
    { name: 'Isiah Thomas', start: '2003/12/22', end: '2008/04/02', reason: 'Fired' },
    { name: 'Donnie Walsh', start: '2008/04/02', end: '2011/06/03', reason: 'Resigned' },
    { name: 'Glen Grunwald', start: '2011/06/04', end: '2013/09/26', reason: 'Demoted' },
    { name: 'Steve Mills', start: '2013/09/26', end: '2014/03/03', reason: 'Demoted' },
    { name: 'Phil Jackson', start: '2014/03/03', end: '2017/04/01', reason: '' },
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

  const seasonSplits = [
    '2000/07/01',
    '2001/07/01',
    '2002/07/01',
    '2003/07/01',
    '2004/07/01',
    '2005/07/01',
    '2006/07/01',
    '2007/07/01',
    '2008/07/01',
    '2009/07/01',
    '2010/07/01',
    '2011/07/01',
    '2012/07/01',
    '2013/07/01',
    '2014/07/01',
    '2015/07/01',
    '2016/07/01',
  ];

  const parseTime = d3.timeParse('%Y/%m/%d');
  const timeScale = d3.scaleTime()
    .range([0, (svgWidth - margin.left)])
    .domain([parseTime('1999/07/01'), parseTime('2017/06/30')]);

  const rankScale = d3.scaleLinear()
    .range([svgHeight * 0.5, axisVerticalPlacement - 20])
    .domain([1, 30]);

  const salaryLine = d3.line()
    .x(d => (timeScale(parseTime(`20${d.season.slice(-2)}/01/01`))))
    .y(d => rankScale(d.salaryRank));

  const winLossLine = d3.line()
  .x(d => (timeScale(parseTime(`20${d.season.slice(-2)}/01/01`))))
    .y(d => rankScale(d.winLossRank));

  const svg = d3.select('#viz').append('svg')
    .attr('width', svgWidth)
    .attr('height', `${svgHeight}px`);

  const g = svg.append('g')
    .attr('class', 'viz-container')
    .attr('transform', `translate(${margin.left}, 0)`);

  // Draw chart legend
  function drawLegend() {
    const legendFontSize = '14px';
    const legendLeftPush = -10;
    const legend = g.append('g')
      .attr('class', 'legend');

    legend.append('text')
      .text('General manager')
      .attr('x', -margin.left + 15)
      .attr('y', gmsTop)
      .style('alignment-baseline', 'middle')
      .style('font-size', legendFontSize)
      .style('font-weight', 'bold');

    legend.append('text')
      .text('1')
      .attr('x', legendLeftPush)
      .attr('y', rankScale(1))
      .attr('text-anchor', 'end')
      .style('alignment-baseline', 'middle')
      .style('font-size', legendFontSize);

    legend.append('text')
      .text('10')
      .attr('x', legendLeftPush)
      .attr('y', rankScale(10))
      .attr('text-anchor', 'end')
      .style('alignment-baseline', 'middle')
      .style('font-size', legendFontSize);

    legend.append('text')
      .text('20')
      .attr('x', legendLeftPush)
      .attr('y', rankScale(20))
      .attr('text-anchor', 'end')
      .style('alignment-baseline', 'middle')
      .style('font-size', legendFontSize);

    legend.append('text')
      .text('30')
      .attr('x', legendLeftPush)
      .attr('y', rankScale(30))
      .attr('text-anchor', 'end')
      .style('alignment-baseline', 'middle')
      .style('font-size', legendFontSize);

    const winLossLegend = legend.append('g')
      .attr('transform', `translate(0, ${rankScale(15) - 20})`);

    winLossLegend.append('text')
      .text('League rank')
      .attr('x', -margin.left + 15)
      .attr('y', 0)
      .style('alignment-baseline', 'middle')
      .style('font-size', legendFontSize)
      .style('font-weight', 'bold');

    winLossLegend.append('circle')
      .attr('cx', -margin.left + 22)
      .attr('cy', 30)
      .attr('r', 4)
      .style('fill', secondaryColor);

    winLossLegend.append('circle')
      .attr('cx', -margin.left + 22)
      .attr('cy', 50)
      .attr('r', 4)
      .style('fill', primaryColor);

    winLossLegend.append('text')
      .text('win/loss')
      .attr('x', -margin.left + 35)
      .attr('y', 30)
      .style('alignment-baseline', 'middle')
      .style('font-size', legendFontSize);

    winLossLegend.append('text')
      .text('salary')
      .attr('x', -margin.left + 35)
      .attr('y', 50)
      .style('alignment-baseline', 'middle')
      .style('font-size', legendFontSize);
  }
  drawLegend();

  // Draw rank sub-chart
  function drawRanks() {
    const rankChart = g.append('g')
      .attr('class', 'rank-chart');

    rankChart.append('rect')
      .attr('x', timeScale(parseTime('1999/07/01')))
      .attr('y', rankScale(1) - 20)
      .attr('width', timeScale(parseTime('2017/06/30')) - timeScale(parseTime('1999/07/01')))
      .attr('height', (rankScale(30) - rankScale(1)) + (20 + 20))
      .style('fill', tertiaryColor)
      .style('opacity', 0.2);

    rankChart.selectAll('line.range-line')
      .data([1, 10, 20, 30])
      .enter()
      .append('line')
      .attr('class', 'range-line')
      .attr('x1', timeScale(parseTime('1999/07/01')))
      .attr('y1', d => rankScale(d))
      .attr('x2', timeScale(parseTime('2017/07/01')))
      .attr('y2', d => rankScale(d))
      .attr('stroke', tertiaryColor)
      .attr('stroke-width', 1)
      .attr('shape-rendering', 'crispEdges')
      .style('opacity', 0.5);

    rankChart.append('path')
      .datum(leagueRank)
      .attr('fill', 'none')
      .attr('stroke', primaryColor)
      .attr('stroke-width', 3)
      .attr('d', salaryLine);

    rankChart.append('path')
      .datum(leagueRank)
      .attr('fill', 'none')
      .attr('stroke', secondaryColor)
      .attr('stroke-width', 3)
      .attr('d', winLossLine);

    rankChart.selectAll('circle.salary-circle')
      .data(leagueRank)
      .enter()
      .append('circle')
      .attr('class', 'salary-circle')
      .attr('cx', d => (timeScale(parseTime(`20${d.season.slice(-2)}/01/01`))))
      .attr('cy', d => rankScale(d.salaryRank))
      .attr('r', 5)
      .attr('fill', primaryColor);

    rankChart.selectAll('circle.win-loss-circle')
      .data(leagueRank)
      .enter()
      .append('circle')
      .attr('class', 'win-loss-circle')
      .attr('cx', d => (timeScale(parseTime(`20${d.season.slice(-2)}/01/01`))))
      .attr('cy', d => rankScale(d.winLossRank))
      .attr('r', 5)
      .attr('fill', secondaryColor);
  }
  drawRanks();

  // Season split grid lines
  const splitLinesGroup = g.append('g')
    .attr('class', 'split-lines-group');

  splitLinesGroup.selectAll('line.season-split-line')
    .data(seasonSplits)
    .enter()
    .append('line')
    .attr('class', 'season-split-line')
    .attr('x1', d => timeScale(parseTime(d)))
    .attr('y1', 0)
    .attr('x2', d => timeScale(parseTime(d)))
    .attr('y2', svgHeight - 120)
    .attr('stroke', tertiaryColor)
    .attr('stroke-width', 1)
    .style('opacity', 0.2);

  // Add "Dolan line"
  function drawDolanLine() {
    g.append('line')
      .attr('class', 'dolan-line')
      .attr('x1', timeScale(parseTime('1999/08/30')))
      .attr('y1', margin.top)
      .attr('x2', timeScale(parseTime('1999/08/30')))
      .attr('y2', svgHeight - 120)
      .attr('stroke', blackColor)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '10, 10');

    g.append('text')
      .text('August 30th, 1999 - Dolan takes over')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'end')
      .attr('x', -margin.top)
      .attr('y', timeScale(parseTime('1999/08/30')) + 5)
      .style('font-size', '16px')
      .style('alignment-baseline', 'hanging');
  }
  drawDolanLine();

  // Need to look into collision detection here, to automate y coordinate for events
  let eventYs = [];
  function drawEvents() {
    const eventsGroup = g.append('g')
      .attr('class', 'events');

    const singleEvents = eventsGroup.selectAll('g.single-event')
      .data(events)
      .enter()
      .append('g')
      .attr('class', 'single-event')
      .attr('transform', (d) => {
        const eventHeight = 20;
        const eventsSpace = (svgHeight * 0.4) - 50;
        const verticalEvents = Math.floor(eventsSpace / eventHeight);
        // const yPos = (Math.random() * ((svgHeight * 0.4) - 50)) + margin.top;
        // const yPos = (((i + 1) % verticalEvents) * eventHeight) + margin.top;
        const yPos = (Math.floor(Math.random() * verticalEvents) * eventHeight) + margin.top;
        const xPos = timeScale(parseTime(d.date));
        return `translate(${xPos}, ${yPos})`;
      })
      .attr('data-ratio', d => timeScale(parseTime(d.date)) / timeScale(parseTime('2017/06/30')));

    singleEvents.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 2)
      .style('fill', blackColor);

    /* singleEvents.append('line')
      .attr('x1', d => timeScale(parseTime(d.date)))
      .attr('y1', 0)
      .attr('x2', d => timeScale(parseTime(d.date)))
      .attr('y2', svgHeight)
      .attr('stroke', tertiaryColor)
      .attr('stroke-width', 1); */

    singleEvents.append('text')
      .text(d => d.title)
      .attr('x', (d, i) => {
        let xPos;
        if (events.length - i <= 10) {
          xPos = -8;
        } else {
          xPos = 8;
        }
        return xPos;
      })
      .attr('y', 0)
      .attr('alignment-baseline', 'middle')
      .style('text-anchor', (d, i) => {
        let anchor;
        if (events.length - i <= 10) {
          anchor = 'end';
        } else {
          anchor = 'start';
        }
        return anchor;
      })
      .style('fill', blackColor)
      .style('font-size', '14px');
  }
  drawEvents();

  // Axis
  function drawAxis() {
    const axisGroup = g.append('g')
      .attr('class', 'axis-group')
      .attr('transform', `translate(0, ${axisVerticalPlacement})`);

    axisGroup.append('line')
      .attr('x1', timeScale(parseTime('1999/07/01')))
      .attr('y1', 0)
      .attr('x2', timeScale(parseTime('2017/06/30')))
      .attr('y2', 0)
      .attr('stroke', blackColor)
      .attr('stroke-width', 3);

    const seasonTicks = leagueRank.map(el => el.season);
    axisGroup.selectAll('line.season-tick')
      .data(seasonTicks)
      .enter()
      .filter(d => d !== '2016-17')
      .append('line')
      .attr('class', 'season-tick')
      .attr('x1', d => timeScale(parseTime(`20${d.slice(-2)}/07/01`)))
      .attr('y1', -5)
      .attr('x2', d => timeScale(parseTime(`20${d.slice(-2)}/07/01`)))
      .attr('y2', 5)
      .attr('stroke', blackColor)
      .attr('stroke-width', 3);

    axisGroup.selectAll('text')
      .data(seasonTicks)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d) => {
        const secondYear = +`20${d.slice(-2)}`;
        const firstYear = +`20${d.slice(-2)}` - 1;
        return (timeScale(parseTime(`${secondYear}/07/01`)) + timeScale(parseTime(`${firstYear}/07/01`))) / 2;
      })
      .attr('y', 15)
      .style('font-size', '16px')
      .style('fill', blackColor)
      .style('alignment-baseline', 'middle')
      .style('text-anchor', 'middle');
  }
  drawAxis();

  // GMs
  function drawGMs() {
    const GMsGroup = g.append('g')
      .attr('class', 'gms');

    GMsGroup.selectAll('rect.gm')
      .data(GMs)
      .enter()
      .append('rect')
      .attr('data-name', d => d.name)
      .attr('data-start', d => d.start)
      .attr('data-end', d => d.end)
      .attr('class', 'gm')
      .attr('x', d => timeScale(parseTime(d.start)) + 2)
      .attr('y', (d, i) => i % 2 === 0 ? gmsTop : gmsTop - 10)
      .attr('width', d => (timeScale(parseTime(d.end)) - timeScale(parseTime(d.start))) - 2)
      .attr('height', 10)
      .style('fill', tertiaryColor);

    GMsGroup.selectAll('text')
      .data(GMs)
      .enter()
      .append('text')
      .text(d => d.name)
      .attr('x', d => timeScale(parseTime(d.start)) + 4)
      .attr('y', (d, i) => (i % 2 === 0) ? gmsTop + 15 : gmsTop - 15)
      .style('font-size', '12px')
      .style('fill', blackColor)
      .style('alignment-baseline', (d, i) => (i % 2 === 0 ? 'hanging' : 'baseline'));
  }
  drawGMs();

  // ScrollMagic
  function scroller() {
    const controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
      triggerElement: '#trigger-1',
      duration: 5000 - svgHeight,
    })
      .setPin('#viz')
      .addTo(controller)
      .triggerHook(0)
      .on('progress', (e) => {
        const translateScale = d3.scaleLinear().domain([0.1, 0.9]).range([0, 1]);
        let xTranslate;

        if (e.progress < 0.1) {
          xTranslate = margin.left;
        } else if (e.progress > 0.9) {
          xTranslate = (wrapperWidth - svgWidth) + margin.left;
        } else {
          xTranslate = (translateScale(e.progress) * (wrapperWidth - svgWidth)) + margin.left;
        }

        g.attr('transform', `translate(${xTranslate}, 0)`);
      });
  }
  scroller();
}());
