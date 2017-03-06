d3.json('/assets/data/jersey-numbers.json', function (error, data) {
	var viz = d3.select('#viz');
	var svgWidth = jQuery('#viz').width();
	var svg = viz.append('svg').attr('width', svgWidth).attr('height', svgWidth * 1.8);
	var opacityExtent = [0.1, 1];
	var opacityScale = d3.scaleLinear().range(opacityExtent);
	var mainColor = '#0B486B';
	var highlightColor = '#5B1023';
	var leftSpace = 30;
	var topSpace = 120;
	var bottomSpace = 0;
	var rectWidth = (svgWidth - leftSpace) / data.length;
	var rectHeight = rectWidth * 1.2;
	var legendWidth = 250;
	var legendHeight = 12;
	var currentUnit = 'totals';

	var tooltip = d3.select('body')
		.append('div')
		.attr('id', 'rect-tooltip')
		.style('position', 'absolute')
		.style('z-index', '10')
		.style('visibility', 'hidden')
		.style('background', '#fff')
		.style('font-size', '10px')
		.style('padding', '5px')
		.style('border', '1px solid #000')
		.style('border-radius', '5px')
		.style('opacity', 0.9)

	// Get unique jersey numbers and player count for each season
	var uniqueNumbers = [];
	var seasonPlayers;
	for (i = 0; i < data.length; i++) {
		var seasonPlayers = 0;
		for (j = 0; j < data[i].Numbers.length; j++) {
			if (data[i].Numbers[j].Number !== 'UNK') {
				seasonPlayers += data[i].Numbers[j].Players.length;

				if (uniqueNumbers.indexOf(data[i].Numbers[j].Number) === -1) {
					uniqueNumbers.push(data[i].Numbers[j].Number);
				}
			}
		}
		data[i].PlayerCount = seasonPlayers;
	}

	// Sort jersey numbers naturally
	function naturalCompare(a, b) {
		var ax = [], bx = [];

		a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || '']) });
		b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || '']) });

		while(ax.length && bx.length) {
			var an = ax.shift();
			var bn = bx.shift();
			var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
			if(nn) return nn;
		}

		return ax.length - bx.length;
	}
	uniqueNumbers.sort(naturalCompare)

	// Fix svg element height
	svg.attr('height', rectHeight * uniqueNumbers.length + topSpace + bottomSpace)


	// Manipulate our data to add number popularity
	var PopularityValues = [];
	var PopularityItem;
	for (i = 0; i < data.length; i++) {
		for (j = 0; j < data[i].Numbers.length; j++) {
			data[i].Numbers[j].Popularity = data[i].Numbers[j].Players.length / data[i].PlayerCount;
			PopularityItem = {};
			PopularityItem.Popularity = data[i].Numbers[j].Players.length / data[i].PlayerCount;
			PopularityItem.Season = data[i].Season;
			PopularityItem.Number = data[i].Numbers[j].Number;
			PopularityItem.PlayerCount = data[i].Numbers[j].Players.length
			PopularityValues.push(PopularityItem);
		}
	}

	var totalExtent = d3.extent(PopularityValues, function(d) {
		return +d.PlayerCount;
	})
	var percentageExtent = d3.extent(PopularityValues, function(d) {
		return +d.Popularity;
	})
	opacityScale.domain(totalExtent)

	// Insert jersey numbers
	var numbers = svg.append('g')
		.attr('class', 'numbers')
		.selectAll('text')
		.data(uniqueNumbers)
		.enter()
		.append('text')
		.text(function(d) { return d; })
		.attr('x', leftSpace - 10)
		.attr('y', function(d, i) { return i * rectHeight + (rectHeight) / 2 + topSpace; })
		.style('font-size', '10px')
		.style('text-anchor', 'end')
		.style('alignment-baseline', 'middle')

	// Insert seasons <g> elements
	var seasons = svg.selectAll('g.season')
		.data(data)
		.enter()
		.append('g')
		.attr('data-count', function(d) {
			// console.table(d.Numbers);
			var tempArray = []
			for (i = 0; i < d.Numbers.length; i++) {
				tempArray.push({ "Number": d.Numbers[i].Number, "Count": d.Numbers[i].Players.length });
			}
			tempArray.sort(function(a, b) {
				if (a.Count < b.Count) {
					return 1;
				}
				if (a.Count > b.Count) {
					return -1;
				}
				return 0;
			});
			for (var i = 0; i < tempArray.length; i++) {
				if (tempArray[i].Number === '23') {
					console.log(d.Season, i);
				}
			}

			return d.PlayerCount; 
		})
		.attr('data-season', function(d) { 
			return d.Season; 
		})
		.attr('class', 'season')
		.attr('transform', function (d, i) {
			return 'translate(' + (rectWidth * i + leftSpace) + ', 0)';
		})

	// Insert jersey number rectangles
	var jerseys = seasons.selectAll('rect')
		.data(function(d) {
			return d.Numbers;
		})
		.enter()
		.filter(function(d) {
			return d.Number !== 'UNK';
		})
		.append('rect')
		.attr('class', 'jersey-number')
		.attr('transform', function (d, i) {
			return 'translate(0, ' + (rectHeight * uniqueNumbers.indexOf(d.Number) + topSpace) + ')';
		})
		.attr('width', rectWidth - 1)
		.attr('height', rectHeight - 1)
		.attr('data-number', function(d) { return d.Number; })
		.attr('data-count', function(d) { return d.Players.length; })
		.attr('data-players', function(d) {
			return JSON.stringify(d.Players); 
		})
		.style('fill', mainColor)
		.style('opacity', function(d) {
			return opacityScale(d.Players.length); 
		})
        .on('mouseover', function() {
        	d3.select(this)
        		.style('cursor', 'pointer');
        })
   		.on('mouseenter', function() {
   			var currentRect = d3.select(this)

   			currentRect
				.style('fill', highlightColor);
			
			var season = d3.select(this.parentNode).attr('data-season');
			var players = JSON.parse(currentRect.attr('data-players'));
			var number = currentRect.attr('data-number');
			var playersWord = players.length > 1 ? 'players' : 'player'

			var introString = '<strong>' + players.length + ' ' + playersWord + ' wore #' + number + ' in ' + season + '</strong>';
			var playersString = '';
				for (i = 0; i < players.length; i++) {
				playersString += '<br />' + players[i].Name + ' [' + players[i].Team + ']';
			}

        	tooltip.html(introString + playersString);
			tooltip.style('visibility', 'visible')
        })
   		.on('mouseleave', function() {
   			var currentrect = d3.select(this)
   			currentrect
   				.style('fill', mainColor);

   			tooltip.style('visibility', 'hidden');
		})
		.on('mousemove', function() {
			var svgEl = jQuery('#viz svg');
			var tooltipEl = jQuery('#rect-tooltip');

			var xPos;
			var yPos;

			if (event.pageX + tooltipEl.width() > svgEl.position().left + svgEl.width()) {
				xPos = event.pageX - 20 - tooltipEl.width();
			} else {
				xPos = event.pageX + 12
			}

			yPos = event.pageY;

			return tooltip
				.style('top', yPos + 'px')
				.style('left', xPos + 'px');
		});

	// Add gradient legend
	var legend = svg.append('g')
		.attr('class', 'legend')
		.attr('transform', 'translate(' + (leftSpace + rectWidth * data.length - legendWidth) + ', 20)');

	legend.append('text')
		.text('Total number of players')
		.attr('x', legendWidth)
		.attr('class', 'legend-label')
		.style('font-size', '12px')
		.style('text-anchor', 'end')
		.style('alignment-baseline', 'top');	

	// Draw the Rectangle
	var linearGradient = legend.append('linearGradient')
		.attr('id', 'linear-gradient')
		.attr('x1', '0%')
		.attr('y1', '0%')
		.attr('x2', '100%')
		.attr('y2', '0%')

	linearGradient.append('stop')
		.attr('offset', '0%')
		.attr('stop-color', mainColor)
		.attr('stop-opacity', opacityExtent[0])

	linearGradient.append('stop') 
    	.attr('offset', '100%')   
    	.attr('stop-color', mainColor)
		.attr('stop-opacity', opacityExtent[1])

	legend.append('rect')
		.attr('width', legendWidth)
		.attr('height', legendHeight)
		.attr('y', 5)
		.style('fill', 'url(#linear-gradient)');

	legend.append('text')
		.text(totalExtent[0])
		.attr('x', 0)
		.attr('y', 28)
		.attr('class', 'legend-extent-min')
		.style('font-size', '10px')
		.style('text-anchor', 'start')
		.style('alignment-baseline', 'top')

	legend.append('text')
		.text(totalExtent[1])
		.attr('x', legendWidth)
		.attr('y', 28)
		.attr('class', 'legend-extent-max')
		.style('font-size', '10px')
		.style('text-anchor', 'end')
		.style('alignment-baseline', 'top')

	// Add the metric switcher
	var switcher = svg.append('g')
		.attr('class', 'switcher')
		.attr('transform', 'translate(' + leftSpace + ', 20)');

	switcher.append('text')
		.attr('class', 'switcher-totals switcher-toggle switcher-selected')
		.attr('y', 5)
		.attr('data-unit', 'totals')
		.text('Totals')
		.style('font-size', '12px')
		.style('alignment-baseline', 'top')
		.style('cursor', 'pointer')
		.style('font-weight', 'bold');

	switcher.append('text')
		.attr('class', 'switcher-totals switcher-toggle')
		.attr('y', 25)
		.attr('data-unit', 'percentage')
		.text('Percentage')
		.style('font-size', '12px')
		.style('alignment-baseline', 'top')
		.style('cursor', 'pointer')
		.style('opacity', 0.6);

	jQuery('#viz')
		.on('click', '.switcher-toggle', function() {
			jQuery('.switcher-toggle')
				.removeClass('switcher-selected')
				.css('opacity', 0.6)
				.css('font-weight', 'normal');
			jQuery(this)
				.addClass('switcher-selected')
				.css('opacity', 1)
				.css('font-weight', 'bold');

			if (jQuery(this).data('unit') !== currentUnit) {
				if ('totals' === jQuery(this).data('unit')) {
					currentUnit = 'totals';
					opacityScale.domain(totalExtent)

					jerseys
						.transition()
						.duration(200)
						.ease(d3.easeLinear)
						.style('opacity', function(d) {
							return opacityScale(d.Players.length); 
						});

					jQuery('.legend-label')
						.text('Total number of players')

					jQuery('.legend-extent-min')
						.text(totalExtent[0])

					jQuery('.legend-extent-max')
						.text(totalExtent[1])
				} else if ('percentage' === jQuery(this).data('unit')) {
					currentUnit = 'percentage'
					opacityScale.domain(percentageExtent)

					jerseys
						.transition()
						.duration(200)
						.ease(d3.easeLinear)
						.style('opacity', function(d) {
							return opacityScale(d.Popularity); 
						});

					jQuery('.legend-label')
						.text('Percentage of all of players that season')

					jQuery('.legend-extent-min')
						.text(Math.floor(percentageExtent[0] * 100) + '%')

					jQuery('.legend-extent-max')
						.text(Math.ceil(percentageExtent[1] * 100) + '%')
				}
			}
		})

	// Insert year markers
	var yearMarkers = svg.append('g').attr('class', 'year-markers')

	yearMarkers.append('text')
		.text('1946-47')
		.attr('x', leftSpace)
		.attr('y', topSpace - 20)
		.style('text-anchor', 'start')
		.style('font-size', '10px')
	yearMarkers.append('line')
		.attr('x1', leftSpace + rectWidth / 2)
		.attr('y1', topSpace - 15)
		.attr('x2', leftSpace + rectWidth / 2)
		.attr('y2', topSpace - 10)
		.attr('stroke', 'black')

	yearMarkers.append('text')
		.text('1959-60')
		.attr('x', leftSpace + rectWidth * 11 + rectWidth / 2)
		.attr('y', topSpace - 20)
		.style('text-anchor', 'middle')
		.style('font-size', '10px')
	yearMarkers.append('line')
		.attr('x1', leftSpace + rectWidth * 11 + rectWidth / 2)
		.attr('y1', topSpace - 15)
		.attr('x2', leftSpace + rectWidth * 11 + rectWidth / 2)
		.attr('y2', topSpace - 10)
		.attr('stroke', 'black')

	yearMarkers.append('text')
		.text('1969-70')
		.attr('x', leftSpace + rectWidth * 21 + rectWidth / 2)
		.attr('y', topSpace - 20)
		.style('text-anchor', 'middle')
		.style('font-size', '10px')
	yearMarkers.append('line')
		.attr('x1', leftSpace + rectWidth * 21 + rectWidth / 2)
		.attr('y1', topSpace - 15)
		.attr('x2', leftSpace + rectWidth * 21 + rectWidth / 2)
		.attr('y2', topSpace - 10)
		.attr('stroke', 'black')

	yearMarkers.append('text')
		.text('1979-80')
		.attr('x', leftSpace + rectWidth * 31 + rectWidth / 2)
		.attr('y', topSpace - 20)
		.style('text-anchor', 'middle')
		.style('font-size', '10px')
	yearMarkers.append('line')
		.attr('x1', leftSpace + rectWidth * 31 + rectWidth / 2)
		.attr('y1', topSpace - 15)
		.attr('x2', leftSpace + rectWidth * 31 + rectWidth / 2)
		.attr('y2', topSpace - 10)
		.attr('stroke', 'black')

	yearMarkers.append('text')
		.text('1989-90')
		.attr('x', leftSpace + rectWidth * 41 + rectWidth / 2)
		.attr('y', topSpace - 20)
		.style('text-anchor', 'middle')
		.style('font-size', '10px')
	yearMarkers.append('line')
		.attr('x1', leftSpace + rectWidth * 41 + rectWidth / 2)
		.attr('y1', topSpace - 15)
		.attr('x2', leftSpace + rectWidth * 41 + rectWidth / 2)
		.attr('y2', topSpace - 10)
		.attr('stroke', 'black')

	yearMarkers.append('text')
		.text('1999-00')
		.attr('x', leftSpace + rectWidth * 51 + rectWidth / 2)
		.attr('y', topSpace - 20)
		.style('text-anchor', 'middle')
		.style('font-size', '10px')
	yearMarkers.append('line')
		.attr('x1', leftSpace + rectWidth * 51 + rectWidth / 2)
		.attr('y1', topSpace - 15)
		.attr('x2', leftSpace + rectWidth * 51 + rectWidth / 2)
		.attr('y2', topSpace - 10)
		.attr('stroke', 'black')

	yearMarkers.append('text')
		.text('2009-10')
		.attr('x', leftSpace + rectWidth * 61 + rectWidth / 2)
		.attr('y', topSpace - 20)
		.style('text-anchor', 'middle')
		.style('font-size', '10px')
	yearMarkers.append('line')
		.attr('x1', leftSpace + rectWidth * 61 + rectWidth / 2)
		.attr('y1', topSpace - 15)
		.attr('x2', leftSpace + rectWidth * 61 + rectWidth / 2)
		.attr('y2', topSpace - 10)
		.attr('stroke', 'black')

	yearMarkers.append('text')
		.text('2016-17')
		.attr('x', rectWidth * data.length + leftSpace)
		.attr('y', topSpace - 20)
		.style('text-anchor', 'end')
		.style('font-size', '10px')
	yearMarkers.append('line')
		.attr('x1', rectWidth * data.length - rectWidth / 2 + leftSpace)
		.attr('y1', topSpace - 15)
		.attr('x2', rectWidth * data.length - rectWidth / 2 + leftSpace)
		.attr('y2', topSpace - 10)
		.attr('stroke', 'black')

});