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
            return "N/A"
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
        return this.getDepthHelper(this.head, n)
    }

    getDepthHelper(examining, target) {
    // base case: this node is undefined
        if (!examining) {
            return null
        }
        // base case: this is the node we are searching for
        if (examining === target) {
            return 1
        }
        // recursive case: examining each child
        for (let c of examining.children) {
            let p = this.getDepthHelper(c, target)
            if (p) {
                return 1+p
            }
        }
    }
    
    getTreeDepthHelper(d, n) {
        let childDepths = []
        for (let c of n.children) {
            if ( c !== undefined ) {
                childDepths.push( this.getTreeDepthHelper(d+1, c) )
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