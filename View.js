class View {

    static init(d) {
        const b = document.body
        this.ModeDisplay.init(d)
        this.Edit.init(d)
        this.TreeView.init(d)
        this.Move.init(d)
        this.Status.init(d)
    }

    static render(d) {
        View.TreeView.render(d)
        View.Status.render(d)
        View.Edit.render(d)
        View.Move.render(d)
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

    static ListItem(action) {
        let li = document.createElement('li')
        let button = document.createElement('button')
        li.id = action.id
        button.textContent = action.textContent
        li.style.display = action.isEnabled ? "" : "none"
        button.href = "#"
        li.appendChild(button)
        return li
    }

    static Edit = {
        init(d) {
            let e = document.createElement("div")
            e.classList.add("window")
            e.id = "edit"

                let editContainerLabel = document.createElement("h2")
                editContainerLabel.textContent = "Edit nodes"
                editContainerLabel.id = "editContainerLabel"
            
                let insertMenu = document.createElement("ol")
                insertMenu.id = "insertMenu"
                insertMenu.setAttribute("aria-labelledby", "editContainerLabel")


                for (let a of d.actions.edit) {
                    insertMenu.appendChild(
                        View.ListItem(a)
                    )
                }

                e.appendChild(editContainerLabel)
                e.appendChild(insertMenu)

            document.body.appendChild(e)
        },

        render(d) {
            let e = document.getElementById("edit")
            for (let a of d.actions.edit) {
                let t = document.getElementById(a.id)
                t.firstElementChild.textContent = a.textContent
                t.style.display = a.isEnabled ? "" : "none"
            }
        }
    }

    static Move = {
        init(d) {
            let e = document.createElement("div")
            e.id = "move"
            e.classList.add("window")

                let h2 = document.createElement("h2")
                h2.textContent = "Move cursor"
                h2.id = "moveMenuLabel"
                e.appendChild(h2)

                // let horizontalCategory = document.createElement('h3')
                // horizontalCategory.textContent = "Horizontally"
                // e.appendChild(horizontalCategory)

                let moveMenu = document.createElement('ol')
                moveMenu.setAttribute("aria-labelledby", "moveMenuLabel")
                moveMenu.id = 'moveMenu'

                for (let a of d.actions.move) {
                    moveMenu.appendChild(
                        View.ListItem(a)
                    )
                }

                e.appendChild(moveMenu)

                // let verticalCategory = document.createElement('h3')
                // verticalCategory.textContent = "Vertically"
                // e.appendChild(verticalCategory)

            document.body.appendChild(e)

        },

        render(d) {
            let insertMenu = document.getElementById("move")
            for (let a of d.actions.move) {
                let t = document.getElementById(a.id)
                t.firstElementChild.textContent = a.textContent
                t.style.display = a.isEnabled ? "" : "none"
            }
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
                document.getElementById("treeContainer").textContent = "This tree is empty."
            }
            else {
                document.getElementById("treeContainer").textContent = ""
                let diameter = 20
                let margin = 20

                function getNodeCoordinates(i, depth) {
                    //let width = document.getElementById("svg").getBoundingClientRect().width
                    let width = 200
                    let s = {}
                    s.x = Math.round( width/2 - diameter/2 ) + (i*(diameter+margin)+diameter)
                    s.y = depth*(diameter+margin)+diameter
                    return s
                }

                document.getElementById("svg")?.remove()

                let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
                svg.id = "svg"
                svg.setAttribute("aria-hidden", "true")

                // render in breadth-first search order
                let maxDepth = 100
                let currentRow = [h]
                for (let depth = 0; depth<maxDepth; depth++) {
                    let nextRow = []
                    for (let i=0; i<maxDepth && currentRow.length; i++) {
                        let n = currentRow[i]
                        if (n) {
                            // add all children to the next row
                            nextRow = nextRow.concat( n.children )

                            // draw circle
                            let c = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                            c.setAttribute("class", "node")
                            c.id = currentRow[i].name
                            let coord = getNodeCoordinates(i, depth)
                            c.setAttribute("cx", coord.x )
                            c.setAttribute("cy", coord.y )
                            c.setAttribute("r", diameter)
                            c.setAttribute("stroke", "darkblue")
                            if (n === d.current) {
                                c.setAttribute("fill", "yellow")
                            }
                            else {
                                c.setAttribute("fill", "lightblue")
                            }
                            svg.appendChild(c)

                            // draw name
                            let text = document.createElementNS("http://www.w3.org/2000/svg", "text")
                            text.setAttribute("x", coord.x)
                            text.setAttribute("y", coord.y)
                            text.textContent = n.name
                            svg.appendChild(text)

                            // draw lines for each child
                            for (let child of n.children) {
                                let coord = getNodeCoordinates()
                                let l = document.createElementNS("http://www.w3.org/2000/svg", "line")
                                //l.setAttribute("x1", )
                            }
                        }
                    }
                    currentRow = nextRow
                }
                document.getElementById("treeContainer").appendChild(svg)
            }

        },

    }

    static TreeOptions(d) {
        let e = document.createElement("div")
    }

    static Status =  {
        init(d) {
            let e = document.createElement("div")
            e.id = "statusContainer"
            e.setAttribute("aria-live", "polite")
            e.setAttribute("role", "alert")
            e.setAttribute("aria-labelledby", "statusLabel")

            let statusLabel = document.createElement("h2")
            statusLabel.id = "statusLabel"
            statusLabel.textContent = "Status"
            e.appendChild(statusLabel)
            
            let status = document.createElement("div")
            status.id = "status"
            e.appendChild(status)

            document.body.appendChild(e)
            this.render(d)
        },
        render(d) {
            let s = document.getElementById("status")
            if (d.tree.head) {

                s.textContent = `${d.current.name}. Sibling ${d.nodeIndex+1} of ${d.nodeMaxIndex} at depth ${d.nodeDepth+1} of ${d.nodeMaxDepth+1}. ${d.numberOfChildren} children.`
            }
            else {
                // no head
                s.textContent = "Tree is empty."
            }

        },
    }

}