class Model {

    static getData() {
        return {
            tree: this.tree,
            interface: this.interface,
            view: {
                nodeIndex: this.tree.getNodeIndex(this.interface.current),
                nodeMaxIndex: this.tree.getMaxNodeIndex(this.interface.current),
                nodeDepth: this.tree.getDepth(this.interface.current),
                nodeMaxDepth: this.tree.getTreeDepth(),
                numberOfChildren: this.tree.numberOfChildren(this.interface.current),
                actions: this.getActions(),
                summary: this.getSummary(),
            },
        }
    }

    static tree = new Tree()

    static interface = {
        current: null,
    }

    static nodeNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    
    static getNextName() {
        return this.nodeNames.find(
            name => !this.tree.getNodeByName(name)
        )
    }

    static canMoveLeft() {
        return !!this.interface.current && this.tree.getNodeIndex(this.interface.current) > 0
    }

    static canMoveRight() {
        return !!this.interface.current && this.tree.getNodeIndex(this.interface.current) < this.tree.numberOfSiblings(this.interface.current)-1
    }

    static canMoveUp() {
        return !(this.interface.current === this.tree.head)
    }

    static canMoveNthChild(n) {
        return this.interface.current && this.interface.current.children[n]
    }

    static canMoveFirstChild() {
        return this.interface.current && this.tree.getFirstChild(this.interface.current)
    }

    static canMoveLastChild() {
        return this.interface.current && this.tree.getLastChild(this.interface.current)
    }

    static canAddLeftChild() {
        return this.canAddChild(0)
    }

    static canAddRightChild() {
        return this.canAddChild(1)
    }

    static canAddChild(index) {
        return Boolean( this.interface.current && !this.interface.current.children[index] )
    }

    static getSummary() {
        class SummaryItem {
            constructor(id, name, value) {
                this.id = id
                this.name = name
                this.value = value
            }
        }

        return [
            new SummaryItem("numberOfNodes", "Number of Nodes", this.tree.numberOfNodes()),
            new SummaryItem("arity", "Arity", this.tree.arity),
            new SummaryItem("numberOfLeafNodes", "Number of Leaf Nodes", this.tree.numberOfLeafNodes() ),
            new SummaryItem("numberOfNonLeafNodes", "Number of Non-Leaf Nodes", this.tree.numberOfNonLeafNodes() ),
            new SummaryItem("treeDepth", "Tree Depth", this.tree.getTreeDepth() ),
        ]
    }

    static numberSuffix(number) {
        const suffixes = [
            'th',
            'st',
            'nd',
            'rd',
            'th',
            'th',
            'th',
            'th',
            'th',
            'th',
        ]
        return number + suffixes[ number % 10 ]
    }


    static getActions() {
        class Action {
            constructor(id, textContent, isEnabled, shortcut) {
                this.id = id
                this.textContent = textContent
                this.isEnabled = isEnabled
                this.shortcut = shortcut
            }
        }

        let add = [
            new Action("asHead", "Head to Tree", !!!this.tree.head, "Shift+H"),
        ]

        if (this.tree.arity===2) {
            add = add.concat(
                [
                    new Action("asLeft", `Left Child`, this.canAddLeftChild(), "Shift+L"),
                    new Action("asRight", `Right Child`, this.canAddRightChild(), "Shift+R"),
                ]
            )
        }
        else if (this.tree.arity === 1 || this.tree.arity > 2) {
            for (let i=0; i<this.tree.arity; i++) {
                add.push(
                    new Action(
                        `as${Model.numberSuffix(i)}`,
                        `As ${Model.numberSuffix(i+1)} Child`,
                        this.canAddChild(i),
                    )
                )
            }
        }
        else {
            throw new Error("Invalid arity")
        }

        return {
            add: add,
            edit: [
                new Action("removeNode", `Remove`, !!this.interface.current),
                new Action("renameNode", `Rename`, !!this.interface.current),
            ],
            move: [
                new Action("moveUp", `Parent`, this.canMoveUp() ),
                new Action("moveFirstChild", this.tree.arity===2 ? "Left Child" : "To First Child", this.canMoveFirstChild() ),
                new Action("moveLastChild", this.tree.arity===2 ? "Right Child" : "To Last Child", this.canMoveLastChild() ),
                new Action("moveLeft", `Left Sibling`, this.canMoveLeft() ),
                new Action("moveRight", `Right Sibling`, this.canMoveRight() ),
            ],
            saveLoad: [
                new Action("save", "Save Tree to File", true),
                new Action("loadDummy", "Load Tree from File...", true),
            ],
            export: [
                new Action("exportSvg", "Export Tree as SVG", true),
                new Action("exportPng", "Export Tree as PNG", true),
                new Action("exportHtml", "Export Tree as HTML", true),
            ]
        }
    }

