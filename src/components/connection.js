var React = require("react");
var ReactDOM = require("react-dom");

class Connection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: "",
            userCrea: {name: "", password: "", image: ""},
            userCo: {name: "", password: ""}
        };
        this.updateUserCrea = this.updateUserCrea.bind(this);
        this.updateUserCo = this.updateUserCo.bind(this);
        this.response = this.response.bind(this);
        this.creat = this.creat.bind(this);
        this.connection = this.connection.bind(this);
        this.dataJson = this.dataJson.bind(this);
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
        if (rep.status !== 200) {
          console.log("Problem. Status Code: " +rep.status+"   rep:"+rep.statusText);
          this.setState({error: "https://http.cat/"+rep.status});
          return;
        }
        rep.json().then(dataFun => {this.dataJson(dataFun)});
    }

    dataJson(data){
        this.props.onConection(data);
    }

    //--------------------------------------------------------------------------

    creat(event) {
        event.preventDefault();
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
        return (<ViewConnection error={this.state.error} updateUserCrea={ this.updateUserCrea }
            updateUserCo={ this.updateUserCo } creat={this.creat} connection={this.connection}/>);
    }

}

module.exports = Connection;

    //--------------------------------------------------------------------------
    //
    //--------------------------------------------------------------------------

const ViewConnection = function (props) {
    return (
        <div >

            {props.error != "" ?
                    <img src={props.error} height="250" width="300"/>
                    :
                    <div></div>
            }

            <div id="form" >
                <form action="" method="post" onSubmit={ props.creat } >
                    <h1>Création</h1>
                    <label >Nom :</label>
                    <input id="name" type="text" name="name" onInput={ props.updateUserCrea }/>
                    <br/>
                    <label>Password :</label>
                    <input id="password" type="password" name="password" onInput={ props.updateUserCrea }/>
                    <br/>
                    <label>image :</label>
                    <input id="image" type="text" name="image" onInput={ props.updateUserCrea }/>
                    <br/>
                    <input type="submit" value="créer compte" />
                </form>
                <form action="" method="post" onSubmit={ props.connection } >
                    <h1>Conection</h1>
                    <label >Nom :</label>
                    <input id="name" type="text" name="name" onInput={ props.updateUserCo }/>
                    <br/>
                    <label>Password :</label>
                    <input id="password" type="password" name="password" onInput={ props.updateUserCo }/>
                    <br/>
                    <input type="submit" value="Connection" />
                </form>
            </div>
        </div>
    );
}
