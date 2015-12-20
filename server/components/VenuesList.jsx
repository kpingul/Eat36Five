var React = require('react');
var VenueItem = require('./VenueItem.jsx');
/**
* @jsx React.DOM
*/

var VenueList = React.createClass({
	

	componentWillMount: function() {
		console.log(this.props.venues);
  	this.setState({ data: this.props.venues.response} );
	},

	render: function() {
		console.log('render');
	

		return (
			<ul className="searchVenueList">
			</ul>
		);
	
	}
});


module.exports = VenueList;				

