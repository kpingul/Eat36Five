var React = require('react');
var VenueItem = require('./VenueItem.jsx');

var VenueList = React.createClass({
	render: function() {
		var venues = this.props.data.map(function( venue, index ) {
			return <VenueItem reactKey={index + 1} key={index + 1} venue={venue}/>
		});	

		return (
			<ul className="searchVenueList">
				{venues}
			</ul>
		);
	
	}
});


module.exports = VenueList;				

