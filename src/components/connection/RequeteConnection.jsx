var React = require("react");
var ReactDOM = require("react-dom");

var VueConnection = require("./VueConnection.jsx");

class RequeteConnection extends React.Component {

    /**
     * constructor - RequeteConnection
     *
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            errorImg: "",
            errorMsg: "",
            error: false,
            load: false,
            userCrea: {
                name: "",
                password: "",
                image: ""
            },
            userCo: {
                name: "",
                password: ""
            }
        };
        this.updateUserCrea = this.updateUserCrea.bind(this);
        this.updateUserCo = this.updateUserCo.bind(this);
        this.response = this.response.bind(this);
        this.creat = this.creat.bind(this);
        this.connection = this.connection.bind(this);
        this.dataJson = this.dataJson.bind(this);
        this.saveErrorMsg = this.saveErrorMsg.bind(this);
    }

    //--------------------------------------------------------------------------
    //                              UP
    //--------------------------------------------------------------------------

    /**
     * updateUserCrea - actualise les valeurs de la création de l'utilisateur
     *
     * @param  {Object} event - event onInput
     * @return {Void}
     */
    updateUserCrea(event) {
        var updatedU = Object.assign({},
            this.state.userCrea, {
                [event.target.name]: event.target.value
            }
        );
        this.setState({
            userCrea: updatedU
        });
    }

    /**
     * updateUserCo - actualise les valeurs de la conection de l'utilisateur
     *
     * @param  {Object} event - event onInput
     * @return {Void}
     */
    updateUserCo(event) {
        var updatedU = Object.assign({},
            this.state.userCo, {
                [event.target.name]: event.target.value
            }
        );
        this.setState({
            userCo: updatedU
        });
    }


    //--------------------------------------------------------------------------
    //                              response
    //--------------------------------------------------------------------------

    /**
     * response - gestion la reponse
     *
     * @param  {Object} rep - la response de creat et connection
     * @return {Void}
     */
    response(rep) {
        this.setState({
            load: false
        });
        if (!rep.ok) {
            //error
            console.log("Problem. Status Code: " + rep.status + "   rep:" + rep.statusText);
            this.setState({
                errorImg: this.props.errorImgBase + rep.status,
                error: true
            });
            rep.json().then(data => {
                this.saveErrorMsg(data)
            });
            return;
        }
        rep.json().then(dataFun => {
            this.dataJson(dataFun)
        });
    }

    /**
     * dataJson - get data parsing
     * utilise la méthode onConection de application
     *
     * @param  {Object} data - data parsing
     * @return {Void}
     */
    dataJson(data) {
        this.props.onConection(data);
    }

    /**
     * saveErrorMsg - save le msg d'error
     *
     * @param  {type} msg
     * @return {Void}
     */
    saveErrorMsg(msg) {
        this.setState({
            errorMsg: msg.error
        });
    }

    //--------------------------------------------------------------------------
    //                              fetch
    //--------------------------------------------------------------------------

    /**
     * creat - envoie la requête de création de compte.
     *
     * @param  {Object} event
     * @return {Void}
     */
    creat(event) {
        event.preventDefault();
        this.setState({
            error: false,
            load: true
        });
        var body = JSON.stringify(this.state.userCrea);
        console.log("join " + body);
        fetch("https://messy.now.sh/join", {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(rep => {
                this.response(rep)
            });
    }

    /**
     * connection -  envoie la requête de connection.
     *
     * @param  {Object} event
     * @return {Void}
     */
    connection(event) {
        event.preventDefault();
        this.setState({
            error: false,
            load: true
        });
        var body = JSON.stringify(this.state.userCo);
        console.log("authenticate " + body);
        fetch("https://messy.now.sh/authenticate", {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(rep => {
                this.response(rep)
            });
    }

    //--------------------------------------------------------------------------.
    //                              render
    //--------------------------------------------------------------------------

    /**
     * render - description
     *
     * @return {React.Component}
     */
    render() {
        return (<VueConnection errorImg={this.state.errorImg} errorMsg={this.state.errorMsg} updateUserCrea={ this.updateUserCrea }
            updateUserCo={ this.updateUserCo } creat={this.creat} connection={this.connection} loadImg={this.props.loadImg}
            error={this.state.error} load={this.state.load}/>);
    }

}

module.exports = RequeteConnection;
