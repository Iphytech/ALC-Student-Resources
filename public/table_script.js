jQuery(function($) {

	$.get('/api/studentsResources', function(response) {

		var data = [].concat(response);
		
		var columns = [
			['name', 8],
			['state', 6],
			['age', 2],
			['phoneNumber', 6],
			['regNo', 6],
			['faculty', 6],
			['dept', 6],
			['level', 2]
		];

		var entryPoint = $('.app-main__student-list-table >tbody').first();
		var formContainer = $('.app-main__form-container').first();
		var formTitle = formContainer.find('h3.app-main__student-form-title').first();
		var formButton = formContainer.find('button.app-main__form-button').first();
		var formElements = formContainer.find('.app-main__form-control input[type=text]');
		
		$('.app-main__new-student-button-container button.app-main__form-button').first().on('click', function(evt) {
			formContainer.show(500);

			formButton.on('click', function createNewStudent(evt) {

				$.ajax({
					method: 'POST',
					url: '/api/studentsResources',
					data: getElementsData(),
					success: function(data) {
						formContainer.hide(250, function() {
							cleanInputElems();
							buildTableRow(null, data);
							formButton.off('click', createNewStudent);
						});
					},
					error: function(err) {
						alert('Could not add new student. Try again.');
					}
				});

			});

		});

		$.each(data, buildTableRow);

		function cleanInputElems() {
			formElements.each(function(i, elem) {
				$(elem).val('');
			});
		}

		function getElementsData() {
			var $data = {};
			
			formElements.each(function(i, elem) {
				var element = $(elem);
				$data[element.attr('name')] = element.val();
			});

			return $data;
		}

		function buildTableRow(index, item) {
			var row = $('<tr></tr>').addClass('app-main-table--row50');
			var lastCol = $('<td></td>').addClass('app-main-table--col10');

			$.each(columns, function(i, column) {
				var value = item[column[0]];
				value = (value === undefined || value === null) ? '' : String(value);

				$('<td></td>').addClass('app-main-table--col' + column[1]).text(value).appendTo(row);
			});

			$('<button type="button" class="app-main__form-button edit-btn"></button>').attr('data-student-id', item._id).text('Edit').on('click', function(evt) {
				var $title = formTitle.text();
				var $buttonText = formButton.text();
				var $isDirty = [];
				var $$editBtn = $(this);

				formTitle.text('Edit Student Data') && formButton.text('Back to List') && formContainer.show(500);

				formButton.on('click', function editButtonClickHandler(evt) {

					if ($isDirty.length > 0) {
						$.ajax({
							method: 'POST',
							url: '/api/studentsResources/' + $$editBtn.attr('data-student-id'),
							data: getElementsData(),
							headers: {
								'X-HTTP-Method-Override': 'PUT'
							},
							success: function(data) {
								hideFormContainer();
							},
							error: function() {
								alert('Could not edit student data. Try again.');
							}
						});
					} else {
						hideFormContainer();
					}

					function hideFormContainer() {
						formContainer.hide(250, function() {
							formElements.each(function(i, elem) {
								$(elem).off('keyup', watchInputValue).val('');
							});
							formTitle.text($title) && formButton.text($buttonText);
							formButton.off('click', editButtonClickHandler);
						});
					}
					
				});

				formElements.each(function(i, elem) {
					var $elem = $(elem);
					var $name = $elem.attr('name');
					var $currentValue = item[ $name ];
					
					$elem.val($currentValue).on('keyup', watchInputValue);
				});
				
				function watchInputValue(evt) {
					var $elem = $(this);
					var $name = $elem.attr('name');
					var $currentValue = item[ $name ];
					var $index = $isDirty.indexOf($name);

					if ($elem.val() != $currentValue) {
						$index === -1 && $isDirty.push($name);
					} else {
						$index !== -1 && $isDirty.splice($index, 1);
					}
					
					$isDirty = [].concat($isDirty);

					formButton.text($isDirty.length > 0 ? 'Save Changes' : 'Back to List');
				}

			}).appendTo(lastCol);

			$('<button type="button" class="app-main__form-button delete-btn"></button>').attr('data-student-id', item._id).text('Delete').on('click', function(evt) {
				var $$deleteBtn = $(this);

				$.ajax({
					method: 'POST',
					url: '/api/studentsResources/' + $$deleteBtn.attr('data-student-id'),
					headers: {
						'X-HTTP-Method-Override': 'DELETE'
					},
					success: function(data) {
						$$deleteBtn.parentsUntil('tbody', 'tr').first().remove();
					},
					error: function() {
						alert('Could not delete student. Try again.');
					}
				});
			}).appendTo(lastCol);

			lastCol.appendTo(row);

			entryPoint.append(row);
		}

	});

});
