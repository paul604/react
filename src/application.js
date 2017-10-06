var React = require("react");
var ReactDOM = require("react-dom");

var Connection = require("./components/connection.js");
var Home = require("./components/home.js");

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            log: false,
            dataLog: null
        };
        this.onConection = this.onConection.bind(this);
    }

    onConection(dataLog){
        this.setState({ dataLog: dataLog });
        this.state.log=true;
        // this.render();
        this.forceUpdate();
    }

    render() {
        if(this.state.log){
            return (<Home dataLog={this.state.dataLog}/>);
        }
        return (<Connection onConection={this.onConection}/>);
    }

}
ReactDOM.render(
  <Main />,
  document.getElementById("main")
);
