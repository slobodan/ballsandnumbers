d3.csv('/assets/data/pop.csv', function (error, data) {
	var primaryColor = '#375e97';
	var secondaryColor = '#fb6542';

	var topSpacing = 220;
	var namesSpacing = 180;
	var rightSpacing = 0;
	var rowHeight = 24;
	var dotRadius = 4;

	var viz = d3.select('#viz');
	var svgWidth = jQuery('#viz').width();
	var svg = viz.append('svg').attr('width', svgWidth).attr('height', 600);
	var topGroup = svg.append('g').attr('class', 'top-level').attr('transform', 'translate(0, ' + topSpacing + ')');

	var seasonScale = d3.scaleBand();
	var namesScale = d3.scaleBand();

	var roleFilter = '';
	var seasonFilter = '';

	var uniquePeople = [];
	var uniqueSeasons = [];
	var formattedData = [];

	var COTY = ['2002-03', '2011-12', '2013-14'];
	var champion = ['1998-99', '2002-03', '2004-05', '2006-07', '2013-14'];
	var HC = ['Mike Budenholzer', 'Mike Brown', 'P.J. Carlesimo', 'Brett Brown', 'Jacque Vaughn', 'James Borrego'];
	var AllStars = [
		{ 'Name': 'David Robinson', 'Seasons': [ '1997-98', '1999-00', '2000-01' ] },
		{ 'Name': 'Tim Duncan', 'Seasons': [ '1997-98', '1999-00', '2000-01', '2001-02', '2002-03', '2003-04', '2004-05', '2005-06', '2006-07', '2007-08', '2008-09', '2009-10', '2010-11', '2012-13', '2014-15' ] },
		{ 'Name': 'Manu Ginobili', 'Seasons': [ '2004-05', '2010-11' ] },
		{ 'Name': 'Tony Parker', 'Seasons': [ '2005-06', '2006-07', '2008-09', '2011-12', '2012-13', '2013-14' ] },
		{ 'Name': 'Kawhi Leonard', 'Seasons': [ '2015-16', '2016-17' ] },
		{ 'Name': 'LaMarcus Aldridge', 'Seasons': [ '2015-16' ] }
	];

	data.map(function(row) {
		// Add unique people
		if (uniquePeople.indexOf(row.Name) === -1) {
			uniquePeople.push(row.Name);
			formattedData.push({
				"Name": row.Name,
				"Seasons": [{
					"Year": row.Season,
					"Role": row.Type
				}]
			})
		} else {
			formattedData[uniquePeople.indexOf(row.Name)].Seasons.push({
				"Year": row.Season,
				"Role": row.Type
			})
		}

		// Add unique seasons
		if (uniqueSeasons.indexOf(row.Season) === -1) {
			uniqueSeasons.push(row.Season);
		}

		return row.Name;
	});

	seasonScale
		.domain(uniqueSeasons)
		.range([namesSpacing, svgWidth - rightSpacing]);

	// Write season names
	var seasonLegend = topGroup.append('g')
		.attr('class', 'season-legend');

	var seasonLabels = seasonLegend.selectAll('g.season-label')
		.data(uniqueSeasons)
		.enter()
		.append('g')
		.attr('class', 'season')
		.attr('transform', function(d, i) {
			return 'translate(' + seasonScale(d) + ', -20)';
		});

	seasonLabels.append('text')
		.text(function(d) {
			return d;
		})
		.attr('data-season', function(d) {
			return d;
		})
		.attr('class', function(d) {
			var seasonClass = '';

			if (champion.indexOf(d) !== -1) {
				seasonClass += ' champion';
			}

			if (COTY.indexOf(d) !== -1) {
				seasonClass += ' coty';
			}

			return seasonClass;
		})
		.attr('transform', 'rotate(-60)')
		.style('alignment-baseline', 'middle')
		.style('text-anchor', 'start')
		.style('font-size', '12px')
		.style('cursor', 'pointer');

	seasonLabels.select('text.champion')
		.append('tspan')
		.text(' [C]')
		.attr('y', 2)
		.style('font-weight', 'bold');

	seasonLabels.select('text.coty')
		.append('tspan')
		.text(' [HC]')
		.attr('y', 2)
		.style('font-weight', 'bold');

	// Add legend
	var legend = topGroup.append('g')
		.attr('class', 'legend')
		.attr('transform', 'translate(' + namesSpacing + ', ' + (-topSpacing + 20) + ')');

	legend.append('text')
		.text('Role (click to toggle)')
		.style('font-size', '14px')
		.style('font-weight', 'bold')
		.style('alignment-baseline', 'middle');

	var playersLegend = legend.append('g')
		.attr('class', 'players')
		.attr('data-control', 'Player')
		.attr('transform', 'translate(0, 25)')
		.style('cursor', 'pointer');

	playersLegend.append('circle')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', dotRadius)
		.attr('fill', primaryColor);
	playersLegend.append('text')
		.text('Players')
		.attr('x', 10)
		.style('font-size', '14px')
		.style('alignment-baseline', 'middle');

	var coachesLegend = legend.append('g')
		.attr('class', 'coaches')
		.attr('data-control', 'Coach')
		.attr('transform', 'translate(80, 25)')
		.style('cursor', 'pointer');

	coachesLegend.append('circle')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', dotRadius)
		.attr('fill', secondaryColor);
	coachesLegend.append('text')
		.text('Coaches')
		.attr('x', 10)
		.style('font-size', '14px')
		.style('alignment-baseline', 'middle');

	var textLegend = legend.append('g')
		.attr('class', 'text-legend')

	textLegend.append('text')
		.attr('x', svgWidth - namesSpacing - 130)
		.text('[C]')
		.style('font-size', '14px')
		.style('font-weight', 'bold')
		.style('text-anchor', 'end')
		.style('alignment-baseline', 'middle');

	textLegend.append('text')
		.attr('x', svgWidth - namesSpacing - 120)
		.text('NBA Champion')
		.style('font-size', '14px')
		.style('alignment-baseline', 'middle');

	textLegend.append('text')
		.attr('x', svgWidth - namesSpacing - 130)
		.attr('y', 25)
		.text('[HC]')
		.style('font-size', '14px')
		.style('font-weight', 'bold')
		.style('text-anchor', 'end')
		.style('alignment-baseline', 'middle');

	textLegend.append('text')
		.attr('x', svgWidth - namesSpacing - 120)
		.attr('y', 25)
		.text('Coach of the Year')
		.style('font-size', '14px')
		.style('alignment-baseline', 'middle');

	textLegend.append('circle')
		.attr('cx', svgWidth - namesSpacing - 136)
		.attr('cy', 49)
		.attr('r', dotRadius)
		.style('fill', '#ffcc00');

	textLegend.append('text')
		.attr('x', svgWidth - namesSpacing - 120)
		.attr('y', 50)
		.text('All-star')
		.style('font-size', '14px')
		.style('alignment-baseline', 'middle');

	// Add graph rows
	function draw_data(drawData) {
		svg.attr('height', drawData.length * rowHeight + topSpacing);

		// Get unique names
		var uniqueNames = []
		for (i = 0; i < drawData.length; i++) {
			if (uniqueNames.indexOf(drawData[i].Name) === -1) {
				uniqueNames.push(drawData[i].Name);
			}
		}

		namesScale
			.domain(uniqueNames)
			.range([0, uniqueNames.length * rowHeight]);

		// Draw vertical lines
		/*
		topGroup.selectAll('line.coty').remove();
		topGroup.selectAll('line.coty')
			.data(COTY)
			.enter()
			.append('line')
			.attr('class', 'coty')
			.attr('x1', function(d) {
				return seasonScale(d);
			})
			.attr('y1', function() {
				return namesScale(uniqueNames[0])
			})
			.attr('x2', function(d) {
				return seasonScale(d);
			})
			.attr('y2', function() {
				return namesScale(uniqueNames[uniqueNames.length - 1]);
			})
			.attr('stroke', '#f9f9f9')
			.attr('stroke-width', '4px');
		*/

		// Clean up first, there is a better way to do this
		topGroup.selectAll('g.person-row').remove();

		var peopleRows = topGroup.selectAll('g.person-row')
			.data(drawData)
			.enter()
			.append('g')
			.attr('class', 'person-row')
			.attr('data-name', function (d) {
				return d.Name;
			})
			.attr('transform', function (d, i) {
				return 'translate(0, ' + namesScale(d.Name) + ')';
			});

		peopleRows.append('text')
			.text(function (d) {
				return d.Name;
			})
			.attr('transform', function (d, i) {
				return 'translate(' + (namesSpacing - 30) + ', 0)';
			})
			.style('alignment-baseline', 'middle')
			.style('text-anchor', 'end')
			.style('font-size', '14px');

		// Grid dots
		peopleRows.selectAll('circle.grid')
			.data(uniqueSeasons)
			.enter()
			.append('circle')
			.attr('class', 'grid')
			.attr('cx', function (d) {
				return seasonScale(d);
			})
			.attr('cy', function (d) {
				return 0;
			})
			.attr('r', 0.5)
			.attr('shape-rendering', 'optimizeQuality')
			.style('fill', '#999');

		// All-Star circles
		peopleRows.selectAll('circle.all-star').remove();
		peopleRows.selectAll('circle.all-star')
			.data(function(d) {
				for (i = 0; i < AllStars.length; i++) {
					if (d.Name === AllStars[i].Name) {
						return AllStars[i].Seasons
					}
				}

				return false;
			})
			.enter()
			.append('circle')
			.attr('class', 'all-star')
			.attr('cx', function (d) {
				return seasonScale(d);
			})
			.attr('cy', 0)
			.attr('r', dotRadius + 3)
			.style('fill', '#ffcc00');

		peopleRows.selectAll('circle.person')
			.data(function (d) {
				return d.Seasons;
			})
			.enter()
			.append('circle')
			.attr('class', 'person')
			.attr('data-player', function (d) {
				return d.Name;
			})
			.attr('data-type', function (d) {
				return d.Type;
			})
			.attr('data-season', function (d) {
				return d.Year;
			})
			.attr('cx', function (d) {
				return seasonScale(d.Year);
			})
			.attr('cy', function (d) {
				return namesScale(d.Name);
			})
			.attr('r', dotRadius)
			.attr('shape-rendering', 'optimizeQuality')
			.style('fill', function (d) {
				if ('Player' === d.Role) {
					return primaryColor;
				} else {
					return secondaryColor;
				}
			});
	}
	draw_data(formattedData);

	function filter_data(data) {
		var filteredData;

		if ('' !== roleFilter) { // Check role filter first
			filteredData = data.filter(function (row) {
				return row.Seasons.some(function (season) {
					return season.Role === roleFilter;
				});
			});

			return filteredData;
		} else if ('' !== seasonFilter) { // Check season filter
			filteredData = data.filter(function (row) {
				return row.Seasons.some(function (season) {
					return season.Year === seasonFilter;
				});
			});

			return filteredData;
		} else {
			return data;
		}
	}

	jQuery('body').on('click', 'g.legend g', function() {
		roleFilter = '';
		seasonFilter = '';

		// Reset season filter
		jQuery('g.season text').animate({'opacity': 1}, 50).removeClass('selected');

		if (jQuery(this).hasClass('selected')) {
			jQuery(this).removeClass('selected');
			jQuery('g.legend circle.person').css({'opacity': 1});
			draw_data(filter_data(formattedData));
		} else {
			jQuery('g.legend g').removeClass('selected');
			jQuery(this).addClass('selected');
			jQuery('g.legend circle.person').css({'opacity': 0.1});
			jQuery(this).find('circle').css({'opacity': 1});
			roleFilter = jQuery(this).data('control');
			draw_data(filter_data(formattedData));
		}
	})

	jQuery('body').on('click', 'g.season text', function() {
		roleFilter = '';
		seasonFilter = '';

		// Reset role filter
		jQuery('g.legend').removeClass('selected');
		jQuery('g.legend circle.person').css({'opacity': 1});

		if (jQuery(this).hasClass('selected')) {
			jQuery(this).removeClass('selected');
			jQuery('g.season text').animate({'opacity': 1}, 50);
			draw_data(filter_data(formattedData));
		} else {
			jQuery('g.season text').animate({'opacity': 0.1}, 50).removeClass('selected');
			jQuery(this).animate({'opacity': 1}, 50).addClass('selected');
			seasonFilter = jQuery(this).data('season');
			draw_data(filter_data(formattedData));
		}
	});
});

// For role filter, have selected have the dot before the word (for example 'bluedot' Players) when selected, otherwise no dot.