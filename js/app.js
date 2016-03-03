// enclose code in IIFE to isolate scope and make sure we're passing correct jQ ref
(function($) {
	$(document).ready(function() {
		// only use single var per scope, define handler function for comboSource change
		var sourceChange = function(e) {
				// create event object
				var newEvent = $.Event('updateSource');
				// set value on event for 'key'
				newEvent.key = $(e.currentTarget).val();
				// fire event
				$(document).triggerHandler(newEvent);
			},
			// load json data based on key
			loadData = function(event) {
				// request json data
				$.ajax({
					dataType: 	'json',
					url:		'js/data.json.js'
				}).done(function(e) {
					// clear comboDest
					$('#comboDest').empty();
					// loop through filtered data
					$.each(e[event.key].data, function(index, item) {
						// append item to comboSource
						$('#comboDest').append($("<option></option>")
							.attr('value', item.value)
							.text(item.label));
					});
				}).fail(function(e) {
					console.log('error!');
					console.log(e);
				});
			},
			init = function() {
				// request stub data
				$.ajax({
					dataType: 	'json',
					url:		'js/data.json.js'
				}).done(function(e) {
					// clear comboSource
					$('#comboSource').empty();
					// loop through returned data
					$.each(e, function(index, item) {
						// append item to comboSource
						$('#comboSource').append($("<option></option>")
							.attr('value', index)
							.text(item.label));
					});
					// bind change event of comboSource
					$('#comboSource').on('change', sourceChange);
					// create listener for updateSource event
					$(document).on('updateSource', loadData);
					// and make sure to fire the change event to populate initial data
					$('#comboSource').trigger('change');
				}).fail(function(e) {
					console.log('error!');
					console.log(e);
				});
			};

		// call initialize function
		init();
	});
})(jQuery);