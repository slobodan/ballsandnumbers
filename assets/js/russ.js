/* global jQuery, d3 */
(function () {
  const primaryColor = '#007DC3';
  const secondaryColor = '#FDBB30';
  const labelTextSize = '14px';

  function russUSG() {
    const russCareerUSG = [
        { Season: '2008-09', USG: '25.8' },
        { Season: '2009-10', USG: '25.7' },
        { Season: '2010-11', USG: '31.6' },
        { Season: '2011-12', USG: '32.7' },
        { Season: '2012-13', USG: '32.8' },
        { Season: '2013-14', USG: '34.4' },
        { Season: '2014-15', USG: '38.4' },
        { Season: '2015-16', USG: '31.6' },
        { Season: '2016-17', USG: '42.0' },
    ];

    const width = jQuery('#viz-russ-usg').width();
    const height = width / 3;

		var y = d3.scaleLinear()
			.range([height - 40, 20])
			.domain(d3.extent(russCareerUSG, function(d) {
				return +d.USG;
			}))
			.nice();

		var x = d3.scaleLinear()
			.range([90, width - 60])
			.domain([0, russCareerUSG.length - 1]);

		var line = d3.line()
			.x(function(d, i) { return x(i); })
			.y(function(d) { return y(d.USG); });

		var svgRussUSG = d3.select('#viz-russ-usg')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		var g = svgRussUSG.append('g');

		// Grid lines
		var usgGrid = g.append('g')
			.attr('class', 'usg-grid');

		usgGrid.selectAll('line.grid-line')
			.data([25, 30, 35, 40])
			.enter()
			.append('line')
			.attr('class', 'grid-line')
			.attr('x1', 80)
			.attr('y1', function(d) {
				return y(d);
			})
			.attr('x2', width - 50)
			.attr('y2', function(d) {
				return y(d);
			})
			.attr('stroke', '#eee')
			.attr('stroke-width', 1);

		usgGrid.selectAll('text.line-text')
			.data([25, 30, 35, 40])
			.enter()
			.append('text')
			.attr('class', 'line-text')
			.text(function(d) { return d + '%'; })
			.attr('x', 50)
			.attr('y', function(d) { return y(d); })
			.style('font-size', labelTextSize)
			.style('fill', '#666')
			.style('alignment-baseline', 'middle');

		g.append('path')
			.datum(russCareerUSG)
			.attr('fill', 'none')
			.attr('stroke', '#007DC3')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 3)
			.attr('d', line);

		// Add no Durant circles
		var annotation = g.append('g')
			.attr('class', 'annotation');

		annotation.selectAll('circle.no-durant')
			.data([{ Season: 6, 'USG': 38.4 }, { Season: 8, 'USG': 42.0 }])
			.enter()
			.append('circle')
			.attr('class', 'no-durant')
			.attr('cx', function(d) {
				return x(d.Season);
			})
			.attr('cy', function(d) {
				return y(d.USG);
			})
			.attr('r', 6)
			.style('fill', primaryColor);

		annotation.append('text')
			.text('Durant played 27 games')
			.attr('x', x(6) - 10)
			.attr('y', y(russCareerUSG[6].USG) - 10)
			.style('font-size', labelTextSize)
			.style('text-anchor', 'end')
			.style('alignment-baseline', 'middle');

		annotation.append('text')
			.text('No Durant')
			.attr('x', x(8) - 10)
			.attr('y', y(russCareerUSG[8].USG) - 10)
			.style('font-size', labelTextSize)
			.style('text-anchor', 'end')
			.style('alignment-baseline', 'middle');

		var xAxis = g.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(0, ' + (height - 10) + ')');

		xAxis.selectAll('text.year')
			.data(russCareerUSG)
			.enter()
			.append('text')
			.attr('class', 'year')
			.attr('x', function(d, i) {
				return x(i);
			})
			.text(function(d) {
				return d.Season;
			})
			.style('font-size', labelTextSize)

	}
	russUSG();

	// OKC USG% / AST% scatterplot
	function scatterPlot() {
		d3.csv('/assets/data/russ.csv', function (error, data) {
			if (error) throw error;

			// console.log(data);

			data.forEach(function (d) {
				d.USGP = +d.USGP;
				d.ASTP = +d.ASTP;
			});

			var margin = {top: 20, right: 200, bottom: 100, left: 40},
				width = jQuery('#viz-scatter').width() - margin.left - margin.right,
				height = width / 1.2 - margin.top - margin.bottom;

			var x = d3.scaleLinear()
				.range([0, width]);

			var y = d3.scaleLinear()
				.range([height, 0]);

			var xAxis = d3.axisBottom()
				.scale(x);

			var yAxis = d3.axisLeft()
				.scale(y);

			var svgScatter = d3.select('#viz-scatter').append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			x.domain(d3.extent(data, function (d) {
				return d.USGP;
			})).nice();
			y.domain(d3.extent(data, function (d) {
				return d.PAST;
			})).nice();

			svgScatter.selectAll('.dot')
				.data(data)
				.enter()
				.filter(function (d) {
					return +d.MIN.substring(0, 2) >= 15;
				})
				.append('circle')
				.attr('data-name', function (d) {
					return d.PLAYER;
				})
				.attr('class', 'dot')
				.attr('r', 4)
				.attr('cx', function (d) {
					return x(+d.USGP);
				})
				.attr('cy', function (d) {
					return y(+d.PAST);
				})
				.style('fill', function (d) {
					if ('Russell Westbrook' === d.PLAYER) {
						return primaryColor;
					} else {
						return secondaryColor;
					}
				})
				.style('opacity', 0.5);

			svgScatter.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + (height + 12) + ')')
				.call(xAxis)
				.style('font-size', '12px')
				.append('text')
				.attr('class', 'label')
				.attr('x', width)
				.attr('y', -6)
				.style('text-anchor', 'end')
				.style('fill', '#111')
				.text('USG%');

			svgScatter.append('g')
				.attr('class', 'y axis')
				.attr('transform', 'translate(-12, 0)')
				.call(yAxis)
				.style('font-size', '12px')
				.append('text')
				.attr('class', 'label')
				.attr('transform', 'rotate(-90)')
				.attr('y', 6)
				.attr('dy', '.71em')
				.style('text-anchor', 'end')
				.style('fill', '#111')
				.style('font-size', '100%')
				.text('AST%');

			var legend = svgScatter.append('g')
				.attr('class', 'legend')
				.attr('transform', 'translate(' + (width + 40) + ', 40)');

			legend.append('circle')
				.attr('cx', 0)
				.attr('cy', 0)
				.attr('r', 4)
				.style('opacity', 0.75)
				.style('fill', primaryColor);

			legend.append('text')
				.text('Russell Westbrook')
				.attr('x', 10)
				.style('font-size', labelTextSize)
				.style('alignment-baseline', 'middle')

			legend.append('circle')
				.attr('cx', 0)
				.attr('cy', 20)
				.attr('r', 4)
				.style('opacity', 0.75)
				.style('fill', secondaryColor);

			legend.append('text')
				.text('Other OKC players')
				.attr('x', 10)
				.attr('y', 20)
				.style('font-size', labelTextSize)
				.style('alignment-baseline', 'middle');

			var title = svgScatter.append('g')
				.attr('class', 'title')
				.attr('transform', 'translate(0, ' + (height + margin.bottom - 30) + ')');

			title.append('text')
				.text('USG% and AST% for OKC players, each dot represents one game played by one player,')
				.style('font-size', labelTextSize);

			title.append('text')
				.text('games with 15 or more minutes played qualify, source stats.nba.com')
				.attr('y', 20)
				.style('font-size', labelTextSize);
		});
	}
	scatterPlot();

	function TSWithWithout() {
		var TSWithWithout = [
			{ Name: 'Victor Oladipo', minWith: 1392, minWithout: 376, TSWith: 57.3, TSWithout: 49.8 },
			{ Name: 'Domantas Sabonis', minWith: 1172, minWithout: 243, TSWith: 49.5, TSWithout: 40.1 },
			{ Name: 'Jerami Grant', minWith: 668, minWithout: 624, TSWith: 59.7, TSWithout: 52.4 },
			{ Name: 'Enes Kanter', minWith: 641, minWithout: 612, TSWith: 59.5, TSWithout: 62.0 },
			{ Name: 'Álex Abrines', minWith: 407, minWithout: 466, TSWith: 64.5, TSWithout: 55.2 },
			{ Name: 'Joffrey Lauvergne', minWith: 273, minWithout: 466, TSWith: 60.9, TSWithout: 47.8 }
		];

		var width = jQuery('#viz-ts').width(),
			margin = { top: 30, bottom: 100 },
			rowHeight = 50,
			height = rowHeight * TSWithWithout.length;

		var tsScale = d3.scaleLinear()
			.range([150, width - 150])
			.domain([35, 70]);

		var TSSVG = d3.select('#viz-ts')
			.append('svg')
			.attr('width', width)
			.attr('height', height + margin.top + margin.bottom);

		var labelsContainer = TSSVG.append('g')
			.attr('class', 'labels');

		var labels = labelsContainer.selectAll('g.label')
			.data([40, 50, 60])
			.enter()
			.append('g')
			.attr('class', 'label')
			.attr('transform', function(d) {
				return 'translate(' + tsScale(d) + ', ' + (height + 40) + ')';
			});

		labels.append('text')
			.text(function(d) {
				return d + '%';
			})
			.style('font-size', labelTextSize)
			.style('text-anchor', 'middle');

		labels.append('line')
			.attr('x1', 0)
			.attr('x2', 0)
			.attr('y1', (-height - 40))
			.attr('y2', -40)
			.attr('stroke', '#eee')
			.attr('stroke-width', 1);

		var players = TSSVG.selectAll('g.player')
			.data(TSWithWithout)
			.enter()
			.append('g')
			.attr('class', 'player')
			.attr('transform', function(d, i) {
				return 'translate(0, ' + (i * rowHeight + margin.top) + ')';
			});

		players.append('text')
			.text(function(d){ return d.Name; })
			.attr('x', 150)
			.style('font-size', '16px')
			.style('alignment-baseline', 'middle')
			.style('text-anchor', 'end');

		players.append('line')
			.attr('x1', function(d) {
				return tsScale(d.TSWith);
			})
			.attr('y1', 0)
			.attr('x2', function(d) {
				return tsScale(d.TSWithout);
			})
			.attr('y2', 0)
			.attr('stroke', function(d) {
				if (d.TSWith > d.TSWithout) {
					return secondaryColor;
				} else {
					return primaryColor;
				}
			})
			.attr('stroke-width', 2);

		players.append('circle')
			.attr('cx', function(d) {
				return tsScale(d.TSWithout);
			})
			.attr('cy', 0)
			.attr('r', 5)
			.attr('shape-rendering', 'geometricPrecision')
			.style('fill', function(d) {
				if (d.TSWith > d.TSWithout) {
					return secondaryColor;
				} else {
					return primaryColor;
				}
			});

		players.append('line')
			.attr('x1', function(d) {
				return tsScale(d.TSWith);
			})
			.attr('y1', -5)
			.attr('x2', function(d) {
				return tsScale(d.TSWith);
			})
			.attr('y2', 5)
			.attr('stroke', function(d) {
				if (d.TSWith > d.TSWithout) {
					return secondaryColor;
				} else {
					return primaryColor;
				}
			})
			.attr('stroke-width', 2);

		var legend = TSSVG.append('g')
			.attr('class', 'legend')
			.attr('transform', 'translate(' + (width - 150) + ', ' + margin.top + ')');

		legend.append('line')
			.attr('x1', 0)
			.attr('y1',  -5)
			.attr('x2', 0)
			.attr('y2', 5)
			.attr('stroke', secondaryColor)
			.attr('stroke-width', 2);

		legend.append('text')
			.text('With Westbrook')
			.attr('x', 20)
			.attr('y', 0)
			.style('font-size', labelTextSize)
			.style('alignment-baseline', 'middle');


		legend.append('circle')
			.attr('cx', 0)
			.attr('cy', 25)
			.attr('r', 5)
			.attr('shape-rendering', 'geometricPrecision')
			.style('fill', secondaryColor);

		legend.append('text')
			.text('Without Westbrook')
			.attr('x', 20)
			.attr('y', 25)
			.style('font-size', labelTextSize)
			.style('alignment-baseline', 'middle');

		TSSVG.append('text')
			.text('True shooting % when playing with and without Russell Westbrook, players who played')
			.attr('transform', 'translate(40, ' + (height + 100) + ')')
			.style('font-size', labelTextSize);

		TSSVG.append('text')
			.text('at least 200 minutes both with and without Westbrook qualify, source nbawowy.com')
			.attr('transform', 'translate(40, ' + (height + 120) + ')')
			.style('font-size', labelTextSize);
	}
	TSWithWithout();
}());
