//
//  ListManagerTests.swift
//  To Do
//
//  Created by Mark Tyers on 22/09/2016.
//  Copyright © 2016 John Doe. All rights reserved.
//

import XCTest

class ListManagerTests: XCTestCase {
    
    var listManager = ListManager()
    
    override func setUp() {
        super.setUp()
        listManager.clearList()
    }
    
    override func tearDown() {
        
        super.tearDown()
    }
    
    func testAddOneItem() {
        do {
            XCTAssert(listManager.count == 0)
            try listManager.add(item: "Bread")
            XCTAssert(listManager.count == 1)
        } catch {
            XCTFail()
        }
    }
    
    func testAddMultipleItems() {
        do {
            XCTAssert(listManager.count == 0)
            try listManager.add(item: "Bread")
            try listManager.add(item: "Butter")
            try listManager.add(item: "Cheese")
            XCTAssert(listManager.count == 3)
        } catch {
            XCTFail()
        }
    }
    
    func testAddDuplicateItem() {
        do {
            XCTAssert(listManager.count == 0)
            try listManager.add(item: "Bread")
            try listManager.add(item: "Butter")
            try listManager.add(item: "Cheese")
            try listManager.add(item: "Butter")
            XCTFail()
        } catch {
            XCTAssert(listManager.count == 3)
        }
    }
    
    func testGetItemAtPosition() {
        
    }
    
    func testInsertItemAtPosition() {
        
    }
    
    
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
    
}
