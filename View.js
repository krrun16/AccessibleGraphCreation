class View {

    static init(d) {
        const b = document.body
        this.ModeDisplay.init(d)
        this.Edit.init(d)
        this.TreeView.init(d)
        this.Summary.init(d)
        this.Move.init(d)
        this.Status.init(d)
        this.File.init(d)
    }

    static render(d) {
        View.TreeView.render(d)
        View.Summary.render(d)
        View.Status.render(d)
        View.Edit.render(d)
        View.Move.render(d)
    }


    static ModeDisplay = {
        init(d) {
            let e = document.createElement("div")
            e.id = "modeDisplayContainer"

                let h2 = document.createElement("h2")
                h2.textContent = "Mode"
                e.appendChild(h2)

                let div = document.createElement("div")
                div.id = "mode"
                div.textContent = `${d.mode[0].toUpperCase() + d.mode.slice(1)}`
                e.appendChild(div)

                document.body.appendChild(e)

                this.render(d)
        },

        render(d) {

        },
    }

    static ButtonItem(action) {
        let li = document.createElement('li')
        let button = document.createElement('button')
        li.id = action.id
        button.textContent = action.textContent
        li.style.display = action.isEnabled ? "" : "none"
        button.href = "#"
        li.appendChild(button)
        return li
    }

    static DescriptionListItem(item) {
        let dt = document.createElement('dt')
        dt.textContent = item.name
        let dd = document.createElement('dd')
        dd.id = item.id
        dd.textContent = item.value
        return [dt, dd]
    }

    static Edit = {
        init(d) {
            let e = document.createElement("div")
            e.classList.add("window")
            e.id = "edit"

                let editContainerLabel = document.createElement("h2")
                editContainerLabel.textContent = "Edit Nodes"
                editContainerLabel.id = "editContainerLabel"
            
                let insertMenu = document.createElement("ol")
                insertMenu.id = "insertMenu"
                insertMenu.setAttribute("aria-labelledby", "editContainerLabel")


                for (let a of d.actions.edit) {
                    insertMenu.appendChild(
                        View.ButtonItem(a)
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
                h2.textContent = "Move Cursor"
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
                        View.ButtonItem(a)
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

    static Summary = {
        init(d) {
            let e = document.createElement('div')
            e.id = "summaryContainer"
            e.setAttribute("aria-labelledby", "summaryLabel")
            e.className = "window"

                let summaryLabel = document.createElement("h2")
                summaryLabel.id = "summaryLabel"
                summaryLabel.textContent = "Summary"
                e.appendChild(summaryLabel)

                let summary = document.createElement('dl')
                summary.id = "summary"
                e.appendChild(summary)

            document.body.appendChild(e)
            
            for (let item of d.summary) {
                let descriptionListItem =  View.DescriptionListItem(item)
                for (let element of descriptionListItem) {
                    summary.appendChild(element)
                }
            }

            this.render(d)
        },
        render(d) {
            for (let item of d.summary) {
                document.getElementById(item.id).textContent = item.value
            }
        }
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

    static File = {

        init(d) {
            let e = document.createElement("div")
            e.id = "file"
            e.className = "window"

                let h2 = document.createElement("h2")
                h2.textContent = 'File'
                e.appendChild(h2)

                let save = document.createElement("button")
                save.id = "save"
                save.textContent = "Save Tree to File..."
                e.appendChild(save)

                let load = document.createElement("button")
                load.id = "load"
                load.textContent = "Load Tree from File..."
                e.appendChild(load)

            document.body.appendChild(e)
        },

        render(d) {

        }

    }

}