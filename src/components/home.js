var React = require("react");
var ReactDOM = require("react-dom");

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newMsg: "",
            error: "",
            msg: new Array()
        };
        this.response = this.response.bind(this);
        this.dataJson = this.dataJson.bind(this);
        this.getMsg = this.getMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.updateUserCrea = this.updateUserCrea.bind(this);
        this.responseSendMsg = this.responseSendMsg.bind(this);

    }

    componentDidMount(){
        this.getMsg();
    }

    updateUserCrea(event) {
        this.setState({
            newMsg: event.target.value
        });
        console.log("up");
    }

    //--------------------------------------------------------------------------

    response(rep){
        if (rep.status !== 200) {
          console.log("Problem. Status Code: " +rep.status+"   rep:"+rep.statusText);
          this.setState({error: "https://http.cat/"+rep.status});
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
          this.setState({error: "https://http.cat/"+rep.status});
          return;
      }else{
        this.getMsg();
      }
    }

    //--------------------------------------------------------------------------

    getMsg() {
        console.log("/u/timeline ");
        this.setState({error: ""});
        fetch("https://messy.now.sh/u/timeline", {
            headers: {
                "Authorization": "Bearer:"+this.props.dataLog.token
            }
        })
        .then(rep =>{this.response(rep)});
    }

    sendMsg(){
        console.log("/u/timeline send");
        this.setState({error: ""});
        var msg = {
            message:this.state.newMsg
        };
        var body = JSON.stringify(msg);
        console.log(body);
        fetch("https://messy.now.sh/u/timeline", {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer:"+this.props.dataLog.token
            }
        })
        .then(rep =>{this.responseSendMsg(rep)});
    }

    //--------------------------------------------------------------------------

    render() {
        return (<ViewHome error={this.state.error} msg={this.state.msg} getMsg={this.getMsg} sendMsg={this.sendMsg} updateUserCrea={this.updateUserCrea}/>);
    }

}

module.exports = Home;

    //--------------------------------------------------------------------------
    //
    //--------------------------------------------------------------------------

const ViewHome = function (props) {
    return (
        <div>
            {props.error != "" ?
                    <img src={props.error} height="250" width="300"/>
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
            <form>
                <label>Msg :</label>
                <textarea name="msg" rows="1" cols="100" onInput={props.updateUserCrea}>
                </textarea>
                <input type="button" onClick={props.sendMsg} value="send" />
                <input type="button" onClick={props.getMsg} value="F5" />

            </form>
        </div>

    );
}
