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
        return !!this.current && this.tree.getNodeIndex(this.current) < this.tree.getMaxNodeIndex(this.current)
    }

    static canMoveUp() {
        return !!(this.current === this.head)
    }

    static canMoveDown() {
        if (this.current) {
            return !!this.tree.getFirstChild(this.current)
        }
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
                new Action("moveLeft", `move left of ${this.current?.name}`, this.canMoveLeft() ),
                new Action("moveRight", `move right of ${this.current?.name}`, this.canMoveRight() ),
                new Action("moveUp", `move to parent of ${this.current?.name}`, this.canMoveUp() ),
                new Action("moveDown", `move to first child of ${this.current?.name}`, this.canMoveDown() ),
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