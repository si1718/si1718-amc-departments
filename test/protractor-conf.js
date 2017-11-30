exports.config = {
    seleniumAddress: 'http://localhost:9515',
    specs: ['T01-LoadData.js','T02-AddDepartment.js','T03-RemoveDepartment.js'],
    capabilities: {
        'browserName' : 'phantomjs'
    }
}