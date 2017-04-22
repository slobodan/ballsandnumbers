/* global d3, jQuery, window, document */
d3.csv('/assets/data/lottery.csv', (error, data) => {
  console.log(data);

  const width = jQuery('#viz').width();
  const height = width / 2;

  const svg = d3.select('#viz').append('svg')
    .attr('width', width)
    .attr('height', height);

  const xScale = d3.scaleTime()
      .rangeRound([10, width - 10])
      .domain([0, 82]);

  const yScale = d3.scaleLinear()
      .rangeRound([height - 10, 10])
      .domain([0, 1]);

  /*
   * Do Voronoi here, if possible
   * https://pudding.cool/2017/03/westbrook/
   * https://bl.ocks.org/mbostock/8033015
   */

  const line = d3.line()
    .curve(d3.curveBasis)
    .x(d => xScale(d.game))
    .y(d => yScale(d.record));

  const colorScale = d3.scaleOrdinal(d3.schemeCategory20);

  const g = svg.append('g');

  g.append('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', yScale(0.5))
    .attr('y2', yScale(0.5))
    .attr('stroke', '#282882')
   .attr('stroke-width', 2);

  const ifTanker = function ifTanker(d) {
    return d[d.length - 1].record < 0.2;
  };

  const lines = g.selectAll('path.team-line')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'team-line')
    .attr('data-team', d => d.Team)
    .attr('data-season', d => d.Season)
    .datum((d) => {
      const gamesArray = d.Games.split('');
      const formattedArray = gamesArray.map((el, index) => {
        const playedGames = d.Games.slice(0, index + 1);
        const playedGamesArray = playedGames.split('');
        const wonGames = playedGamesArray.filter(game => game === 'W').length;
        const lostGames = playedGamesArray.filter(game => game === 'L').length;

        const value = {
          record: wonGames / (wonGames + lostGames),
          record500: wonGames - lostGames,
          game: index + 1,
        };
        return value;
      });

      return [{ record: 0.5, record500: 0, game: 0 }].concat(formattedArray);
    })
    .attr('fill', 'none')
    .attr('stroke', (d, i) => ifTanker(d) ? '#000' : '#ccc')
    .attr('stroke-width', (d) => ifTanker(d) ? 2 : 1)
    .attr('d', line)
    .style('opacity', (d) => ifTanker(d) ? 1 : 0.1);
});
