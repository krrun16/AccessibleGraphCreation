class Tree {
    constructor() {
        this.maximumChildren = 2
        this.mustHaveMaximumChildren = true
        this.head = null
        return this
    }

    static MAX_DEPTH = 100

    getParent(n) {
        if (this.head) {
            if (n === this.head) {
                return null
            }
            else {
                let maxDepth = 20
                let row = this.head.children
                let p = this.head
                for (let d=0; d<maxDepth; d++) {
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

    numberOfChildren(n) {
        if (n) {
            return n.children.length
        }
        else {
            return "N/A"
        }
    }

    getNodes() {

    }

    // get the horizontal position of this node
    getNodeIndex(n) {
        let p = this.getParent(n)
        if (p) {
            // get the index
            p.children.forEach(
                (n, i) => {
                    if ( this === n ) {
                        return i
                    }
                }
            )
        }
        else if ( n === this.head ) {
            // this is the head
            return 1
        }
        else {
            throw new Error("Could not get node index")
        }
    }

    // get the total number of nodes in this node's row
    getMaxNodeIndex(n) {
        // check if this is the head
        if (this.head === n) {
            return 1
        }
        else {
            // get the parent
            let p = this.getParent(n)
            if (p) {
                return p.children.length
            }
            // no parent
            else {
                throw new Error("Non-head node has no parent")
            }
        }
    }

    // get this node's depth in the tree. the head always has a depth of 0
    getDepth(n) {
        let max = 100
        let p = this.head
        // init the queue
        let currentLevel = [p]
        if (p) {
            // search each depth
            for (let d=0; d<Tree.MAX_DEPTH; d++) {
                let nextLevel = []
                // iterate through each node in this row and add its children to the next queue
                for (let i=0; i<max && currentLevel.length; i++) {
                    let c = currentLevel.pop()
                    if ( c===n ) {
                        return d
                    }
                    else {
                        nextLevel.concat(c.children)
                    }
                }
                // end of this row, set the next queue as the current one
                currentLevel = nextLevel
            }
            // did not find the node
            throw new Error("This node is not in the tree")
        }
        else {
            //throw new Error("Cannot get depth of node in a headless tree")
            return "N/A"
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

    getTreeDepth() {
        let d = 0
        if (this.head === null) {
            return 0
        }
        else {
            return this.getTreeDepthHelper(d, this.head)
        }
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