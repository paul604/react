var React = require("react");
var ReactDOM = require("react-dom");

var VueHome = require("./VueHome.js");

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newMsg: "",
            errorImg: "",
            errorMsg: "",
            loadImg: "",
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

    }

    componentDidMount(){
        this.getMsg();
    }

    updateUserCrea(event) {
        this.setState({
            newMsg: event.target.value
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
        data.sort();
        console.log(data);
        this.setState({msg: data});
        this.forceUpdate();
    }

    responseSendAndSupMsg(rep){
        this.setState({loadImg: ""});
        if (!rep.ok) {
            console.log("Problem. Status Code: " +rep.status+"   rep:"+rep.statusText);
            this.setState({errorImg: "https://http.cat/"+rep.status});
            rep.json().then(data => {this.saveErrorMsg(data)});
            return;
        }else{
            this.getMsg();
        }
    }

    saveErrorMsg(msg){
        this.setState({errorMsg: msg.error});
    }

    //--------------------------------------------------------------------------

    getMsg(event) {
        if(event != null){
            event.preventDefault();
        }
        this.setState({errorImg: ""});
        this.setState({loadImg: "https://media.giphy.com/media/cMU9cCdDHTHJm/giphy.gif"});
        console.log("/u/timeline ");
        fetch("https://messy.now.sh/u/timeline", {
            headers: {
                "Authorization": "Bearer:"+this.props.dataUser.token
            }
        })
        .then(rep =>{this.response(rep)});
    }

    sendMsg(event){
        if(event != null){
            event.preventDefault();
        }
        this.setState({errorImg: ""});
        this.setState({loadImg: "https://media.giphy.com/media/cMU9cCdDHTHJm/giphy.gif"});
        console.log("/u/timeline send");
        var msg = {
            message:this.state.newMsg
        };
        this.setState({
            newMsg: ""
        });
        var body = JSON.stringify(msg);
        fetch("https://messy.now.sh/u/timeline", {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer:"+this.props.dataUser.token
            }
        })
        .then(rep =>{this.responseSendAndSupMsg(rep)});
    }

    supMsg(event){
        this.setState({errorImg: ""});
        this.setState({loadImg: "https://media.giphy.com/media/cMU9cCdDHTHJm/giphy.gif"});
        console.log("/u/timeline sup");
        var id = event.target.value;
        console.log(id);
        fetch("https://messy.now.sh/u/timeline/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer:"+this.props.dataUser.token
            }
        })
        .then(rep =>{this.responseSendAndSupMsg(rep)});
    }

    //--------------------------------------------------------------------------

    render() {
        return (<VueHome errorImg={this.state.errorImg} errorMsg={this.state.errorMsg} newMsg={this.state.newMsg} msg={this.state.msg}
            getMsg={this.getMsg} sendMsg={this.sendMsg} updateUserCrea={this.updateUserCrea}
            dataUser={this.props.dataUser} supMsg={this.supMsg} loadImg={this.state.loadImg}/>);
    }

}

module.exports = Home;
