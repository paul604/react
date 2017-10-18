var React = require("react");
var ReactDOM = require("react-dom");

var VueHome = require("./VueHome.js");

class Home extends React.Component {

    /**
     * constructor - Home
     *
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            newMsg: "",
            errorImg: "",
            errorMsg: "",
            error: false,
            load: false,
            msg: new Array()
        };
        this.response = this.response.bind(this);
        this.dataJson = this.dataJson.bind(this);
        this.getMsg = this.getMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.updateUserCrea = this.updateUserCrea.bind(this);
        this.responseSendAndSupMsg = this.responseSendAndSupMsg.bind(this);
        this.saveErrorMsg = this.saveErrorMsg.bind(this);
        this.supMsg = this.supMsg.bind(this);
        this.deconection = this.deconection.bind(this);

    }

    /**
     * componentDidMount
     *
     * @return {Void}
     */
    componentDidMount() {
        this.getMsg();
    }

    /**
     * updateUserCrea - up state après une modification du champ text.
     *
     * @param  {Object} event - event onInput
     * @return {Void}
     */
    updateUserCrea(event) {
        this.setState({
            newMsg: event.target.value
        });
    }

    /**
     * deconection - informe application de la deconection
     *
     * @return {Void}
     */
    deconection() {
        this.props.onDeconection();
    }

    //--------------------------------------------------------------------------
    //                              response
    //--------------------------------------------------------------------------

    /**
     * response - gestion de la reponse de getMsg
     *
     * @param  {Object} rep - la reponse du fetch
     * @return {Void}
     */
    response(rep) {
        this.setState({
            load: false
        });
        if (!rep.ok) {
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
     * dataJson -
     *
     * @param {Object[]} data - la reponse du .json() (le tableau des msg)
     * @param {string} data[].date - la date
     * @param {string} data[].id - l'ID du msg
     * @param {string} data[].message - le message
     * @param {Object} data[].user - l'utilisateur
     * @param {string} data[].user.id - l'ID de l'utilisateur
     * @param {string} data[].user.image - l'imgage de l'utilisateur
     * @param {string} data[].user.name - le nom de l'utilisateur
     * @return {Void}
     */
    dataJson(data) {
        //trie data en fonction des date
        data.sort(function (a, b) {
            var dateA = a.date;
            var dateB = b.date;
            if (dateA < dateB) {
                return -1;
            }
            if (dateA > dateB) {
                return 1;
            }
            return 0;
        });
        console.log(data);
        this.setState({
            msg: data
        });
        this.forceUpdate();
    }

    /**
     * responseSendAndSupMsg - gestion de la reponse de sendMsg et supMsg
     *
     * @param {Object} rep - la reponse du fetch
     * @return {Void}
     */
    responseSendAndSupMsg(rep) {
        this.setState({
            loadImg: ""
        });
        if (!rep.ok) {
            console.log("Problem. Status Code: " + rep.status + "   rep:" + rep.statusText);
            this.setState({
                errorImg: this.props.errorImgBase + rep.status,
                error: true
            });
            rep.json().then(data => {
                this.saveErrorMsg(data)
            });
            return;
        } else {
            this.getMsg();
        }
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
     * getMsg - envoie la requête pour get message
     *
     * @param  {Object} event
     * @return {Void}
     */
    getMsg(event) {
        if (event != null) {
            event.preventDefault();
        }
        this.setState({
            error: false,
            load: true
        });
        console.log("/u/timeline ");
        fetch("https://messy.now.sh/u/timeline", {
                headers: {
                    "Authorization": "Bearer:" + this.props.dataUser.token
                }
            })
            .then(rep => {
                this.response(rep)
            });
    }

    /**
     * sendMsg - envoie la requête pour envoyer un message
     *
     * @param  {Object} event
     * @return {Void}
     */
    sendMsg(event) {
        if (event != null) {
            event.preventDefault();
        }
        if (this.state.newMsg === "") {
            this.setState({
                errorImg: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2F31.media.tumblr.com%2Ftumblr_m9w2is2dVU1qh66wqo1_1280.jpg&f=1",
                errorMsg: "msg vide",
                error: true
            });
            return;
        }
        console.log("/u/timeline send");
        var msg = {
            message: this.state.newMsg
        };
        this.setState({
            error: false,
            load: true,
            newMsg: ""
        });
        var body = JSON.stringify(msg);
        fetch("https://messy.now.sh/u/timeline", {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer:" + this.props.dataUser.token
                }
            })
            .then(rep => {
                this.responseSendAndSupMsg(rep)
            });
    }

    /**
     * supMsg - envoie la requête pour supprimer un message
     *
     * @param  {Object} event
     * @return {Void}
     */
    supMsg(event) {
        this.setState({
            error: false,
            load: true,
        });
        console.log("/u/timeline sup");
        var id = event.target.value;
        console.log(id);
        fetch("https://messy.now.sh/u/timeline/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer:" + this.props.dataUser.token
                }
            })
            .then(rep => {
                this.responseSendAndSupMsg(rep)
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
        return (<VueHome errorImg={this.state.errorImg} errorMsg={this.state.errorMsg} newMsg={this.state.newMsg} msg={this.state.msg}
            getMsg={this.getMsg} sendMsg={this.sendMsg} updateUserCrea={this.updateUserCrea}
            dataUser={this.props.dataUser} supMsg={this.supMsg} loadImg={this.props.loadImg}
            deconection={this.deconection} error={this.state.error} load={this.state.load}/>);
    }

}

module.exports = Home;
