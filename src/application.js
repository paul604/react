var React = require("react");
var ReactDOM = require("react-dom");

var Connection = require("./components/connection/RequeteConnection.js");
var Home = require("./components/home/Home.js");

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.onConection = this.onConection.bind(this);
        this.onDeconection = this.onDeconection.bind(this);
    }

    onConection(dataLog){
        console.log(dataLog);
        sessionStorage.setItem("userId", dataLog.user.id);
        sessionStorage.setItem("token", dataLog.token);
        // this.render();
        this.forceUpdate();
    }

    onDeconection(){
        sessionStorage.clear();
        this.forceUpdate();
    }

    render() {
        if(sessionStorage.getItem("token") != null){
            var dataUser = {
                    userId: sessionStorage.getItem("userId"),
                    token: sessionStorage.getItem("token")
            };
            return (<Home dataUser={dataUser} onDeconection={this.onDeconection}/>);
        }
        return (<Connection onConection={this.onConection}/>);
    }

}
ReactDOM.render(
  <Main />,
  document.getElementById("main")
);
