class View {

    static init(d) {
        const b = document.body
        this.ModeDisplay.init(d)
        this.Insert.init(d)
        this.TreeView.init(d)
        this.Status.init(d)
    }

    static render(d) {

    }


    static ModeDisplay = {
        init(d) {
            let e = document.createElement("h1")
            e.id = "modeDisplay"
            e.textContent = `Mode: ${d.mode}`
            document.body.appendChild(e)
        },

        render(d) {

        },
    }

    static Insert = {
        init(d) {
            let e = document.createElement("div")
            e.classList.add("window")
            e.id = "editContainer"

                let editContainerLabel = document.createElement("h2")
                editContainerLabel.textContent = "Edit nodes"
            
                let insertMenuLabel = document.createElement("h3")
                insertMenuLabel.textContent = "Vertical insert..."
                
                let insertMenu = document.createElement("ol")
                insertMenu.id = "insertMenu"

                    let asHead = document.createElement("a")
                    asHead.id = "asHead"
                    asHead.href = "#"
                    asHead.textContent = "as head"
                    insertMenu.appendChild(asHead)

                    let asLeft = document.createElement("a")
                    asLeft.id = "asLeft"
                    asLeft.href = "#"
                    asLeft.textContent = "as left child"
                    insertMenu.appendChild(asLeft)
                    

                    let asRight = document.createElement("a")
                    asRight.id = "asRight"
                    asRight.href = "#"
                    asRight.textContent = "as right child"
                    insertMenu.appendChild(asRight)

                let remove = document.createElement("a")
                remove.id = "removeNode"
                remove.href = "#"
                remove.textContent = "Remove node"

                let rename = document.createElement("a")
                rename.id = "renameNode"
                rename.href = "#"
                rename.textContent = "Rename node"
            
                e.appendChild(editContainerLabel)
                e.appendChild(insertMenuLabel)
                e.appendChild(insertMenu)

                e.appendChild(remove)
                e.appendChild(rename)

            document.body.appendChild(e)
        }
    }

    static TreeView = {
        init(d) {
            let e = document.createElement("div")
            e.id = "treeContainer"
            e.classList.add("window")

                let panButton = document.createElement("div")
                panButton.id = "panButton"
                e.appendChild(panButton)

                let imgContainer = document.createElement("div")

            document.body.appendChild(e)
        },

        render(d) {
            let h = d.tree.head
            if (h === null) {
                //document.getElementById("treeContainer").textContent = "This tree is empty."
            }
            else {
                let diameter = 20
                let margin = 50

                function getNodeCoordinates(i, d) {
                    let s = {}
                    s.x = i*(diameter+margin)+diameter
                    s.y = i*(diameter+margin)+diameter
                    return s
                }

                document.getElementById("svg")?.remove()

                let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
                svg.id = "svg"

                // render in breadth-first search order
                let maxDepth = 20
                let row = [h]
                for (let d = 0; d<maxDepth; d++) {
                    let nextRow = []
                    for (let i=0; i< row.length; i++) {
                        let n = row[i]
                        // add all children to the next row
                        nextRow = nextRow.concat( row[i].children )

                        let c = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                        c.setAttribute("class", "node")
                        c.id = row[i].name
                        let coord = getNodeCoordinates(i, d)
                        c.setAttribute("cx", coord.x )
                        c.setAttribute("cy", coord.y )
                        c.setAttribute("r", diameter)
                        c.setAttribute("stroke", "darkblue")
                        c.setAttribute("fill", "lightblue")
                        svg.appendChild(c)
                    }
                    row = nextRow
                }
                document.getElementById("treeContainer").appendChild(svg)
            }

        },

    }

    static HorizontalMove = {
        init(d) {
            let e = document.createElement("div")
            document.body.appendChild(e)
        },

        render(d) {

        },
    }

    static TreeOptions(d) {
        let e = document.createElement("div")

    }

    static Status =  {
        init(d) {
            let e = document.createElement("div")
            e.id = "status"
            document.body.appendChild(e)
            this.render(d)
        },
        render(d) {
            let s = document.getElementById("status")
            if (d.tree.head) {

                s.textContent = `Status: ${d.current.name}. ${d.nodeIndex} of ${d.nodeMaxIndex} at depth ${d.nodeDepth} of ${d.nodeMaxDepth}. ${d.numberOfChildren} children.`
            }
            else {
                // no head
                s.textContent = "No node selected."
            }

        },
    }

}