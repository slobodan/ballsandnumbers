/* global d3, jQuery */
d3.csv('/assets/data/bpm.csv', (error, rawData) => {
  const data = rawData.filter(row => row.MP >= 200 && row.Tm !== 'TOT');
  console.log(data);

  const svgWidth = jQuery('#viz').width();
  const teamHeight = 80;
  const margin = { top: 150, right: 0, bottom: 100, left: 220 };
  const svgHeight = (30 * teamHeight) + margin.top + margin.bottom;

  const svg = d3.select('#viz').append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  const bpmScale = d3.scaleLinear()
    .range([margin.left + 20, svgWidth - 20])
    .domain(d3.extent(data, d => +d.BPM))
    .nice();

  const wsScale = d3.scaleLinear()
    .range([margin.left + 20, svgWidth - 20])
    .domain(d3.extent(data, d => +d.WS))
    .nice();

  const perScale = d3.scaleLinear()
    .range([margin.left + 20, svgWidth - 20])
    .domain(d3.extent(data, d => +d.PER))
    .nice();

  const vorpScale = d3.scaleLinear()
    .range([margin.left + 20, svgWidth - 20])
    .domain(d3.extent(data, d => +d.VORP))
    .nice();

  const minutesExtent = d3.extent(data, d => +d.MP);
  const minutesScale = d3.scaleSqrt()
    .range([5, (teamHeight / 2) - 15])
    .domain(minutesExtent)
    .nice();

  const gridLinesData = [-5, 0, 5, 10, 15];

  const circleColor = '#3B8686';
  const circleBorderColor = '#0B486B';

  // Get team abbreviations
  const uniqueTeams = [];
  data.forEach((d) => {
    if (uniqueTeams.indexOf(d.Tm) === -1 && d.Tm !== 'TOT') {
      uniqueTeams.push(d.Tm);
    }
  });
  uniqueTeams.sort();

  const g = svg.append('g')
    .attr('transform', `translate(0, ${margin.top})`);

  const teams = g.selectAll('g.team')
    .data(uniqueTeams)
    .enter()
    .append('g')
    .attr('class', 'team')
    .attr('transform', (d, i) => `translate(0, ${i * teamHeight})`);

  teams.append('text')
    .text(d => d)
    .attr('y', teamHeight / 2)
    .attr('alignment-baseline', 'middle')
    .style('font-size', '18px');

  const circlesGroup = g.append('g')
    .attr('class', 'player-circles');

  const playerCircles = circlesGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => bpmScale(d.BPM))
    .attr('cy', d => (uniqueTeams.indexOf(d.Tm) * teamHeight) + (teamHeight / 2))
    .attr('r', d => minutesScale(d.MP))
    .attr('data-player', d => d.Player)
    .attr('data-bpm', d => d.BPM)
    .attr('data-mp', d => d.MP)
    .attr('data-team', d => d.Tm)
    .style('fill', circleColor)
    .style('opacity', 0.3)
    .attr('stroke', circleBorderColor)
    .attr('stroke-width', '1px');

  const playerNames = circlesGroup.selectAll('text')
    .data(data)
    .enter()
    .filter(d => d.Player.substring(0, 17) === 'Russell Westbrook')
    .append('text')
    .text(d => d.Player.substring(0, 17))
    .attr('x', d => bpmScale(d.BPM) - minutesScale(d.MP) - 5)
    .attr('y', d => (uniqueTeams.indexOf(d.Tm) * teamHeight) + (teamHeight / 2))
    .style('text-anchor', 'end')
    .style('alignment-baseline', 'middle')
    .style('font-size', '12px');


  d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
      const firstChild = this.parentNode.firstChild;
      if (firstChild) {
        this.parentNode.insertBefore(this, firstChild);
      }
    });
  };

  // Grid labels
  g.selectAll('text.grid-label')
    .data(gridLinesData)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', d => bpmScale(d))
    .attr('y', -15)
    .style('text-anchor', 'middle')
    .style('font-size', '14px');

  g.append('text')
    .text('BPM')
    .attr('x', margin.left)
    .attr('y', -15)
    .style('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('font-weight', 'bold');

  g.selectAll('text.grid-label')
    .data(gridLinesData)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', d => bpmScale(d))
    .attr('y', svgHeight - 225)
    .style('text-anchor', 'middle')
    .style('font-size', '14px');

  g.append('text')
    .text('BPM')
    .attr('x', margin.left)
    .attr('y', svgHeight - 225)
    .style('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('font-weight', 'bold');

  g.append('line')
    .attr('x1', margin.left)
    .attr('y1', 0)
    .attr('x2', margin.left)
    .attr('y2', uniqueTeams.length * teamHeight)
    .attr('stroke', '#000')
    .attr('stroke-width', '2px')
    .style('opacity', 0.5);

  const gridLines = g.selectAll('line.grid-line')
    .data(gridLinesData)
    .enter()
    .append('line')
    .attr('class', 'grid-line')
    .attr('x1', d => bpmScale(d))
    .attr('y1', 0)
    .attr('x2', d => bpmScale(d))
    .attr('y2', uniqueTeams.length * teamHeight)
    .attr('stroke', '#000')
    .style('opacity', d => d === 0 ? 0.225 : 0.075);

  gridLines.moveToBack();

  const circleLegend = svg.append('g');
  const circleLegendMax = circleLegend.append('g')
    .attr('transform', `translate(${svgWidth - 150}, 70)`);
  const circleLegendMin = circleLegend.append('g')
    .attr('transform', `translate(${svgWidth - 70}, 70)`);

  circleLegend.append('text')
    .text('Minutes played')
    .attr('transform', `translate(${svgWidth - 190}, 70)`)
    .attr('alignment-baseline', 'middle')
    .attr('text-anchor', 'end')
    .style('font-size', '14px')
    .style('font-weight', 'bold');

  circleLegendMax.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', minutesScale(minutesScale.domain()[0]))
    .style('fill', circleColor)
    .style('opacity', 0.3)
    .attr('stroke', circleBorderColor)
    .attr('stroke-width', '1px');

  circleLegendMax.append('text')
    .text(minutesScale.domain()[0])
    .attr('x', minutesScale(minutesScale.domain()[0]) + 5)
    .attr('alignment-baseline', 'middle')
    .style('font-size', '14px');

  circleLegendMin.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', minutesScale(minutesScale.domain()[1]))
    .style('fill', circleColor)
    .style('opacity', 0.3)
    .attr('stroke', circleBorderColor)
    .attr('stroke-width', '1px');

  circleLegendMin.append('text')
    .text(minutesScale.domain()[1])
    .attr('x', minutesScale(minutesScale.domain()[1]) + 5)
    .attr('alignment-baseline', 'middle')
    .style('font-size', '14px');

  const sepLines = g.selectAll('line.sep-line')
    .data(uniqueTeams)
    .enter()
    .append('line')
    .attr('class', 'sep-line')
    .attr('x1', 0)
    .attr('y1', (d, i) => (i + 1) * teamHeight)
    .attr('x2', svgWidth)
    .attr('y2', (d, i) => (i + 1) * teamHeight)
    .attr('stroke', '#000')
    .attr('stroke-width', '2px')
    .style('opacity', 0.5);

  g.append('line')
    .attr('class', 'sep-line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', svgWidth)
    .attr('y2', 0)
    .attr('stroke', '#000')
    .attr('stroke-width', '2px')
    .style('opacity', 0.5);

  sepLines.moveToBack();
});
