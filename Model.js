class Model {

    static getData() {
        let d = {}
        d.tree = this.tree
        d.mode = this.mode
        d.current = this.current
        return d
    }

    static tree = new Tree()
    static mode = "tree"
    static current = null
    //static nodeNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZあえいおう".split("")
    static nodeNames = "あえいおう".split("")
    static nextNameIndex = 0
    
    static getNextName() {
        return this.nodeNames[this.nextNameIndex++]
    }
    
    static addNodeHead() {
        this.current = this.tree.addNode(null, "A", 0) 
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