var React = require("react");
var ReactDOM = require("react-dom");

class VueConnection extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                {this.props.errorImg != "" ?
                        <div>
                            <img src={this.props.errorImg} height="250" width="300"/>
                            <p>{this.props.errorMsg}</p>
                        </div>
                        :
                        <div></div>
                }
                {this.props.loadImg != "" ?
                    <div>
                        <img src={this.props.loadImg}/>
                    </div>
                    :
                    <div></div>
                }

                <div id="form" >
                    <form action="" method="post" onSubmit={ this.props.creat } >
                        <h1>Création</h1>
                        <label >Nom :</label>
                        <input id="name" type="text" name="name" onInput={ this.props.updateUserCrea }/>
                        <br/>
                        <label>Password :</label>
                        <input id="password" type="password" name="password" onInput={ this.props.updateUserCrea }/>
                        <br/>
                        <label>image :</label>
                        <input id="image" type="text" name="image" onInput={ this.props.updateUserCrea }/>
                        <br/>
                        <input type="submit" value="créer compte" />
                    </form>
                    <form action="" method="post" onSubmit={ this.props.connection } >
                        <h1>Conection</h1>
                        <label >Nom :</label>
                        <input id="name" type="text" name="name" onInput={ this.props.updateUserCo }/>
                        <br/>
                        <label>Password :</label>
                        <input id="password" type="password" name="password" onInput={ this.props.updateUserCo }/>
                        <br/>
                        <input type="submit" value="Connection" />
                    </form>
                </div>
            </div>
        );
    }

}

module.exports = VueConnection;
