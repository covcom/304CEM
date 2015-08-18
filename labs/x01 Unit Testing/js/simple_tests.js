var myModule = (function () {
	return {
		hello: function hello() {
			return 'hello world';
		}
	};
}());
	
test('Module Pattern', function() {
	equal(myModule.hello(), 'hello world', 'Module works!');
});