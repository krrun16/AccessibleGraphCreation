class Tree {
    constructor() {
        this.maximumChildren = 2
        this.mustHaveMaximumChildren = true
        this.head = null
        return this
    }

    static MAX_DEPTH = 100

    getParent(n) {
        // depth-first search
        return this.getParentHelper(this.head, n, null)
    }
    
    getParentHelper(examining, target, parent) {
        // base case: this node is undefined
        if (!examining) {
            return null
        }
        // base case: this is the node we are searching for
        if (examining === target) {
            return parent
        }
        // recursive case: examining each child
        for (let c of examining.children) {
            let p = this.getParentHelper(c, target, examining)
            if (p) {
                return p
            }
        }
    }

    // get non-undefined children of node n
    getChildren(n) {
        if (n) {
            return n.children.filter(
                child => Boolean( child )
            )
        }
        else {
            return "N/A"
        }
    }

    numberOfChildren(n) {
        if (n && n.children.length) {
            return this.getChildren(n).length
        }
        else {
            return 0
        }
    }

    getSibling(n, direction) {
        // get parent
        let p = this.getParent(n)
        if (p) {
            let s = this.siblings(n)
            let i = s.indexOf(n)
            if ( i+direction < s.length && i+direction >= 0 ) {
                return s[i+direction]
            }
            else {
                throw new Error("Tried to get sibling out of bounds")
            }
        }
        else {
            throw new Error("Node has no siblings")
        }
    }

    siblings(n) {
        let p = this.getParent(n)
        if (p && p.children.length) {
            return p.children.filter(
                child => child
            )
        }
        else {
            return []
        }
    }

    numberOfSiblings(n) {
        return this.siblings(n).length
    }

    getLeftSibling(n) {
        return this.getSibling(n, -1)
    }

    getRightSibling(n) {
        return this.getSibling(n, 1)
    }

    getFirstChild(n) {
        if (n) {
            for (let c of n.children) {
                if (c) {
                    return c
                }
            }
        }
        else {
            throw new Error("Node has no children")
        }
    }

    // get the horizontal position of this node
    getNodeIndex(n) {
        if ( n === this.head ) {
            // this is the head
            return 0
        }
        else {
            let s = this.siblings(n)
            if (s.length) {
                return s.indexOf(n)
            }
            else {
                throw new Error("Could not get node index")
            }
        }
    }

    // get the total number of non-undefined nodes in this node's row
    getMaxNodeIndex(n) {
        // check if this is the head
        if (this.head === n) {
            return 1
        }
        else {
            // get the parent
            return this.numberOfSiblings(n)
        }
    }

    // get this node's depth in the tree. the head always has a depth of 0
    getDepth(n) {
        return this.getDepthHelper(this.head, n)
    }

    getDepthHelper(examining, target) {
        // base case: this is the node we are searching for
        if (examining === target) {
            return 0
        }
        else {
            // recursive case: this node is not our target, so examine each child to see if it is our target node
            let children = this.getChildren(examining)
            for (let c of children) {
                let depth = this.getDepthHelper(c, target)
                if (depth !== -1) {
                    return 1+depth
                }
            }
            // did not find the child among these siblings, so return -1
            return -1
        }
    }
    
    getTreeDepth() {
        let d = 0
        if (!this.head) {
            return d
        }
        else {
            return this.getTreeDepthHelper(d, this.head)
        }
    }
    
    getTreeDepthHelper(d, n) {
        let children = this.getChildren(n)
        
        if ( children.length ) {
            // recursive case: this node has children, so get the depth recursively for each
            let childDepths = []
            for (let c of children) {
                childDepths.push( this.getTreeDepthHelper(d, c)+1 )
            }
            console.log(n.name, childDepths)
            return Math.max(...childDepths)
        }

        else {
            // base case: this node has no children, so return a depth of 0
            return 0
        }
    }

    addNode(parent, name, position) {
        // check if there is already a node at this position
        if ( parent && parent.children[position] ) {
            throw new Error("Cannot add new node in a non-empty position")
        }
        else {
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

}