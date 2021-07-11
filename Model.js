class Model {

    static getData() {
        let d = {}
        d.tree = this.tree
        d.mode = this.mode
        d.current = this.current
        d.nodeIndex = this.tree.getNodeIndex(this.current)
        d.nodeMaxIndex = this.tree.getMaxNodeIndex(this.current)
        d.nodeDepth = this.tree.getDepth(this.current)
        d.nodeMaxDepth = this.tree.getTreeDepth()
        d.numberOfChildren = this.tree.numberOfChildren(this.current)
        d.actions = this.getActions()
        d.summary = this.getSummary()
        return d
    }

    static tree = new Tree()
    static mode = "tree"
    static current = null
    static nodeNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    static nextNameIndex = 0

    static canMoveLeft() {
        return !!this.current && this.tree.getNodeIndex(this.current) > 0
    }

    static canMoveRight() {
        return !!this.current && this.tree.getNodeIndex(this.current) < this.tree.numberOfSiblings(this.current)-1
    }

    static canMoveUp() {
        return !(this.current === this.tree.head)
    }

    static canMoveDown() {
        if (this.current) {
            return !!this.tree.getFirstChild(this.current)
        }
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
            new SummaryItem("numberOfNodes", "Number of nodes", this.tree.numberOfNodes()),
            new SummaryItem("arity", "Arity", this.tree.maximumChildren),
            new SummaryItem("numberOfLeafNodes", "Number of leaf nodes", this.tree.numberOfLeafNodes() ),
            new SummaryItem("numberOfNonLeafNodes", "Number of non-leaf nodes", this.tree.numberOfNonLeafNodes() ),
            new SummaryItem("treeDepth", "Tree depth", this.tree.getTreeDepth() ),
        ]
    }

    static getActions() {
        class Action {
            constructor(id, textContent, isEnabled) {
                this.id = id
                this.textContent = textContent
                this.isEnabled = isEnabled
            }
        }

        return {
            edit: [
                new Action("asHead", "add head of tree", !!!this.tree.head),
                new Action("asLeft", `add left child of ${this.current?.name}`, !!this.current),
                new Action("asRight", `add right child ${this.current?.name}`, !!this.current),
                new Action("removeNode", `remove ${this.current?.name}`, !!this.current),
                new Action("renameNode", `rename ${this.current?.name}`, !!this.current)
            ],
            move: [
                new Action("moveUp", `move to parent of ${this.current?.name}`, this.canMoveUp() ),
                new Action("moveDown", `move to first child of ${this.current?.name}`, this.canMoveDown() ),
                new Action("moveLeft", `move left of ${this.current?.name}`, this.canMoveLeft() ),
                new Action("moveRight", `move right of ${this.current?.name}`, this.canMoveRight() ),
            ]
        }
    }

    static move(d) {
        if (d === "up") {
            if ( this.canMoveUp() ) {
                this.current = this.tree.getParent(this.current)
            }
        }
        else if (d === "down") {
            if ( this.canMoveDown() ) {
                this.current = this.tree.getFirstChild(this.current)
            }
        }
        else if (d === "left") {
            if ( this.canMoveLeft() ) {
                this.current = this.tree.getLeftSibling(this.current)
            }
        }
        else if ( d === "right" ) {
            if ( this.canMoveRight() ) {
                this.current = this.tree.getRightSibling(this.current)
            }
        }
        else {
            throw new Error("Invalid move")
        }
    }
    
    static getNextName() {
        return this.nodeNames[this.nextNameIndex++]
    }
    
    static addNodeHead() {
        this.current = this.tree.addNode(null, this.getNextName(), 0) 
    }
    
    static addNodeNthChild(n) {
        this.tree.addNode(this.current, this.getNextName(), n)
    }
    
    static addNodeLeftChild() {
        this.addNodeNthChild(0)
    }

    static addNodeRightChild() {
        this.addNodeNthChild(1)
    }

}