    static changeArity(arity) {
        // before we start, cry
        this.tree.arity = arity
    }

    static move(d) {
        if (d === "up") {
            if ( this.canMoveUp() ) {
                this.interface.current = this.tree.getParent(this.interface.current)
            }
        }
        else if (d === "firstChild") {
            if ( this.canMoveFirstChild() ) {
                this.interface.current = this.tree.getFirstChild(this.interface.current)
            }
        }
        else if (d === "lastChild") {
            if ( this.canMoveLastChild() ) {
                this.interface.current = this.tree.getLastChild(this.interface.current)
            }
        }
        else if (d === "left") {
            if ( this.canMoveLeft() ) {
                this.interface.current = this.tree.getLeftSibling(this.interface.current)
            }
        }
        else if ( d === "right" ) {
            if ( this.canMoveRight() ) {
                this.interface.current = this.tree.getRightSibling(this.interface.current)
            }
        }
        else {
            throw new Error("Invalid move")
        }
    }
    
    static addNodeHead() {
        if ( !this.tree.head ) {
            this.interface.current = this.tree.addNode(null, this.getNextName(), 0) 
        }
    }
    
    static addNodeNthChild(n) {
        this.tree.addNode(this.interface.current, this.getNextName(), n)
    }
    
    static addNodeLeftChild() {
        if ( this.canAddLeftChild() ) {
            this.addNodeNthChild(0)
        }
    }

    static addNodeRightChild() {
        if ( this.canAddRightChild() ) {
            this.addNodeNthChild(1)
        }
    }

    static renameNode(name) {
        if (this.interface.current) {
            if (name !== "") {
                return this.tree.renameNode(this.interface.current, name)
            }
        }
    }

    static removeNode() {
        if (this.interface.current) {
            const oldCurrent = this.interface.current
            const parent = this.tree.getParent(oldCurrent)
            if (parent) {
                this.interface.current = parent
            }
            else if (!parent && this.tree.head === oldCurrent) {
                this.interface.current = null
            }
            else {
                throw new Error("Cannot remove node")
            }
            this.tree.removeNode(oldCurrent)
        }
    }

    static export() {
        return JSON.stringify( this.getData() )
    }

    static import(json) {
        function buildTree(jsonHead, jsonParent, treeParent) {
            if (!jsonParent && !treeParent) {
                // this is a new tree, add the head
                Model.tree.head = Model.tree.addNode(null, jsonHead.name, 0)
                // recurse
                buildTree(jsonHead, jsonHead, Model.tree.head)
            }
            else {
                const children = jsonParent.children.filter(
                    item => !!item
                )
                for ( let jsonChild of children ) {
                    const treeChild = Model.tree.addNode(
                        treeParent,
                        jsonChild.name,
                        jsonParent.children.indexOf(jsonChild)
                    )
                    buildTree(jsonHead, jsonChild, treeChild)
                }
            }
        }

        // check if there is a tree in this file
        if ( json.tree.head ) {
            // load interface settings
    
            // delete the current tree
            delete this.tree
            // rebuild the tree
            this.tree = new Tree()
            buildTree(json.tree.head, null, null)       
            
            // set the cursor
            this.interface.current = this.tree.getNodeByName(json.interface.current.name)
        }
        else {
            throw new Error("Invalid file")
        }
        
    }

}