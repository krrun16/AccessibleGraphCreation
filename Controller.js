class Controller {

    static init(e) {
        View.init( Model.getData() )
        // bind events after page has loaded and document has been init'd
        Controller.bindEvents(e)
        View.TreeView.render( Model.getData() )
    }

    static bindEvents(e) {
        document.getElementById("asHead").addEventListener("click", Controller.addNodeHead)
        document.getElementById("asLeft").addEventListener("click", Controller.addNodeLeftChild)
        document.getElementById("asRight").addEventListener("click", Controller.addNodeRightChild)
    }

    static addNodeHead(e) {
        Model.addNodeHead()
        View.TreeView.render( Model.getData() )
        View.Status.render( Model.getData() )
        console.log(Model.tree)
    }

    static addNodeLeftChild(e) {
        Model.addNodeLeftChild()
        View.TreeView.render( Model.getData() )
        console.log(Model.tree)
    }

    static addNodeRightChild(e) {
        Model.addNodeRightChild()
        View.TreeView.render( Model.getData() )
        console.log(Model.tree)
    }

}

window.addEventListener("load", Controller.init)