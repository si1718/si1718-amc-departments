describe('Add department', function () {
	it('should add a new department', function (){
		browser.get('http://localhost:8080');

		element.all(by.repeater('department in departments')).then(function (initialDepartments){
		    element(by.css('[ng-click="newDepartment()"]')).click().then(function (){
				browser.driver.sleep(2000);
	
				element(by.model('newDepartment.department')).sendKeys("Departamento Prueba Creación");
				element(by.model('newDepartment.address.school')).sendKeys('Calle Falsa 123, YupiWorld');
				element(by.model('newDepartment.address.tlf')).sendKeys('695856275');
				element(by.model('newDepartment.address.fax')).sendKeys('');
				element(by.model('newDepartment.address.web')).sendKeys('www.petete.com');
				
				element(by.buttonText('Save')).click().then(function (){

					element.all(by.repeater('department in departments')).then(function (departments){
						expect(departments.length).toEqual(initialDepartments.length+1);
					});
				
				});
		    });
		});
	});
});