describe('Application Tests', function() {
	var mockJquery;
	
	beforeEach(function() {
		mockJquery = {
			geocomplete: function(options) {
				return options;
			}
		}
	});
	
	it('should call geocomplete function', function() {
		spyOn(mockJquery, 'geocomplete').and.callThrough();
		mockJquery.geocomplete({});
		expect(mockJquery.geocomplete({})).toEqual({});
	});




});