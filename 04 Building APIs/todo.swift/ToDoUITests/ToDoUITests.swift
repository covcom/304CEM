//
//  ToDoUITests.swift
//  ToDoUITests
//
//  Created by Mark Tyers on 21/09/2016.
//  Copyright © 2016 John Doe. All rights reserved.
//

import XCTest

class ToDoUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func xtestExample() {
        print("Tests Started")
        let app = XCUIApplication()
        app.navigationBars["To Do"].buttons["Add"].tap()
        print("+ button clicked")
        if app.alerts.element.collectionViews.buttons["Add"].exists {
            let addAlert = app.alerts
            let textField = addAlert.textFields.element
            textField.typeText("Cheese")
            app.alerts.element.collectionViews.buttons["Add"].tap()
            print("Add button clicked")
        }
        let tablesQuery = app.tables
        let count = tablesQuery.cells.count
        print("CELL COUNT: \(count)")
        print("tests finished")
    }
    
}
