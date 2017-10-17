var React = require("react");
var ReactDOM = require("react-dom");

var VueConnection = require("./VueConnection.js");

class RequeteConnection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorImg: "",
            errorMsg: "",
            loadImg: "",
            userCrea: {name: "", password: "", image: ""},
            userCo: {name: "", password: ""}
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

    updateUserCrea(event) {
        var updatedU = Object.assign({},
            this.state.userCrea,
            { [event.target.name]: event.target.value }
        );
        this.setState({
            userCrea: updatedU
        });
    }

    updateUserCo(event) {
        var updatedU = Object.assign({},
            this.state.userCo,
            { [event.target.name]: event.target.value }
        );
        this.setState({
            userCo: updatedU
        });
    }


    //--------------------------------------------------------------------------

    response(rep){
        this.setState({loadImg: ""});
        if (!rep.ok) {
          console.log("Problem. Status Code: " +rep.status+"   rep:"+rep.statusText);
          this.setState({errorImg: "https://http.cat/"+rep.status});
          rep.json().then(data => {this.saveErrorMsg(data)});
          return;
        }
        rep.json().then(dataFun => {this.dataJson(dataFun)});
    }

    dataJson(data){
        this.props.onConection(data);
    }

    saveErrorMsg(msg){
        this.setState({errorMsg: msg.error});
    }

    //--------------------------------------------------------------------------

    creat(event) {
        event.preventDefault();
        this.setState({errorImg: ""});
        this.setState({loadImg: "https://media.giphy.com/media/cMU9cCdDHTHJm/giphy.gif"});
        var body = JSON.stringify(this.state.userCrea);
        console.log("join "+body);
        fetch("https://messy.now.sh/join", {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(rep =>{this.response(rep)});
    }

    connection(event){
        event.preventDefault();
        this.setState({errorImg: ""});
        this.setState({loadImg: "https://media.giphy.com/media/cMU9cCdDHTHJm/giphy.gif"});
        var body = JSON.stringify(this.state.userCo);
        console.log("authenticate "+body);
        fetch("https://messy.now.sh/authenticate", {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(rep =>{this.response(rep)});
    }

    //--------------------------------------------------------------------------

    render() {
        return (<VueConnection errorImg={this.state.errorImg} errorMsg={this.state.errorMsg} updateUserCrea={ this.updateUserCrea }
            updateUserCo={ this.updateUserCo } creat={this.creat} connection={this.connection} loadImg={this.state.loadImg}/>);
    }

}

module.exports = RequeteConnection;
