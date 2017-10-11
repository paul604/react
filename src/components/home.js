var React = require("react");
var ReactDOM = require("react-dom");

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newMsg: "",
            errorImg: "",
            errorMsg: "",
            msg: new Array()
        };
        this.response = this.response.bind(this);
        this.dataJson = this.dataJson.bind(this);
        this.getMsg = this.getMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.updateUserCrea = this.updateUserCrea.bind(this);
        this.responseSendMsg = this.responseSendMsg.bind(this);
        this.saveErrorMsg = this.saveErrorMsg.bind(this);

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
        if (rep.status !== 200) {
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

    responseSendMsg(rep){
        if (rep.status !== 200) {
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
            this.setState({errorImg: ""});
        }
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
        console.log("/u/timeline send");
        this.setState({errorImg: ""});
        var msg = {
            message:this.state.newMsg
        };
        var body = JSON.stringify(msg);
        fetch("https://messy.now.sh/u/timeline", {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer:"+this.props.dataUser.token
            }
        })
        .then(rep =>{this.responseSendMsg(rep)});
    }

    //--------------------------------------------------------------------------

    render() {
        return (<ViewHome errorImg={this.state.errorImg} errorMsg={this.state.errorMsg} msg={this.state.msg}
            getMsg={this.getMsg} sendMsg={this.sendMsg} updateUserCrea={this.updateUserCrea}/>);
    }

}

module.exports = Home;

    //--------------------------------------------------------------------------
    //
    //--------------------------------------------------------------------------

const ViewHome = function (props) {
    return (
        <div>
            {props.errorImg != "" ?
                    <div>
                        <img src={props.errorImg} height="250" width="300"/>
                        <p>{props.errorMsg}</p>
                    </div>
                    :
                    <div></div>
            }

            <h1>
                home
            </h1>
            <div id="msg">
                <ul id="msg_ul">
                {props.msg.map(function(item, index){
                    return (
                        <li>
                            <img src={item.user.image} height="50" width="50"/> {item.user.name}: ({item.date})
                            <ul>
                                <li>
                                    {item.message}
                                </li>
                            </ul>
                        </li>
                    );
                })}
                </ul>
            </div>
            <form onSubmit={props.sendMsg}>
                <label>Msg :</label>
                <textarea name="msg" rows="1" cols="100" onInput={props.updateUserCrea}>
                </textarea>
                <input type="submit" value="send" />
                <input type="button" onClick={props.getMsg} value="F5" />

            </form>
        </div>

    );
}
