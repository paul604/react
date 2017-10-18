var React = require("react");
var ReactDOM = require("react-dom");

var Connection = require("./components/connection/RequeteConnection.jsx");
var Home = require("./components/home/Home.jsx");

class Main extends React.Component {

    /**
     * constructor - Main
     * @constructor
     */
    constructor(props) {

        super(props);
        this.state = {
            errorImgBase: "https://http.cat/",
            loadImg: "https://media.giphy.com/media/cMU9cCdDHTHJm/giphy.gif"
        };
        this.onConection = this.onConection.bind(this);
        this.onDeconection = this.onDeconection.bind(this);
    }

    /**
     * onConection - description
     *
     * @param {Object} dataLog
     * @param {string} dataLog.token - le token
     * @param {Object} dataLog.user - l'utilisateur
     * @param {string} dataLog.user.id - l'ID de l'utilisateur
     * @param {string} dataLog.user.image - l'imgage de l'utilisateur
     * @param {string} dataLog.user.name - le nom de l'utilisateur
     *
     * @return {Void}
     */
    onConection(dataLog) {
        console.log(dataLog);
        sessionStorage.setItem("userId", dataLog.user.id);
        sessionStorage.setItem("token", dataLog.token);
        // this.render();
        this.forceUpdate();
    }

    /**
     * onDeconection - description
     *
     * @return {Void}
     */
    onDeconection() {
        sessionStorage.clear();
        this.forceUpdate();
    }

    /**
     * render - description
     *
     * @return {React.Component}
     */
    render() {
        if (sessionStorage.getItem("token") != null) {
            var dataUser = {
                userId: sessionStorage.getItem("userId"),
                token: sessionStorage.getItem("token")
            };
            return (<Home dataUser={dataUser} onDeconection={this.onDeconection} errorImgBase={this.state.errorImgBase} loadImg={this.state.loadImg}/>);
        }
        return (<Connection onConection={this.onConection} errorImgBase={this.state.errorImgBase} loadImg={this.state.loadImg}/>);
    }

}

ReactDOM.render(
    <Main/>, document.getElementById("main"));
