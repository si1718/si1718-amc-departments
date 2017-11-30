var fs = require('fs');

function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
}

describe('Data is loaded',function  (){
   it('Should show a list of more than five departments', function (){
       browser.get("http://localhost:8080");
       var departments = element.all(by.repeater('department in departments'));
       browser.driver.sleep(2000);
       
       browser.takeScreenshot().then(function (png) {
    			writeScreenShot(png, 'ng-test.png');
    	});
    	
       expect(departments.count()).toBeGreaterThan(5);
   });
});