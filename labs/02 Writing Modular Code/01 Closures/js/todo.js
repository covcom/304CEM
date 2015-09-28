
var todo = (function () {
    var items = Array()

    return {
        addItem: function (item) {
            items.push(item)
        },
        getItems: function () {
            return items
        }
    }
})()
