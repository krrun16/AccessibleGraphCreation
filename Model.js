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
        return this.current && !!this.tree.getFirstChild(this.current)
    }

    static canAddLeftChild() {
        return this.canAddChild(0)
    }

    static canAddRightChild() {
        return this.canAddChild(1)
    }

    static canAddChild(index) {
        return Boolean( this.current && !this.current.children[index] )
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
            new SummaryItem("arity", "Arity", this.tree.maximumChildren),
            new SummaryItem("numberOfLeafNodes", "Number of Leaf Nodes", this.tree.numberOfLeafNodes() ),
            new SummaryItem("numberOfNonLeafNodes", "Number of Non-Leaf Nodes", this.tree.numberOfNonLeafNodes() ),
            new SummaryItem("treeDepth", "Tree Depth", this.tree.getTreeDepth() ),
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
                new Action("asHead", "Add Head of Tree", !!!this.tree.head),
                new Action("asLeft", `Add Left Child of ${this.current?.name}`, this.canAddLeftChild()),
                new Action("asRight", `Add Right Child ${this.current?.name}`, this.canAddRightChild()),
                new Action("removeNode", `Remove ${this.current?.name}`, !!this.current),
                new Action("renameNode", `Rename ${this.current?.name}`, !!this.current)
            ],
            move: [
                new Action("moveUp", `Move to Parent of ${this.current?.name}`, this.canMoveUp() ),
                new Action("moveDown", `Move to First Child of ${this.current?.name}`, this.canMoveDown() ),
                new Action("moveLeft", `Move Left of ${this.current?.name}`, this.canMoveLeft() ),
                new Action("moveRight", `Move Right of ${this.current?.name}`, this.canMoveRight() ),
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