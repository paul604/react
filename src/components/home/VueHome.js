var React = require("react");
var ReactDOM = require("react-dom");

class VueHome extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.errorImg != "" ?
                        <div>
                            <img src={this.props.errorImg} height="250" width="300"/>
                            <p>{this.props.errorMsg}</p>
                        </div>
                        :
                        <div></div>
                }

                <h1>
                    home
                </h1>
                <div id="msg">

                    {this.props.loadImg != "" ?
                        <div>
                            <img src={this.props.loadImg}/>
                        </div>
                        :
                        <ul id="msg_ul">
                            {this.props.msg.map(function(item, index){
                                return (
                                    <li key={index}>
                                        <img src={item.user.image} height="50" width="50"/> {item.user.name}: ({item.date})
                                        {item.user.id === this.props.dataUser.userId?
                                             <button type="button" value={item.id} onClick={this.props.supMsg}>supprimer</button> :
                                             <span/>
                                        }
                                        <ul>
                                            <li>
                                                {item.message}
                                            </li>
                                        </ul>
                                        <hr/>
                                    </li>
                                );
                            }.bind(this))}
                        </ul>
                    }
                </div>
                <form onSubmit={this.props.sendMsg}>
                    <label>Msg :</label>
                    <textarea name="msg" value={this.props.newMsg} rows="1" cols="100" onInput={this.props.updateUserCrea} >
                    </textarea>
                    {this.props.newMsg === ""?
                        <input type="submit" value="send" disabled/>
                        :
                        <input type="submit" value="send"/>
                    }
                    <input type="button" onClick={this.props.getMsg} value="F5" />
                    <input type="button" onClick={this.props.deconection} value="déconection" />

                </form>
            </div>
        );
    }

}

module.exports = VueHome;
