//
//  ListController.swift
//  To Do
//
//  Created by Mark Tyers on 18/08/2016.
//  Copyright © 2016 John Doe. All rights reserved.
//

import UIKit
import ListMaker

class ListController: UITableViewController {
    
    var items:[String] = ["Bread", "Butter"]
    
    @IBAction func showDialog(_ sender: UIBarButtonItem) {
        print("showDialog")
        let alert = UIAlertController(title: "New Item", message: "Type item below", preferredStyle: .alert)
        
        alert.addTextField(configurationHandler: nil)
        
        alert.addAction(UIAlertAction(title: "Add", style: .default, handler: { (action) in
            if let textFields = alert.textFields {
                if let item = textFields[0].text {
                    print(item)
                    let lister = Lister.sharedInstance
                    lister.add(item: item)
                    print(lister.count)
                    DispatchQueue.main.async {
                        self.tableView.reloadData()
                    }
                }
            }
        }))
        
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        present(alert, animated: true, completion: nil)
    }
    
    @IBAction func editMode(_ sender: UIBarButtonItem) {
        self.isEditing = !self.isEditing
        print("editmode: \(self.isEditing)")
        if self.isEditing {
            sender.title = "Done"
        } else {
            sender.title = "Edit"
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("row \(indexPath.row) selected")
        if let cell:UITableViewCell = self.tableView?.cellForRow(at: indexPath) {
            print("we found the selected cell: \(cell)")
            if cell.accessoryType == .checkmark {
                cell.accessoryType = .none
            } else {
                cell.accessoryType = .checkmark
            }
        }
        tableView.deselectRow(at: indexPath, animated: true)
    }
    

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let lister = Lister.sharedInstance
        return lister.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "ShoppingItem", for: indexPath)
        if let label = cell.textLabel {
            do {
                let lister = Lister.sharedInstance
                try label.text = lister.getItem(atIndex: indexPath.row)
            } catch {
                print("index \(indexPath.row) out of range")
            }
        }
        return cell
    }
 
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            self.items.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .fade)
        }
    }
 

    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {
        do {
            let lister = Lister.sharedInstance
            let item:String = try lister.getItem(atIndex: fromIndexPath.row)
            try lister.remove(at: fromIndexPath.row)
            try lister.insert(newElement: item, at: to.row)
        } catch {
        
        }
        self.tableView.reloadData()
    }

    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
}
