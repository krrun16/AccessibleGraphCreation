class Tree {
    constructor() {
        this.maximumChildren = 2
        this.mustHaveMaximumChildren = true
        this.head = null
        return this
    }

    getParent(n) {
        if (this.head) {
            if (n === this.head) {
                return null
            }
            else {
                let maxDepth = 20
                let row = head.children
                let p = head
                for (let d=0; i<maxDepth; d++) {
                    // search for n in this row
                    for (let c of row) {
                        if (c === n) {
                            return p
                        }
                        else {
                            // build the next row
                            row.push(c.children)
                        }
                    }
                }
            }
        }
        else {
            return null
        }
    }

    getNodes() {

    }

    // get the horizontal position of this node
    getNodeIndex() {

    }

    // get the total number of nodes in this node's row
    getMaxNodeIndex() {

    }

    getTreeDepth() {
        let d = 0
        if (this.head === null) {
            return 0
        }
        else {
            return getTreeDepthHelper(d, this.head)
        }
    }

    getTreeDepthHelper(d, n) {
        let childDepths = []
        for (let c of n.children) {
            if ( c !== undefined ) {
                childDepths.push( getTreeDepthHelper(d+1, c) )
            }
        }
        return Math.max(childDepths)
    }

    addNode(parent, name, position) {
        let n
        if (this.head === null) {
            n = new TreeNode(name)
            this.head = n
        }
        else {
            n = new TreeNode(name)
            parent.children[position] = n
        }
        return n
    }

}